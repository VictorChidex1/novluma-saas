import { DashboardLayout } from "../components/DashboardLayout";
import { ArrowLeft, Copy, Check, Terminal, Server, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ApiDocsPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("intro");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)] -m-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard/support")}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-800" />
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-500" />
              Novluma API{" "}
              <span className="text-gray-400 font-normal">v1.0-beta</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-medium border border-yellow-200 dark:border-yellow-800">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-2 animate-pulse" />
              Private Beta
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar: Navigation */}
          <div className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto hidden lg:block">
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Getting Started
                </h3>
                <nav className="space-y-1">
                  <NavLink
                    active={activeSection === "intro"}
                    onClick={() => scrollToSection("intro")}
                  >
                    Introduction
                  </NavLink>
                  <NavLink
                    active={activeSection === "auth"}
                    onClick={() => scrollToSection("auth")}
                  >
                    Authentication
                  </NavLink>
                  <NavLink
                    active={activeSection === "errors"}
                    onClick={() => scrollToSection("errors")}
                  >
                    Errors
                  </NavLink>
                </nav>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Resources
                </h3>
                <nav className="space-y-1">
                  <NavLink
                    active={activeSection === "projects"}
                    onClick={() => scrollToSection("projects")}
                  >
                    Projects
                  </NavLink>
                  <NavLink
                    active={activeSection === "generate"}
                    onClick={() => scrollToSection("generate")}
                  >
                    Generate Content
                  </NavLink>
                </nav>
              </div>
            </div>

            <div className="p-6 mt-auto border-t border-gray-200 dark:border-gray-800">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-300 mb-2">
                  Want early access?
                </h4>
                <p className="text-xs text-indigo-700 dark:text-indigo-400 mb-3">
                  We are currently onboarding developers in batches.
                </p>
                <Button size="sm" className="w-full text-xs" variant="outline">
                  Request Access
                </Button>
              </div>
            </div>
          </div>

          {/* Center: Main Content */}
          <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-950 relative scroll-smooth">
            <div className="max-w-3xl mx-auto p-12 space-y-20">
              {/* Introduction */}
              <section id="intro" className="scroll-mt-24">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-1 mb-8 rounded-2xl">
                  <div className="bg-white dark:bg-gray-950 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg text-indigo-600 dark:text-indigo-400">
                        <Server className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          Coming Soon to Novluma Users
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          You are viewing the{" "}
                          <strong>preview documentation</strong> for our
                          upcoming public API. These endpoints are currently in
                          closed beta testing with select partners.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Introduction
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                  Welcome to the Novluma API documentation (Preview). Once live,
                  our API will allow you to build AI-powered content generation
                  directly into your own applications, workflows, and CMS.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg p-4 flex gap-3">
                  <Server className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-300">
                      Base URL
                    </h4>
                    <p className="text-blue-700 dark:text-blue-400 mt-1 font-mono text-sm">
                      https://api.lumina.com/v1
                    </p>
                  </div>
                </div>
              </section>

              {/* Authentication */}
              <section id="auth" className="scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Authentication
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                  The Novluma API uses API keys to authenticate requests. You
                  can view and manage your API keys in the Dashboard Settings.
                </p>

                <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 rounded-lg p-4 flex gap-3 mb-6">
                  <Key className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900 dark:text-yellow-300">
                      Keep your keys safe
                    </h4>
                    <p className="text-yellow-700 dark:text-yellow-400 mt-1 text-sm">
                      Never share your API keys in publicly accessible areas
                      such as GitHub or client-side code.
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your API keys carry many privileges, so be sure to keep them
                  secure! Do not share your secret API keys in publicly
                  accessible areas such as GitHub, client-side code, and so
                  forth.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Authentication to the API is performed via HTTP Basic Auth.
                  Provide your API key as the basic auth username value. You do
                  not need to provide a password.
                </p>
              </section>

              {/* Generate Content */}
              <section id="generate" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-mono text-sm font-bold border border-green-200 dark:border-green-800">
                    POST
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Generate Content
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                  Generate high-quality blog posts, social media captions, or
                  emails using our AI engine.
                </p>

                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                  Body Parameters
                </h3>
                <div className="space-y-4">
                  <ParameterRow
                    name="topic"
                    type="string"
                    required
                    description="The main subject of your content."
                  />
                  <ParameterRow
                    name="tone"
                    type="string"
                    description="The desired tone (e.g., 'Professional', 'Funny'). Defaults to 'Professional'."
                  />
                  <ParameterRow
                    name="platform"
                    type="string"
                    description="Target platform (e.g., 'LinkedIn', 'Twitter'). Defaults to 'Blog'."
                  />
                </div>
              </section>
            </div>
          </div>

          {/* Right Sidebar: Code Examples (Sticky) */}
          <div className="w-96 bg-gray-900 border-l border-gray-800 overflow-y-auto hidden xl:block">
            <div className="p-6 space-y-12">
              {/* Auth Code */}
              <div
                className={`transition-opacity duration-300 ${
                  activeSection === "auth"
                    ? "opacity-100"
                    : "opacity-40 hover:opacity-100"
                }`}
              >
                <CodeHeader title="Authentication" />
                <CodeBlock
                  code={`curl https://api.lumina.com/v1/projects \\
  -u lumina_live_8923487234:`}
                />
              </div>

              {/* Generate Code */}
              <div
                className={`transition-opacity duration-300 ${
                  activeSection === "generate"
                    ? "opacity-100"
                    : "opacity-40 hover:opacity-100"
                }`}
              >
                <CodeHeader title="Generate Content" />
                <CodeBlock
                  code={`curl https://api.lumina.com/v1/generate \\
  -u lumina_live_8923487234: \\
  -d topic="AI in Healthcare" \\
  -d tone="Professional" \\
  -d platform="LinkedIn"`}
                />

                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Response
                  </p>
                  <CodeBlock
                    code={`{
  "id": "gen_123456789",
  "object": "content",
  "created": 1678900000,
  "content": "Here are 5 ways AI is transforming healthcare..."
}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function NavLink({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active
          ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
      )}
    >
      {children}
    </button>
  );
}

function ParameterRow({
  name,
  type,
  required,
  description,
}: {
  name: string;
  type: string;
  required?: boolean;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-32 shrink-0 font-mono text-sm">
        <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
          {name}
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-gray-500 font-mono">{type}</span>
          {required && (
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">
              Required
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function CodeHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between mb-2 px-1">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {title}
      </span>
      <span className="text-xs text-gray-600">BASH</span>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative bg-black rounded-lg border border-gray-800 overflow-hidden">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 text-gray-400 hover:text-white hover:bg-gray-800"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="w-3 h-3 text-green-500" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs font-mono text-gray-300 leading-relaxed scrollbar-thin scrollbar-thumb-gray-800">
        <code>{code}</code>
      </pre>
    </div>
  );
}
