import {
  Code,
  CreditCard,
  Rocket,
  Sparkles,
  Zap,
  LifeBuoy,
} from "lucide-react";

export interface DocArticle {
  slug: string;
  title: string;
  description: string;
  content: string;
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
          <p class="lead">Welcome to Novluma, your all-in-one AI content workspace. We help you generate, edit, and publish high-quality content for blogs, social media, and email marketing.</p>
          
          <div class="callout callout-info">
            <strong>👋 Welcome!</strong> Novluma is designed to value your time. This documentation will help you get up to speed quickly.
          </div>

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
          <p>Log in to your dashboard. You'll see a big <strong>"New Project"</strong> button. Click it.</p>
          
          <h2>Step 2: Choose Your Format</h2>
          <p>Select what you want to create: Blog Post, Social Media Post, or Email.</p>
          
          <h2>Step 3: Define Your Topic</h2>
          <p>Enter a brief description of what you want the AI to write about. Be as specific or as vague as you like.</p>

          <div class="callout callout-tip">
            <strong>💡 Pro Tip:</strong> You can edit the tone of voice setting anytime in your project settings.
          </div>
          
          <h2>Step 4: Generate</h2>
          <p>Click "Generate" and watch the magic happen. You can then use our Magic Editor to refine the result.</p>

