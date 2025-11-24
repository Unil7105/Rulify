export default function McpUsageGuide() {
  return (
    <div className="bg-[#161616] border border-[#212121] rounded-lg p-8 shadow-lg shadow-black/20">
      <h2 className="text-3xl font-semibold text-white mb-6">How to Use Model Context Protocol (MCP) in Cursor</h2>

      {/* What is MCP Section */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-white mb-4">1. What is MCP?</h3>
        <div className="text-[#C4C4C4] leading-relaxed">
          <p className="mb-3">
            <strong className="text-white">Definition:</strong> Model Context Protocol (MCP) is an open protocol that enables users to provide custom tools to agentic LLMs (Large Language Models) within Cursor&apos;s Composer feature.
          </p>
        </div>
      </section>

      {/* Installation Steps Section */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-white mb-4">2. Installation Steps</h3>
        <div className="text-[#C4C4C4] leading-relaxed space-y-4">
          <div>
            <h4 className="text-xl font-medium text-white mb-2">Step 1: Open Cursor Settings</h4>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Navigate to <code className="bg-[#0D0D0D] px-2 py-1 rounded text-[#4DA3FF]">Cursor Settings &gt; Features &gt; MCP</code></li>
              <li>Click the <code className="bg-[#0D0D0D] px-2 py-1 rounded text-[#4DA3FF]">&quot;+ Add New MCP Server&quot;</code> button</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-medium text-white mb-2">Step 2: Configure the Server</h4>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li><strong className="text-white">Name:</strong> Assign a nickname to your server</li>
              <li><strong className="text-white">Type:</strong> Select the transport type, either <code className="bg-[#0D0D0D] px-2 py-1 rounded text-[#4DA3FF]">stdio</code> or <code className="bg-[#0D0D0D] px-2 py-1 rounded text-[#4DA3FF]">sse</code></li>
              <li><strong className="text-white">Command/URL:</strong>
                <ul className="list-circle list-inside ml-6 mt-2 space-y-1">
                  <li>For SSE servers: Enter the URL of the SSE endpoint</li>
                  <li>For stdio servers: Provide a valid shell command to run the server</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Example Configurations Section */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-white mb-4">3. Example Configurations</h3>
        <div className="text-[#C4C4C4] leading-relaxed space-y-4">
          <div>
            <h4 className="text-xl font-medium text-white mb-2">For stdio Server (Weather Server Example):</h4>
            <div className="bg-[#0D0D0D] border border-[#212121] rounded-lg p-4 mt-2">
              <p className="text-sm text-[#868686] mb-1">Command:</p>
              <code className="text-[#4DA3FF] text-sm break-all">
                node ~/mcp-quickstart/weather-server-typescript/build/index.js
              </code>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-medium text-white mb-2">For SSE Server:</h4>
            <div className="bg-[#0D0D0D] border border-[#212121] rounded-lg p-4 mt-2">
              <p className="text-sm text-[#868686] mb-1">URL:</p>
              <code className="text-[#4DA3FF] text-sm break-all">
                http://example.com:8000/sse
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Using MCP Tools Section */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-white mb-4">4. Using MCP Tools</h3>
        <div className="text-[#C4C4C4] leading-relaxed space-y-4">
          <div>
            <h4 className="text-xl font-medium text-white mb-2">1. Tool Availability</h4>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>After adding a server, it will appear in your MCP servers list</li>
              <li>A refresh button might be needed to populate the tool list</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-medium text-white mb-2">2. Using Tools in Composer</h4>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>The Composer Agent automatically uses MCP tools when relevant</li>
              <li>Explicit tool usage can be prompted by:
                <ul className="list-circle list-inside ml-6 mt-2 space-y-1">
                  <li>Referring to the tool by name</li>
                  <li>Describing the tool&apos;s function</li>
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-medium text-white mb-2">3. Tool Execution Process</h4>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Displays a message in chat requesting approval</li>
              <li>Shows tool call arguments (which are expandable)</li>
              <li>Executes the tool upon user approval</li>
              <li>Displays the tool&apos;s response in the chat</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Important Notes Section */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-white mb-4">5. Important Notes</h3>
        <ul className="list-disc list-inside ml-4 space-y-2 text-[#C4C4C4] leading-relaxed">
          <li>MCP tools may not be compatible with all models</li>
          <li>MCP tools are exclusively available to the Agent in Composer</li>
          <li>For servers requiring environment variables, a wrapper script should be created to set these variables before running the server</li>
        </ul>
      </section>
    </div>
  );
}

