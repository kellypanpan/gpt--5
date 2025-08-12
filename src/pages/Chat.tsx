import { useState, useRef, useEffect } from "react";
import { Send, Plus, MessageSquare, User, Bot, Copy, Share, MoreHorizontal, Settings, PenTool, FileText, Image, Code, Zap, Menu, X, Paperclip, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProtectedFeature } from "@/components/ProtectedFeature";
import { useAuth, useFeatureAccess } from "@/contexts/AuthContext";
import { chatWithGPT4o, generateConversationTitle } from "@/lib/openrouter";
import { createChatSession, getUserChatSessions, addChatMessage, getChatMessages, updateChatSessionTitle, deleteChatSession } from "@/lib/supabase";
import { AuthModal } from "@/components/modals/AuthModal";
import { CompactAuthModal } from "@/components/modals/CompactAuthModal";
import { UpgradeModal } from "@/components/modals/UpgradeModal";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface Tool {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  prompt: string;
}

const TOOLS: Tool[] = [
  {
    id: 'writer',
    name: 'AI Writer',
    icon: PenTool,
    description: 'Generate articles, blogs, and content',
    prompt: 'I want you to act as a professional content writer. Help me create high-quality, engaging content. What would you like me to write about?'
  },
  {
    id: 'pdf',
    name: 'PDF Analyzer',
    icon: FileText,
    description: 'Analyze and summarize PDF documents',
    prompt: 'I want you to act as a document analyst. I will provide you with text from a PDF document and you will help me analyze, summarize, or extract key information from it. What document would you like to analyze?'
  },
  {
    id: 'image',
    name: 'Image Generator',
    icon: Image,
    description: 'Create and describe images',
    prompt: 'I want you to act as an image generation assistant. Help me create detailed prompts for image generation or describe images. What kind of image would you like to create or analyze?'
  },
  {
    id: 'script',
    name: 'Script Generator',
    icon: Code,
    description: 'Generate code and scripts',
    prompt: 'I want you to act as a programming assistant. Help me write, debug, or explain code in any programming language. What programming task can I help you with?'
  },
  {
    id: 'prompts',
    name: 'Prompt Lab',
    icon: Zap,
    description: 'Optimize and create AI prompts',
    prompt: 'I want you to act as a prompt engineering expert. Help me create, optimize, or improve AI prompts for better results. What kind of prompt would you like to work on?'
  }
];

const Chat = () => {
  return <ChatInterface />;
};

