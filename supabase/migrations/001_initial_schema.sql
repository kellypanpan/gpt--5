-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_user_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    credits INTEGER DEFAULT 10 CHECK (credits >= 0),
    is_subscribed BOOLEAN DEFAULT FALSE,
    subscription_type VARCHAR(20) CHECK (subscription_type IN ('pro', 'creator', 'lifetime')),
    subscription_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create generation_logs table
CREATE TABLE generation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tool VARCHAR(50) NOT NULL,
    credits_used INTEGER NOT NULL CHECK (credits_used > 0),
    prompt TEXT NOT NULL,
    result TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'success' CHECK (status IN ('success', 'failed')),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create conversations table
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    user_message TEXT NOT NULL,
    assistant_response TEXT NOT NULL,
    task_type VARCHAR(50) NOT NULL,
    context TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create prompts table for marketplace
CREATE TABLE prompts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    price DECIMAL(10,2) DEFAULT 0 CHECK (price >= 0),
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    likes INTEGER DEFAULT 0 CHECK (likes >= 0),
    downloads INTEGER DEFAULT 0 CHECK (downloads >= 0),
    is_featured BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create prompt_purchases table
CREATE TABLE prompt_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE,
    price_paid DECIMAL(10,2) NOT NULL CHECK (price_paid >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, prompt_id) -- Prevent duplicate purchases
);

-- Create prompt_likes table
CREATE TABLE prompt_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, prompt_id) -- Prevent duplicate likes
);

