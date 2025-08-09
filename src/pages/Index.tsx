import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import ToolsSection from "@/components/ToolsSection";
import PricingSection from "@/components/PricingSection";
import { SEOHead } from "@/components/SEOHead";
import Section from "@/components/Section";

const Index = () => {
  return (
    <Layout>
      <SEOHead 
        title="GPT-5 AI Tools Hub - Advanced Writing, Image & Content Generation"
        description="Discover powerful GPT-5 AI tools for writing, image generation, and content creation. Access cutting-edge GPT-5 capabilities with our comprehensive toolset for creators and businesses."
        keywords="gpt-5, gpt-5 ai, gpt-5 tools, gpt-5 writing tool, gpt-5 image generator, ai tools, content generation, artificial intelligence"
      />
      <Hero />
      <Section>
        <ToolsSection />
      </Section>
      <Section>
        <PricingSection />
      </Section>
    </Layout>
  );
};

export default Index;
