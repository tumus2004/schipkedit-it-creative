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
    {
      id: "4",
      title: "Run a test file from JL container",
      content: "// Enter the JL container: docker exec -it jl bash",
      contentLine2:
        "Run the php test file: ./vendor/bin/phpunit testing/php/jumbo/lotteries/core/service/SubscriptionTicketServiceTest.php",
    },
    {
      id: "5",
      title: "Disable sleep on MacOS",
      content: "sudo pmset disablesleep 1 // To disable sleep",
      contentLine2: "sudo pmset disablesleep 0 // To enable sleep",
    },
    {
      id: "6",
      title:
        "enable subscription and timed pause in JL overrides for consul config",
      content: `
    "RECURRING_PURCHASE_SUBSCRIPTION": {
    	"enabled": true,
      "timed_pause": {
				"interval": "monthly",
				"options": [
					0,
					1,
					2,
					3
				]
      }
    },
		"RECURRING_PURCHASE_AUTOPLAY": {
			"enabled": true,
			"timed_pause": {
				"interval": "weekly",
				"options": [
					0,
					1,
					3,
					6
				]
			}
		},
      `,
    },
    {
      id: "7",
      title: "Clear cache when consul has changed",
      content: "add ?clear_cache=true to any page url",
    },
    {
      id: "8",
      title:
        "To get into consul for a specific built staging environment, example zim5",
      content: "sudo docker inspect zim5cluster-consul-master-1 | grep master",
      contentLine2: "ssh ho-staging5.lan",
    },
    {
      id: "9",
      title: "ISO 8601 date format",
      content: "2024-05-31T12:50:11+10:00",
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
