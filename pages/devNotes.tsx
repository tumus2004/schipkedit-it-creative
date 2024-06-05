import React from "react";

const DevNotes: React.FC = () => {
  const notesToRemember = [
    {
      id: "1",
      title: "Restart TypeScript server to solve a bunch of linting issues",
      content: `cmd + shift + p, then Restart TS Server (same with ESLint etc)`,
    },
    {
      id: "2",
      title:
        "Change ownership of node_modules cache folder to avoid permission issues",
      content: `sudo mkdir -p node_modules/.cache && sudo chmod -R 777 node_modules/.cache`,
    },
    {
      id: "3",
      title: "Fix openVPN error: Error calling protect() method on socket",
      content:
        "sudo launchctl unload -w /Library/LaunchDaemons/org.openvpn.client.plist",
      contentLine2: "ps auxww | grep ovpnagent",
      contentLine3:
        "sudo launchctl load -w /Library/LaunchDaemons/org.openvpn.client.plist",
      contentLine4: "ps auxww | grep ovpnagent",
    },
  ];

  return (
    <div id="dev-notes" className="p-4 bg-gray-100 h-screen">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
          Dev notes and tips
        </h1>
      </header>

      {notesToRemember.map((notes) => (
        <section
          key={notes.id}
          className="mb-4 p-6 bg-white rounded-lg shadow-md border-l-4 border-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500"
        >
          <div className="ml-4 mb-2 flex items-center gap-2">
            <div className="text-lg font-bold text-gray-600">{notes.id}:</div>
            <div className="text-lg text-gray-800">{notes.title}</div>
          </div>
          <pre className="p-4 bg-gray-100 rounded-lg overflow-auto">
            <code className="text-gray-800">{notes.content}</code>
          </pre>
          {notes.contentLine2 && (
            <pre className="p-4 bg-gray-100 rounded-lg overflow-auto">
              <code className="text-gray-800">{notes.contentLine2}</code>
            </pre>
          )}
          {notes.contentLine3 && (
            <pre className="p-4 bg-gray-100 rounded-lg overflow-auto">
              <code className="text-gray-800">{notes.contentLine3}</code>
            </pre>
          )}
          {notes.contentLine4 && (
            <pre className="p-4 bg-gray-100 rounded-lg overflow-auto">
              <code className="text-gray-800">{notes.contentLine4}</code>
            </pre>
          )}
        </section>
      ))}
    </div>
  );
};

export default DevNotes;