const ChatInterface = () => {
  const { user, useCredits, isAuthenticated } = useAuth();
  const { isPaidPlan, userCredits } = useFeatureAccess('chat');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const currentSession = sessions.find(s => s.id === currentSessionId);

  // Load user's chat sessions on component mount
  useEffect(() => {
    if (user?.id) {
      loadChatSessions();
    }
  }, [user?.id]);

  // Load messages when session changes
  useEffect(() => {
    if (currentSessionId) {
      loadChatMessages(currentSessionId);
    }
  }, [currentSessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  const loadChatSessions = async () => {
    if (!user?.id) return;
    
    try {
      const userSessions = await getUserChatSessions(user.id);
      setSessions(userSessions);
      
      // Set first session as current if exists
      if (userSessions.length > 0 && !currentSessionId) {
        setCurrentSessionId(userSessions[0].id);
      }
    } catch (error) {
      console.error('Error loading chat sessions:', error);
    }
  };

  const loadChatMessages = async (sessionId: string) => {
    try {
      const sessionMessages = await getChatMessages(sessionId);
      setMessages(sessionMessages.map(msg => ({
        id: msg.id,
        content: msg.content,
        role: msg.role,
        timestamp: new Date(msg.created_at)
      })));
    } catch (error) {
      console.error('Error loading chat messages:', error);
    }
  };

  // 文件处理函数
  const handleFileSelect = (file: File) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    
    if (file.size > maxSize) {
      alert('File size must be less than 10MB');
      return;
    }
    
    if (!allowedTypes.includes(file.type)) {
      alert('Only images (JPEG, PNG, WebP) and PDF files are supported');
      return;
    }
    
    setAttachedFile(file);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeAttachment = () => {
    setAttachedFile(null);
  };

  // 处理文件内容并生成提示
  const processFileForChat = async (file: File): Promise<string> => {
    if (file.type === 'application/pdf') {
      return `I've attached a PDF file "${file.name}". Please analyze this document and provide insights, summaries, or answer questions about its content.`;
    } else if (file.type.startsWith('image/')) {
      return `I've attached an image "${file.name}". Please analyze this image and describe what you see, or help me with any questions about it.`;
    }
    return `I've attached a file "${file.name}". Please help me analyze it.`;
  };

  const handleSend = async (messageContent?: string) => {
    let content = messageContent || input;
    
    // 如果有附件，处理文件内容
    if (attachedFile) {
      const filePrompt = await processFileForChat(attachedFile);
      content = content.trim() ? `${content}\n\n${filePrompt}` : filePrompt;
    }
    
    if (!content.trim()) return;
    
    // Check if user is authenticated, if not show auth modal
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    // Check and use credits for non-paid users
    if (!isPaidPlan && !useCredits(1)) {
      setShowUpgradeModal(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    // Add user message to local state
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setAttachedFile(null); // 清除附件
    setIsLoading(true);
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      // If no current session, create one
      let sessionId = currentSessionId;
      if (!sessionId && user.id) {
        const newSession = await createChatSession(user.id, 'New Conversation');
        setSessions(prev => [newSession, ...prev]);
        sessionId = newSession.id;
        setCurrentSessionId(sessionId);
      }

      // Save user message to database
      if (sessionId) {
        await addChatMessage(sessionId, 'user', content);
      }

      // Prepare messages for GPT-4o
      const chatMessages = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Stream response from GPT-4o
      setStreamingMessage('');
      const response = await chatWithGPT4o(chatMessages, {
        stream: true,
        onChunk: (chunk) => {
          setStreamingMessage(prev => prev + chunk);
        },
        signal: abortRef.current.signal
      });

      // Add AI response to messages
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setStreamingMessage('');

      // Save AI message to database and update session title
      if (sessionId) {
        await addChatMessage(sessionId, 'assistant', response);
        
        // Generate title for new conversations
        if (messages.length === 0) {
          try {
            const title = await generateConversationTitle([userMessage]);
            setSessions(prev => prev.map(session => 
              session.id === sessionId 
                ? { ...session, title }
                : session
            ));
          } catch (error) {
            console.error('Error generating title:', error);
          }
        }
      }

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setStreamingMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const stopGenerating = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsLoading(false);
    setStreamingMessage(prev => prev); // keep what streamed
  };

  const regenerateLast = async () => {
    // Find last user message
    const lastUser = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUser) return;
    // Remove trailing assistant message if exists at end
    setMessages(prev => {
      const clone = [...prev];
      if (clone.length && clone[clone.length - 1].role === 'assistant') {
        clone.pop();
      }
      return clone;
    });
    await handleSend(lastUser.content);
  };

  const copyText = async (text: string) => {
    try { await navigator.clipboard.writeText(text); } catch {}
  };

  const editLastUser = () => {
    const lastUser = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUser) return;
    setInput(lastUser.content);
    // Optionally remove last assistant so resend makes sense
    setMessages(prev => (prev.length && prev[prev.length-1].role==='assistant') ? prev.slice(0, -1) : prev);
  };

  const createNewChat = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      const newSession = await createChatSession(user!.id, 'New Conversation');
      setSessions(prev => [newSession, ...prev]);
      setCurrentSessionId(newSession.id);
      setMessages([]);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  const handleToolClick = (tool: Tool) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    handleSend(tool.prompt);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // Optionally reload chat sessions after login
    if (user?.id) {
      loadChatSessions();
    }
  };

  const handleUpgrade = () => {
    // Redirect to pricing page or handle upgrade
    window.location.href = '/pricing';
  };

  const onRename = async () => {
    if (!currentSessionId) return;
    try {
      const newTitle = titleInput.trim();
      if (!newTitle) return setIsTitleEditing(false);
      await updateChatSessionTitle(currentSessionId, newTitle);
      setSessions(prev => prev.map(s => s.id === currentSessionId ? { ...s, title: newTitle } : s));
    } catch (e) {
      console.error('rename failed', e);
    } finally {
      setIsTitleEditing(false);
    }
  };

  const onDelete = async () => {
    if (!currentSessionId) return;
    try {
      await deleteChatSession(currentSessionId);
      setSessions(prev => prev.filter(s => s.id !== currentSessionId));
      setCurrentSessionId(null);
      setMessages([]);
    } catch (e) {
      console.error('delete failed', e);
    }
  };

  // Show upgrade modal when user has low credits (1-2 remaining)
  useEffect(() => {
    if (isAuthenticated && !isPaidPlan && userCredits <= 2 && userCredits > 0) {
      const timer = setTimeout(() => {
        setShowUpgradeModal(true);
      }, 1000); // Show after 1 second delay
      return () => clearTimeout(timer);
    }
  }, [userCredits, isAuthenticated, isPaidPlan]);

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-background/80 dark:bg-slate-900/80 backdrop-blur-sm border-r border-border/50 flex flex-col overflow-hidden shadow-sm`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G5</span>
              </div>
              <h1 className="font-semibold text-foreground">GPT-5 AI</h1>
            </div>
          </div>
          
          <Button 
            onClick={createNewChat}
            className="w-full bg-card border border-border text-foreground hover:bg-muted mb-4"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Tools Section */}
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-medium text-muted-foreground mb-3">AI Tools</h2>
          <div className="space-y-2">
            {TOOLS.map(tool => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => handleToolClick(tool)}
                  className="w-full p-3 text-left rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted group-hover:bg-muted/80 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground text-sm">{tool.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{tool.description}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-hidden">
          <div className="p-4">
            <h2 className="text-sm font-medium text-muted-foreground mb-3">Recent Chats</h2>
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {sessions.map(session => (
                  <button
                    key={session.id}
                    onClick={() => setCurrentSessionId(session.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentSessionId === session.id 
                        ? 'bg-muted text-foreground' 
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-4 h-4 text-muted-foreground/70" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{session.title}</p>
                        <p className="text-xs text-muted-foreground/70">
                          {new Date(session.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-border">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary font-medium text-sm">
                {isAuthenticated && isPaidPlan ? 'PRO PLAN' : isAuthenticated ? 'FREE PLAN' : 'GUEST'}
              </span>
              <span className="text-primary/80 text-sm">
                {isAuthenticated && isPaidPlan ? '∞ Unlimited' : isAuthenticated ? `${userCredits} credits` : 'Sign in for credits'}
              </span>
            </div>
            <Button 
              size="sm" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm"
              onClick={() => {
                if (!isAuthenticated) {
                  setShowAuthModal(true);
                } else if (!isPaidPlan) {
                  setShowUpgradeModal(true);
                }
              }}
            >
              {isAuthenticated && isPaidPlan ? 'Manage Plan' : isAuthenticated ? 'Upgrade to Pro' : 'Sign In'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-muted/30">
        {/* Chat Header */}
        <div className="bg-background/90 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-muted-foreground"
            >
              <Menu className="w-4 h-4" />
            </Button>
            <div>
              {isTitleEditing ? (
                <div className="flex items-center gap-2">
                  <Input value={titleInput} onChange={(e) => setTitleInput(e.target.value)} className="h-8" onKeyDown={(e) => e.key==='Enter' && onRename()} />
                  <Button size="sm" variant="outline" onClick={onRename}>Save</Button>
                </div>
              ) : (
                <h2 className="font-medium text-foreground">
                  {currentSession?.title || 'New Conversation'}
                </h2>
              )}
              <p className="text-sm text-muted-foreground">GPT-5 AI Assistant</p>
            </div>
          </div>
          {currentSession && (
            <div className="flex items-center gap-2">
              {!isTitleEditing && (
                <Button size="sm" variant="ghost" onClick={() => { setIsTitleEditing(true); setTitleInput(currentSession.title); }}>Rename</Button>
              )}
              {isLoading || streamingMessage ? (
                <Button size="sm" variant="destructive" onClick={stopGenerating}>Stop</Button>
              ) : (
                <Button size="sm" variant="outline" onClick={regenerateLast}>Regenerate</Button>
              )}
              <Button size="sm" variant="ghost" onClick={editLastUser}>Edit last</Button>
              <Button size="sm" variant="ghost" onClick={onDelete} className="text-red-600 hover:text-red-700 dark:hover:text-red-500">Delete</Button>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="max-w-3xl mx-auto py-8 px-4">
              {messages.length === 0 && !streamingMessage ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Welcome to GPT-5 AI
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    Start a conversation or use one of the AI tools from the sidebar.
                  </p>

                  {/* 示例问题提示 */}
                  <div className="mb-8 max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "Write a Python script to analyze CSV data",
                        "Explain quantum computing in simple terms", 
                        "Create a marketing strategy for a new app",
                        "Help me debug this JavaScript code"
                      ].map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => handleSend(prompt)}
                          className="p-3 text-left text-sm bg-background/40 backdrop-blur-sm border border-border rounded-xl hover:bg-background/60 hover:border-border/80 transition-all duration-200 group"
                        >
                          <div className="flex items-center text-foreground group-hover:text-foreground/80">
                            <span className="mr-2 opacity-50">💭</span>
                            {prompt}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                    {TOOLS.slice(0, 4).map(tool => {
                      const Icon = tool.icon;
                      return (
                        <button
                          key={tool.id}
                          onClick={() => handleToolClick(tool)}
                          className="p-4 text-left rounded-xl border border-border bg-background/60 backdrop-blur-sm hover:border-border/80 hover:bg-background/80 transition-all duration-200 shadow-sm"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                              <Icon className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">{tool.name}</div>
                              <div className="text-sm text-muted-foreground">{tool.description}</div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div key={message.id} className="group">
                      <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
                          }`}>
                            {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                          </div>
                          <div className={`flex-1 min-w-0 p-4 rounded-lg ${message.role === 'user' ? 'text-right bg-primary text-primary-foreground' : 'bg-card text-card-foreground'}`}>
                            <MarkdownRenderer content={message.content} />
                            {message.role === 'assistant' && (
                              <div className={`flex items-center space-x-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity`}>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-foreground" onClick={() => copyText(message.content)}>
                                  <Copy className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-foreground">
                                  <Share className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {streamingMessage && (
                    <div className="group">
                      <div className="flex justify-start">
                        <div className="max-w-[80%] flex items-start gap-3">
                          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0 bg-card text-card-foreground p-4 rounded-lg">
                            <MarkdownRenderer content={streamingMessage + ' '} />
                            <span className="inline-block w-2 h-4 bg-muted-foreground ml-1 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {isLoading && !streamingMessage && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="flex space-x-1 bg-card p-4 rounded-lg">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Input Area */}
        <div 
          className="bg-background/90 backdrop-blur-sm border-t border-border p-4 shadow-sm"
          onDrop={handleFileDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
        >
          <div className="max-w-3xl mx-auto">
            {/* 拖拽覆盖层 */}
            {isDragging && (
              <div className="absolute inset-0 bg-blue-500/10 border-2 border-dashed border-blue-400 rounded-xl flex items-center justify-center z-10">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Drop your file here</p>
                  <p className="text-sm text-muted-foreground">Images (JPEG, PNG, WebP) or PDF files</p>
                </div>
              </div>
            )}

            {/* 附件预览 */}
            {attachedFile && (
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {attachedFile.type.startsWith('image/') ? (
                    <Image className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-200">{attachedFile.name}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">{(attachedFile.size / 1024 / 1024).toFixed(1)} MB</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={removeAttachment}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 dark:hover:bg-blue-900/30"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Message GPT-5..."
                  className="pr-20 py-3 bg-background/80 backdrop-blur-sm border-border focus:border-primary focus:ring-primary rounded-xl shadow-sm"
                  disabled={isLoading}
                />
                
                {/* 附件按钮 */}
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={handleFileInput}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-2"
                  disabled={isLoading}
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                
                {/* 隐藏的文件输入 */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                    e.target.value = ''; // 清空input以允许重复选择同一文件
                  }}
                  className="hidden"
                />
              </div>
              <Button
                onClick={() => handleSend()}
                disabled={(!input.trim() && !attachedFile) || isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl shadow-sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-center mt-2 text-xs text-muted-foreground">
              GPT-5 can make mistakes. Consider checking important information.
            </div>
          </div>
        </div>
      </div>

      {/* Compact Auth Modal */}
      <CompactAuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        showSubscription={true}
      />

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={handleUpgrade}
        remainingCredits={userCredits}
      />
    </div>
  );
};

export default Chat;