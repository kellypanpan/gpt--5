import React from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Brain, 
  Settings, 
  Code, 
  Workflow, 
  ArrowRight, 
  User, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  Play,
  Cog,
  Bot,
  Database,
  Network,
  Zap
} from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

const GPT5AgentBuildingTutorial = () => {
  const articleMetadata = {
    title: "GPT-5 Agent Building Tutorial: Create Intelligent AI Agents | Complete Guide 2025",
    description: "Learn how to build powerful GPT-5 agents step-by-step. Complete tutorial covering agent architecture, tools integration, and advanced automation with practical examples.",
    author: "GPT-5 Tools Team",
    datePublished: "2025-01-15",
    dateModified: "2025-01-15",
    coverImage: "/images/gpt5-agent-tutorial-cover.jpg",
    excerpt: "Complete guide to building intelligent GPT-5 agents with tools, memory, and autonomous capabilities.",
    readTime: "25 min read"
  };

  return (
    <>
      <SEOHead 
        title={articleMetadata.title}
        description={articleMetadata.description}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "GPT-5 Agent Building Tutorial: Create Intelligent AI Agents",
            datePublished: articleMetadata.datePublished,
            dateModified: articleMetadata.dateModified,
            author: { "@type": "Person", name: articleMetadata.author },
            publisher: {
              "@type": "Organization",
              name: "GPT-5 Tools",
              logo: {
                "@type": "ImageObject",
                url: "https://gpt-5ai.com/g5-logo.png",
              },
            },
            image: articleMetadata.coverImage,
            description: articleMetadata.description,
          }),
        }}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-20">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              GPT-5 Agent Building Tutorial
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master the art of building intelligent GPT-5 agents. Learn to create autonomous AI systems 
              with tools, memory, and advanced reasoning capabilities through practical examples.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>Written by {articleMetadata.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Updated {new Date(articleMetadata.dateModified).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <span>•</span>
              <span>{articleMetadata.readTime}</span>
            </div>
          </div>

          {/* Table of Contents */}
          <Card className="max-w-4xl mx-auto mb-8 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Complete Tutorial Contents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <a href="#agent-fundamentals" className="block text-primary hover:underline">Agent Architecture Fundamentals</a>
                <a href="#development-setup" className="block text-primary hover:underline">Development Environment Setup</a>
                <a href="#basic-agent" className="block text-primary hover:underline">Building Your First Agent</a>
                <a href="#tools-integration" className="block text-primary hover:underline">Tools & Function Integration</a>
                <a href="#memory-system" className="block text-primary hover:underline">Memory & Context Management</a>
                <a href="#advanced-patterns" className="block text-primary hover:underline">Advanced Agent Patterns</a>
                <a href="#multi-agent" className="block text-primary hover:underline">Multi-Agent Systems</a>
                <a href="#deployment" className="block text-primary hover:underline">Production Deployment</a>
              </nav>
            </CardContent>
          </Card>

          <div className="max-w-4xl mx-auto">
            {/* Agent Fundamentals */}
            <section id="agent-fundamentals" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Agent Architecture Fundamentals</h2>
              
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  GPT-5 agents are autonomous AI systems that can reason, plan, and execute tasks using tools and external resources. 
                  Unlike simple chatbots, agents have memory, can call functions, and maintain state across interactions.
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    Core Agent Components
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="font-semibold text-blue-600 mb-2">Reasoning Engine</div>
                      <div className="text-sm text-muted-foreground">
                        GPT-5 model that processes inputs, makes decisions, and generates responses
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="font-semibold text-green-600 mb-2">Tool System</div>
                      <div className="text-sm text-muted-foreground">
                        External functions the agent can call (APIs, databases, calculations)
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="font-semibold text-purple-600 mb-2">Memory Store</div>
                      <div className="text-sm text-muted-foreground">
                        Persistent storage for conversation history and learned information
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="font-semibold text-orange-600 mb-2">Control Flow</div>
                      <div className="text-sm text-muted-foreground">
                        Logic that manages agent behavior, task planning, and execution
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-6">
                  <h4 className="font-semibold mb-3">Agent vs. Traditional AI Systems</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Aspect</th>
                          <th className="text-left py-2">Traditional AI</th>
                          <th className="text-left py-2">GPT-5 Agents</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted-foreground">
                        <tr className="border-b">
                          <td className="py-2 font-medium">Interaction</td>
                          <td className="py-2">Single request-response</td>
                          <td className="py-2">Multi-turn, stateful conversations</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Capabilities</td>
                          <td className="py-2">Text generation only</td>
                          <td className="py-2">Tools, functions, external APIs</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Memory</td>
                          <td className="py-2">No persistent memory</td>
                          <td className="py-2">Long-term memory and context</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Autonomy</td>
                          <td className="py-2">Passive response generation</td>
                          <td className="py-2">Proactive task execution</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* Development Setup */}
            <section id="development-setup" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Development Environment Setup</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Required Dependencies</h3>
                  <div className="bg-black rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
                    <div># Install required packages</div>
                    <div>pip install openai>=1.12.0</div>
                    <div>pip install langchain>=0.1.0</div>
                    <div>pip install chromadb>=0.4.0</div>
                    <div>pip install pydantic>=2.0.0</div>
                    <div>pip install python-dotenv>=1.0.0</div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-6">
                  <h4 className="font-semibold mb-3">Project Structure</h4>
                  <div className="bg-background rounded-lg p-4 font-mono text-sm">
                    <div>gpt5-agent/</div>
                    <div>├── agent/</div>
                    <div>│   ├── __init__.py</div>
                    <div>│   ├── core.py          # Main agent class</div>
                    <div>│   ├── tools.py        # Tool definitions</div>
                    <div>│   ├── memory.py       # Memory management</div>
                    <div>│   └── prompts.py      # System prompts</div>
                    <div>├── examples/</div>
                    <div>│   ├── basic_agent.py  # Simple examples</div>
                    <div>│   └── advanced_agent.py</div>
                    <div>├── .env               # API keys</div>
                    <div>├── requirements.txt</div>
                    <div>└── main.py           # Entry point</div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <div className="font-semibold text-yellow-800">Environment Configuration</div>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Create a .env file with your OpenAI API key: OPENAI_API_KEY=your_key_here
                  </p>
                </div>
              </div>
            </section>

            {/* Basic Agent */}
            <section id="basic-agent" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Building Your First Agent</h2>
              
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  Let's start with a simple agent that can answer questions and perform basic calculations.
                </p>

                <div className="bg-muted/30 rounded-lg p-6">
                  <h4 className="font-semibold mb-3">Basic Agent Implementation</h4>
                  <div className="bg-black rounded-lg p-4 text-white font-mono text-sm overflow-x-auto">
                    <div className="text-green-400"># agent/core.py</div>
                    <div>import openai</div>
                    <div>from typing import List, Dict, Any</div>
                    <div>import json</div>
                    <br />
                    <div>class GPT5Agent:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;def __init__(self, api_key: str, model: str = "gpt-4"):</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.client = openai.OpenAI(api_key=api_key)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.model = model</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.conversation_history = []</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.available_tools = {}</div>
                    <br />
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;def add_tool(self, name: str, function: callable, description: str):</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"""Register a tool that the agent can use"""</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.available_tools[name] = {</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"function": function,</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"description": description</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div>
                    <br />
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;def chat(self, message: str) -> str:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"""Main chat interface"""</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.conversation_history.append({"role": "user", "content": message})</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response = self.client.chat.completions.create(</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;model=self.model,</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;messages=self.conversation_history,</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;functions=self._get_function_definitions(),</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;function_call="auto"</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</div>
                    <br />
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return self._process_response(response)</div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div className="font-semibold text-green-800">Quick Start Example</div>
                  </div>
                  <div className="bg-black rounded-lg p-3 text-green-400 font-mono text-sm">
                    <div># Create and use a basic agent</div>
                    <div>agent = GPT5Agent(api_key="your-key")</div>
                    <div>response = agent.chat("Hello! Can you help me with math?")</div>
                    <div>print(response)</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tools Integration */}
            <section id="tools-integration" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Tools & Function Integration</h2>
              
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  Tools are the key to making your agent truly powerful. They allow the agent to interact with external systems, 
                  perform calculations, access databases, and much more.
                </p>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Common Tool Categories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="font-semibold text-purple-600 mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Computation Tools
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Calculator for math operations</li>
                        <li>• Code execution environments</li>
                        <li>• Data analysis functions</li>
                        <li>• Statistical calculations</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="font-semibold text-blue-600 mb-2 flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        Data Access Tools
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Database queries</li>
                        <li>• File system operations</li>
                        <li>• API integrations</li>
                        <li>• Web scraping tools</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="font-semibold text-green-600 mb-2 flex items-center gap-2">
                        <Network className="h-4 w-4" />
                        Communication Tools
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Email sending</li>
                        <li>• Slack/Discord bots</li>
                        <li>• SMS messaging</li>
                        <li>• Social media posting</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="font-semibold text-orange-600 mb-2 flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        System Tools
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Task scheduling</li>
                        <li>• File management</li>
                        <li>• System monitoring</li>
                        <li>• Process automation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-6">
                  <h4 className="font-semibold mb-3">Example: Calculator Tool Implementation</h4>
                  <div className="bg-black rounded-lg p-4 text-white font-mono text-sm overflow-x-auto">
                    <div className="text-green-400"># agent/tools.py</div>
                    <div>import math</div>
                    <div>from typing import Union</div>
                    <br />
                    <div>def calculator(expression: str) -> Union[float, str]:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;"""</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;Safely evaluate mathematical expressions.</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;Args:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;expression: Mathematical expression to evaluate</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;Returns:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result of the calculation or error message</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;"""</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;try:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Safe evaluation of mathematical expressions</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;allowed_names = {</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"abs": abs, "round": round, "min": min, "max": max,</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"sum": sum, "pow": pow, "sqrt": math.sqrt,</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"sin": math.sin, "cos": math.cos, "tan": math.tan,</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"pi": math.pi, "e": math.e</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result = eval(expression, {"__builtins__": {}}, allowed_names)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return float(result)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;except Exception as e:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return f"Error: {str(e)}"</div>
                    <br />
                    <div className="text-green-400"># Register the tool</div>
                    <div>agent.add_tool(</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;"calculator",</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;calculator,</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;"Perform mathematical calculations"</div>
                    <div>)</div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-blue-800">Advanced Tool Pattern: Weather API</h4>
                  <div className="bg-black rounded-lg p-3 text-blue-400 font-mono text-sm">
                    <div>def get_weather(city: str, api_key: str) -> dict:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;"""Get current weather for a city"""</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;url = f"http://api.openweathermap.org/data/2.5/weather"</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;params = {"q": city, "appid": api_key, "units": "metric"}</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;response = requests.get(url, params=params)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;return response.json()</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Memory System */}
            <section id="memory-system" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Memory & Context Management</h2>
              
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  Memory is what transforms a simple AI model into a persistent, intelligent agent. GPT-5 agents can remember 
                  past conversations, learn user preferences, and maintain context across sessions.
                </p>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Memory Architecture</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-2">Short-term</div>
                      <div className="text-sm text-muted-foreground">Current conversation context and recent interactions</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">Working</div>
                      <div className="text-sm text-muted-foreground">Task-specific information and intermediate results</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">Long-term</div>
                      <div className="text-sm text-muted-foreground">Persistent knowledge and learned patterns</div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-6">
                  <h4 className="font-semibold mb-3">Memory Implementation with ChromaDB</h4>
                  <div className="bg-black rounded-lg p-4 text-white font-mono text-sm overflow-x-auto">
                    <div className="text-green-400"># agent/memory.py</div>
                    <div>import chromadb</div>
                    <div>from datetime import datetime</div>
                    <div>import json</div>
                    <br />
                    <div>class AgentMemory:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;def __init__(self, persist_directory: str = "./memory"):</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.client = chromadb.PersistentClient(path=persist_directory)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.collection = self.client.get_or_create_collection("agent_memory")</div>
                    <br />
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;def store_interaction(self, user_input: str, agent_response: str, metadata: dict = None):</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"""Store a conversation turn"""</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;interaction_id = f"interaction_{datetime.now().isoformat()}"</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.collection.add(</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;documents=[f"User: {user_input}\\nAgent: {agent_response}"],</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadatas=[metadata or {}],</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ids=[interaction_id]</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</div>
                    <br />
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;def recall_similar(self, query: str, n_results: int = 5) -> list:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"""Retrieve similar past interactions"""</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;results = self.collection.query(</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;query_texts=[query],</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;n_results=n_results</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return results["documents"][0]</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle>Memory Best Practices</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Store metadata with timestamps and context</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Implement memory compression for long conversations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Use semantic search for relevant recall</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Regularly clean up outdated information</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle>Performance Optimization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <div className="font-medium text-sm mb-1">Vector Indexing</div>
                          <div className="text-xs text-muted-foreground">Use HNSW indexes for fast similarity search</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="font-medium text-sm mb-1">Batch Operations</div>
                          <div className="text-xs text-muted-foreground">Process multiple memory operations together</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="font-medium text-sm mb-1">Memory Limits</div>
                          <div className="text-xs text-muted-foreground">Set maximum context window and auto-summarize</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Advanced Patterns */}
            <section id="advanced-patterns" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Advanced Agent Patterns</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">ReAct (Reasoning + Acting) Pattern</h3>
                  <p className="text-muted-foreground mb-4">
                    The ReAct pattern combines reasoning and acting, allowing agents to think through problems step-by-step 
                    while taking actions and observing results.
                  </p>
                  
                  <div className="bg-black rounded-lg p-4 text-white font-mono text-sm overflow-x-auto">
                    <div className="text-indigo-400"># ReAct implementation</div>
                    <div>def react_cycle(self, task: str) -> str:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;"""Execute ReAct reasoning cycle"""</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;thought = self._think(task)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;action = self._plan_action(thought)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;observation = self._execute_action(action)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;return self._reflect(thought, action, observation)</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Workflow className="h-5 w-5" />
                        Chain-of-Thought
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Break down complex problems into step-by-step reasoning chains.
                      </p>
                      <div className="bg-muted/50 p-3 rounded text-xs font-mono">
                        Problem → Think → Step 1 → Step 2 → ... → Solution
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Self-Correction
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Enable agents to review and correct their own outputs.
                      </p>
                      <div className="bg-muted/50 p-3 rounded text-xs font-mono">
                        Output → Review → Identify Issues → Correct → Final
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted/30 rounded-lg p-6">
                  <h4 className="font-semibold mb-3">Planning and Execution Framework</h4>
                  <div className="bg-black rounded-lg p-4 text-white font-mono text-sm overflow-x-auto">
                    <div className="text-green-400"># Advanced planning system</div>
                    <div>class TaskPlanner:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;def create_plan(self, goal: str) -> List[Dict]:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"""Break down goal into actionable steps"""</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prompt = f"""</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Create a detailed plan to achieve: {goal}</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Break it into specific, actionable steps.</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Format as JSON with: step, action, tool, expected_outcome</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"""</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response = self.agent.chat(prompt)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return json.loads(response)</div>
                    <br />
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;def execute_plan(self, plan: List[Dict]) -> Dict:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"""Execute plan steps with monitoring"""</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;results = []</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for step in plan:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result = self._execute_step(step)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if not result.success:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return self._replan(step, result.error)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;results.append(result)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return {"status": "completed", "results": results}</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Multi-Agent Systems */}
            <section id="multi-agent" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Multi-Agent Systems</h2>
              
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  Multiple agents can work together to solve complex problems, each with specialized roles and capabilities.
                </p>

                <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Agent Coordination Patterns</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="font-semibold text-cyan-600 mb-2">Hierarchical</div>
                      <div className="text-sm text-muted-foreground">
                        Manager agent coordinates specialist agents for complex tasks
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="font-semibold text-blue-600 mb-2">Collaborative</div>
                      <div className="text-sm text-muted-foreground">
                        Agents work together as equals, sharing information and resources
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="font-semibold text-purple-600 mb-2">Pipeline</div>
                      <div className="text-sm text-muted-foreground">
                        Sequential processing where each agent handles a specific stage
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-6">
                  <h4 className="font-semibold mb-3">Multi-Agent Implementation Example</h4>
                  <div className="bg-black rounded-lg p-4 text-white font-mono text-sm overflow-x-auto">
                    <div className="text-green-400"># Multi-agent system</div>
                    <div>class MultiAgentSystem:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;def __init__(self):</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.agents = {</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"researcher": ResearchAgent(),</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"writer": WriterAgent(),</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"critic": CriticAgent(),</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"coordinator": CoordinatorAgent()</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</div>
                    <br />
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;def collaborative_task(self, task: str) -> str:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"""Execute task using multiple specialized agents"""</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;plan = self.agents["coordinator"].create_plan(task)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;research = self.agents["researcher"].gather_info(plan)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;draft = self.agents["writer"].create_content(research)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;feedback = self.agents["critic"].review(draft)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return self.agents["writer"].revise(draft, feedback)</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Deployment */}
            <section id="deployment" className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Production Deployment</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Deployment Considerations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Scalability</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Load balancing across multiple instances</li>
                        <li>• Auto-scaling based on demand</li>
                        <li>• Distributed memory systems</li>
                        <li>• Async task processing</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Monitoring</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Response time tracking</li>
                        <li>• Error rate monitoring</li>
                        <li>• Token usage analytics</li>
                        <li>• Agent performance metrics</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-6">
                  <h4 className="font-semibold mb-3">Docker Deployment Example</h4>
                  <div className="bg-black rounded-lg p-4 text-white font-mono text-sm overflow-x-auto">
                    <div className="text-green-400"># Dockerfile</div>
                    <div>FROM python:3.11-slim</div>
                    <br />
                    <div>WORKDIR /app</div>
                    <div>COPY requirements.txt .</div>
                    <div>RUN pip install -r requirements.txt</div>
                    <br />
                    <div>COPY . .</div>
                    <div>EXPOSE 8000</div>
                    <br />
                    <div>CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]</div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <div className="font-semibold text-yellow-800">Security Best Practices</div>
                  </div>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Use environment variables for API keys</li>
                    <li>• Implement rate limiting and authentication</li>
                    <li>• Sanitize all user inputs</li>
                    <li>• Monitor for suspicious activity</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Related Articles */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>You might also like</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Badge variant="outline" className="text-xs w-fit mb-2">Practical Guide</Badge>
                      <CardTitle className="text-lg">
                        <Link to="/blog/prompt-engineering-guide" className="hover:text-primary transition-colors">
                          GPT-5 Prompt Engineering Guide
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">
                        Master prompt engineering techniques for optimal GPT-5 performance.
                      </p>
                      <Link to="/blog/prompt-engineering-guide">
                        <Button variant="outline" size="sm">
                          Read More
                          <ArrowRight className="h-3 w-3 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Badge variant="outline" className="text-xs w-fit mb-2">Technical Analysis</Badge>
                      <CardTitle className="text-lg">
                        <Link to="/blog/gpt-5-technical-deep-dive" className="hover:text-primary transition-colors">
                          GPT-5 Technical Deep Dive
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">
                        Understand GPT-5's architecture and technical capabilities.
                      </p>
                      <Link to="/blog/gpt-5-technical-deep-dive">
                        <Button variant="outline" size="sm">
                          Read More
                          <ArrowRight className="h-3 w-3 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Badge variant="outline" className="text-xs w-fit mb-2">Business Guide</Badge>
                      <CardTitle className="text-lg">
                        <Link to="/blog/gpt-5-for-business" className="hover:text-primary transition-colors">
                          GPT-5 for Business Applications
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">
                        Learn how to implement GPT-5 in business workflows.
                      </p>
                      <Link to="/blog/gpt-5-for-business">
                        <Button variant="outline" size="sm">
                          Read More
                          <ArrowRight className="h-3 w-3 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Build Your First GPT-5 Agent</h2>
              <p className="text-muted-foreground mb-6">
                Ready to start building? Try our GPT-5 powered tools and experience agent capabilities firsthand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/tools/writer">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Play className="h-4 w-4 mr-2" />
                    Try GPT-5 Tools
                  </Button>
                </Link>
                <Link to="/tools">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore All Features
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GPT5AgentBuildingTutorial;