          <div class="callout callout-warning">
            <strong>⚠️ Note:</strong> Free tier users are limited to 5 generations per day. Upgrade to Pro for unlimited access.
          </div>
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
      {
        slug: "brand-voice",
        title: "Brand Voice Intelligence",
        description: "Clone your personal writing style using Style DNA.",
        content: `
          <h1>Brand Voice Intelligence (The Personal Layout)</h1>
          <p class="lead">Novluma's Brand Voice system goes beyond simple tone settings. It uses <strong>Style DNA Technology</strong> to mathematically analyze your writing patterns and replicate them.</p>

          <div class="callout callout-info">
            <strong>🎯 The Goal:</strong> Stop the AI from sounding like a generic robot. Make it sound exactly like <em>You</em>.
          </div>

          <h2>How It Works (The 3-Step Process)</h2>
          <br />
          
          <h3>1. The Analyzer (Voice Lab)</h3>
          <p>We analyze your past writing to extract your linguistic fingerprint.</p>
          <ul>
            <li><strong>Input</strong>: You paste a sample text (e.g., a LinkedIn post or email).</li>
            <li><strong>Analysis</strong>: The AI identifies your sentence structure, vocabulary, and emotional undertones.</li>
            <li><strong>Output</strong>: A "Style DNA" profile is saved to your account.</li>
          </ul>
          <br />

          <h3>2. The Vault (Storage)</h3>
          <p>Your voices are stored securely in your private "Voice Vault". You can have unlimited voices for different contexts:</p>
          <ul>
            <li><strong>"LinkedIn Voice"</strong>: Punchy, viral, professional.</li>
            <li><strong>"Newsletter Voice"</strong>: Personal, storytelling, warm.</li>
            <li><strong>"Cold Email Voice"</strong>: Short, direct, sales-focused.</li>
          </ul>
          <br />

          <h3>3. The Ghostwriter (Generation)</h3>
          <p>When you create a new project, select your custom voice. The system performs <strong>Context Injection</strong>, forcing the AI to strictly adhere to your rules before it writes a single word.</p>

          <h2>Step-by-Step Guide</h2>
          <ol>
            <li>Navigate to <strong>Dashboard > Brand Voice</strong>.</li>
            <li>Click <strong>"New Voice"</strong>.</li>
            <li>Paste at least 200 words of content you have written.</li>
            <li>Click <strong>"Analyze DNA"</strong>.</li>
            <li>Review the extracted profile (Tone, Vocabulary, Banned Words).</li>
            <li>Click <strong>"Save Voice"</strong>.</li>
          </ol>

          <h2>Tips for Best Results</h2>
          <ul>
            <li><strong>Consistency is Key</strong>: Don't mix a funny tweet with a serious legal contract in the same sample.</li>
            <li><strong>Length Matters</strong>: Provide at least 3-4 paragraphs for accurate analysis.</li>
            <li><strong>iterate</strong>: If the voice isn't perfect, delete it and try a different sample.</li>
          </ul>
        `,
      },
      {
        slug: "content-templates",
        title: "Content Templates",
        description: "Pre-built structures for viral content.",
        content: `
          <h1>Content Templates</h1>
          <p>Don't start from scratch. Use our proven templates to get a head start.</p>

          <h2>Popular Templates</h2>
          <ul>
            <li><strong>The "How-To" Guide</strong>: Step-by-step educational content.</li>
            <li><strong>The "Listicle"</strong>: 5 ways to do X.</li>
            <li><strong>The "Storyteller"</strong>: Narrative-driven posts for LinkedIn.</li>
          </ul>
        `,
      },
    ],
  },
  {
    id: "best-practices",
    title: "Best Practices",
    icon: Zap,
    articles: [
      {
        slug: "prompt-engineering",
        title: "Prompt Engineering 101",
        description: "How to write prompts that get amazing results.",
        content: `
          <h1>Prompt Engineering 101</h1>
          <p>The quality of the output depends on the quality of the input. Here is how to guide Novluma effectively.</p>

          <h2>The C.R.E.A.T.E Framework</h2>
          <ul>
            <li><strong>C</strong>ontext: Give the AI background info.</li>
            <li><strong>R</strong>ole: Tell it who it is (e.g., "Expert Marketer").</li>
            <li><strong>E</strong>xplicit Instructions: Be clear about what you want.</li>
            <li><strong>A</strong>udience: Who is reading this?</li>
            <li><strong>T</strong>one: How should it sound?</li>
            <li><strong>E</strong>xamples: Provide examples if possible.</li>
          </ul>

          <div class="callout callout-info">
            <strong>Example Prompt:</strong> "Act as a fitness coach. Write a 500-word blog post about 'Keto Diet for Beginners'. Target audience is busy moms. Tone should be encouraging and simple."
          </div>
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
      {
        slug: "managing-subscription",
        title: "Managing Subscription",
        description: "Upgrading, downgrading, and cancellations.",
        content: `
          <h1>Managing Your Subscription</h1>
          <p>You have full control over your billing.</p>

          <h2>Upgrading</h2>
          <p>Go to <strong>Settings > Billing</strong> and click "Upgrade". Changes apply immediately.</p>

          <h2>Canceling</h2>
          <p>We hate to see you go, but you can cancel anytime. Your plan will remain active until the end of the billing period.</p>
        `,
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: LifeBuoy,
    articles: [
      {
        slug: "common-issues",
        title: "Common Issues",
        description: "Solutions to frequent problems.",
        content: `
          <h1>Common Issues</h1>
          
          <h2>Generation Failed or Timed Out</h2>
          <p>If the AI fails to generate content, it may be due to high server load or a network interruption.</p>
          <div class="callout callout-tip">
            <strong>Solution:</strong> Wait 30 seconds and try again. If it persists, check your internet connection.
          </div>

          <h2>"Limit Reached" Error</h2>
          <p>This means you have used all your credits for the day/month.</p>
          <div class="callout callout-info">
            <strong>Solution:</strong> Wait for the daily reset (00:00 UTC) or upgrade to Pro for unlimited access.
          </div>
        `,
      },
      {
        slug: "contact-support",
        title: "Contact Support",
        description: "How to get help from a human.",
        content: `
          <h1>Contact Support</h1>
          <p>Can't find what you're looking for?</p>
          
          <ul>
            <li><strong>Email</strong>: support@novluma.com</li>
            <li><strong>Live Chat</strong>: Available 9am-5pm EST (Pro users only).</li>
          </ul>
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
          
          <div class="callout callout-warning">
            <strong>⚠️ Security:</strong> Never share your API key in client-side code (frontend). Always route requests through your backend.
          </div>
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
