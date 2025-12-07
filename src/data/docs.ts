import { Code, CreditCard, Rocket, Sparkles } from "lucide-react";

export interface DocArticle {
  slug: string;
  title: string;
  description: string;
  content: string; // We can use HTML or Markdown here. For simplicity, we'll start with HTML strings.
}

export interface DocCategory {
  id: string;
  title: string;
  icon: any;
  articles: DocArticle[];
}

export const docsData: DocCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Rocket,
    articles: [
      {
        slug: "introduction",
        title: "Introduction to Novluma",
        description: "Everything you need to know to get started with Novluma.",
        content: `
          <h1>Introduction to Novluma</h1>
          <p>Welcome to Novluma, your all-in-one AI content workspace. We help you generate, edit, and publish high-quality content for blogs, social media, and email marketing.</p>
          
          <h2>What is Novluma?</h2>
          <p>Novluma is an advanced SaaS platform powered by Google's Gemini AI. It allows you to:</p>
          <ul>
            <li>Generate SEO-optimized blog posts in seconds.</li>
            <li>Create engaging tweets, LinkedIn posts, and Instagram captions.</li>
            <li>Draft personalized email sequences.</li>
          </ul>
          
          <h2>Who is it for?</h2>
          <p>Novluma is designed for:</p>
          <ul>
            <li><strong>Content Creators</strong>: Speed up your workflow.</li>
            <li><strong>Marketing Agencies</strong>: Scale content production for clients.</li>
            <li><strong>Founders</strong>: Maintain an active social presence while building your business.</li>
          </ul>
        `,
      },
      {
        slug: "quick-start",
        title: "Quick Start Guide",
        description: "Create your first project in under 2 minutes.",
        content: `
          <h1>Quick Start Guide</h1>
          <p>Ready to create your first piece of content? Follow these simple steps.</p>
          
          <h2>Step 1: Dashboard</h2>
          <p>Log in to your dashboard. You'll see a big "New Project" button. Click it.</p>
          
          <h2>Step 2: Choose Your Format</h2>
          <p>Select what you want to create: Blog Post, Social Media Post, or Email.</p>
          
          <h2>Step 3: Define Your Topic</h2>
          <p>Enter a brief description of what you want the AI to write about. Be as specific or as vague as you like.</p>
          
          <h2>Step 4: Generate</h2>
          <p>Click "Generate" and watch the magic happen. You can then use our Magic Editor to refine the result.</p>
        `,
      },
    ],
  },
  {
    id: "features",
    title: "Core Features",
    icon: Sparkles,
    articles: [
      {
        slug: "ai-writer",
        title: "AI Writer",
        description: "Deep dive into our generative AI capabilities.",
        content: `
          <h1>The Novluma AI Writer</h1>
          <p>Our AI writer isn't just a text generator; it's a creative partner. It understands context, tone, and nuance.</p>
          
          <h2>Supported Formats</h2>
          <ul>
            <li><strong>Blog Posts</strong>: Full-length articles with headers and intro/outro.</li>
            <li><strong>Social Media</strong>: Short, punchy content optimized for engagement.</li>
            <li><strong>Emails</strong>: Subject lines and body copy that converts.</li>
          </ul>
          
          <h2>Tone Settings</h2>
          <p>You can adjust the tone of the output to match your brand: Professional, Witty, Urgent, or Friendly.</p>
        `,
      },
      {
        slug: "magic-editor",
        title: "Magic Editor",
        description: "How to specific text with AI commands.",
        content: `
          <h1>Magic Editor</h1>
          <p>The Magic Editor allows you to highlight any text and simply ask the AI to change it.</p>
          
          <h2>Commands</h2>
          <ul>
            <li>"Make it shorter"</li>
            <li>"Make it funnier"</li>
            <li>"Fix grammar"</li>
            <li>"Translate to Spanish"</li>
          </ul>
        `,
      },
    ],
  },
  {
    id: "billing",
    title: "Billing & Account",
    icon: CreditCard,
    articles: [
      {
        slug: "plans",
        title: "Subscription Plans",
        description: "Understanding Free, Pro, and Enterprise tiers.",
        content: `
          <h1>Subscription Plans</h1>
          <p>Novluma offers flexible pricing for teams of all sizes.</p>
          
          <h2>Free Tier</h2>
          <p>Perfect for testing the waters. Includes 5 generations per day.</p>
          
          <h2>Pro Tier ($29/mo)</h2>
          <p>Unlimited generations, priority support, and access to GPT-4 class models.</p>
        `,
      },
    ],
  },
  {
    id: "api",
    title: "API Reference",
    icon: Code,
    articles: [
      {
        slug: "authentication",
        title: "Authentication",
        description: "How to authenticate your API requests.",
        content: `
          <h1>API Authentication</h1>
          <p>All API requests must include your API key in the header.</p>
          <pre><code>Authorization: Bearer YOUR_API_KEY</code></pre>
        `,
      },
      {
        slug: "endpoints",
        title: "Endpoints",
        description: "List of available API endpoints.",
        content: `
          <h1>Endpoints</h1>
          <p>Base URL: <code>https://api.novluma.com/v1</code></p>
          <ul>
            <li><code>POST /generate</code>: Create content.</li>
            <li><code>GET /projects</code>: List your projects.</li>
          </ul>
        `,
      },
    ],
  },
];