-- Create indexes for performance
CREATE INDEX idx_users_clerk_id ON users(clerk_user_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_generation_logs_user_id ON generation_logs(user_id);
CREATE INDEX idx_generation_logs_created_at ON generation_logs(created_at);
CREATE INDEX idx_generation_logs_tool ON generation_logs(tool);
CREATE INDEX idx_conversations_conversation_id ON conversations(conversation_id);
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_prompts_category ON prompts(category);
CREATE INDEX idx_prompts_author_id ON prompts(author_id);
CREATE INDEX idx_prompts_featured ON prompts(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_prompts_approved ON prompts(is_approved) WHERE is_approved = TRUE;
CREATE INDEX idx_prompt_purchases_user_id ON prompt_purchases(user_id);
CREATE INDEX idx_prompt_likes_prompt_id ON prompt_likes(prompt_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prompts_updated_at BEFORE UPDATE ON prompts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle prompt purchases with credit deduction
CREATE OR REPLACE FUNCTION purchase_prompt(
    p_user_id UUID,
    p_prompt_id UUID,
    p_price_paid DECIMAL
)
RETURNS UUID AS $$
DECLARE
    user_credits INTEGER;
    purchase_id UUID;
BEGIN
    -- Get user's current credits
    SELECT credits INTO user_credits
    FROM users
    WHERE id = p_user_id;
    
    -- Check if user has enough credits
    IF user_credits < p_price_paid THEN
        RAISE EXCEPTION 'Insufficient credits';
    END IF;
    
    -- Check if user already purchased this prompt
    IF EXISTS (
        SELECT 1 FROM prompt_purchases 
        WHERE user_id = p_user_id AND prompt_id = p_prompt_id
    ) THEN
        RAISE EXCEPTION 'Prompt already purchased';
    END IF;
    
    -- Deduct credits from user
    UPDATE users 
    SET credits = credits - p_price_paid,
        updated_at = NOW()
    WHERE id = p_user_id;
    
    -- Create purchase record
    INSERT INTO prompt_purchases (user_id, prompt_id, price_paid)
    VALUES (p_user_id, p_prompt_id, p_price_paid)
    RETURNING id INTO purchase_id;
    
    -- Update prompt download count
    UPDATE prompts
    SET downloads = downloads + 1,
        updated_at = NOW()
    WHERE id = p_prompt_id;
    
    RETURN purchase_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to get user statistics
CREATE OR REPLACE FUNCTION get_user_stats(p_user_id UUID)
RETURNS TABLE (
    total_generations INTEGER,
    credits_used INTEGER,
    favorite_tool VARCHAR,
    generations_this_month INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::INTEGER as total_generations,
        COALESCE(SUM(gl.credits_used), 0)::INTEGER as credits_used,
        COALESCE(
            (SELECT gl2.tool 
             FROM generation_logs gl2 
             WHERE gl2.user_id = p_user_id 
             GROUP BY gl2.tool 
             ORDER BY COUNT(*) DESC 
             LIMIT 1), 
            'writer'
        )::VARCHAR as favorite_tool,
        COUNT(CASE WHEN gl.created_at >= date_trunc('month', CURRENT_DATE) THEN 1 END)::INTEGER as generations_this_month
    FROM generation_logs gl
    WHERE gl.user_id = p_user_id AND gl.status = 'success';
END;
$$ LANGUAGE plpgsql;

-- Create function to toggle prompt like
CREATE OR REPLACE FUNCTION toggle_prompt_like(
    p_user_id UUID,
    p_prompt_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
    like_exists BOOLEAN;
BEGIN
    -- Check if like exists
    SELECT EXISTS (
        SELECT 1 FROM prompt_likes 
        WHERE user_id = p_user_id AND prompt_id = p_prompt_id
    ) INTO like_exists;
    
    IF like_exists THEN
        -- Remove like
        DELETE FROM prompt_likes 
        WHERE user_id = p_user_id AND prompt_id = p_prompt_id;
        
        -- Update prompt likes count
        UPDATE prompts 
        SET likes = likes - 1,
            updated_at = NOW()
        WHERE id = p_prompt_id;
        
        RETURN FALSE;
    ELSE
        -- Add like
        INSERT INTO prompt_likes (user_id, prompt_id)
        VALUES (p_user_id, p_prompt_id);
        
        -- Update prompt likes count
        UPDATE prompts 
        SET likes = likes + 1,
            updated_at = NOW()
        WHERE id = p_prompt_id;
        
        RETURN TRUE;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Insert sample prompt categories and featured prompts
INSERT INTO prompts (title, description, content, category, tags, price, author_id, is_featured, is_approved, likes, downloads) VALUES
('Blog Post Writing Assistant', 'Generate engaging blog posts on any topic with proper structure and SEO optimization', 'You are a professional blog writer. Create a comprehensive blog post about [TOPIC]. Include: 1) Catchy headline, 2) Introduction with hook, 3) Main content with subheadings, 4) Conclusion with call-to-action. Make it SEO-friendly and engaging.', 'Writing', ARRAY['blog', 'seo', 'content', 'writing'], 2.00, (SELECT id FROM users LIMIT 1), TRUE, TRUE, 45, 120),
('Social Media Caption Creator', 'Craft compelling captions for Instagram, Twitter, and Facebook posts', 'Create engaging social media captions for [PLATFORM] about [TOPIC]. Include relevant hashtags, emojis, and a clear call-to-action. Keep it concise and engaging for maximum engagement.', 'Social Media', ARRAY['social', 'instagram', 'twitter', 'captions'], 1.50, (SELECT id FROM users LIMIT 1), TRUE, TRUE, 32, 89),
('Product Description Generator', 'Generate persuasive product descriptions that convert visitors to customers', 'Write a compelling product description for [PRODUCT NAME]. Highlight key features, benefits, and unique selling points. Use persuasive language that converts browsers into buyers. Include technical specs if relevant.', 'E-commerce', ARRAY['product', 'sales', 'marketing', 'conversion'], 3.00, (SELECT id FROM users LIMIT 1), FALSE, TRUE, 28, 67);

-- Create RLS (Row Level Security) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE generation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_likes ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (TRUE);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (TRUE);

-- Generation logs - users can only see their own
CREATE POLICY "Users can view own generation logs" ON generation_logs FOR SELECT USING (TRUE);
CREATE POLICY "Users can insert own generation logs" ON generation_logs FOR INSERT WITH CHECK (TRUE);

-- Conversations - users can only see their own
CREATE POLICY "Users can view own conversations" ON conversations FOR SELECT USING (TRUE);
CREATE POLICY "Users can insert own conversations" ON conversations FOR INSERT WITH CHECK (TRUE);

-- Prompts - public read access for approved prompts
CREATE POLICY "Anyone can view approved prompts" ON prompts FOR SELECT USING (is_approved = TRUE);
CREATE POLICY "Authors can manage own prompts" ON prompts FOR ALL USING (TRUE);

-- Prompt purchases - users can only see their own
CREATE POLICY "Users can view own purchases" ON prompt_purchases FOR SELECT USING (TRUE);
CREATE POLICY "Users can make purchases" ON prompt_purchases FOR INSERT WITH CHECK (TRUE);

-- Prompt likes - users can manage their own likes
CREATE POLICY "Users can view all likes" ON prompt_likes FOR SELECT USING (TRUE);
CREATE POLICY "Users can manage own likes" ON prompt_likes FOR ALL USING (TRUE);