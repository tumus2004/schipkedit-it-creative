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
    "CLIENT_CAPABILITY_AUTOPLAY_PAUSE": true,
    "CLIENT_CAPABILITY_SUBSCRIPTION_PAUSE": true,
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
    {
      id: "10",
      title:
        "To access the consul UI for a staging environment (example has zim5)",
      content:
        "https://admin.zim5.staging.ozl.jumdev.com/consul/ui/dc1/services",
      contentLine2: "and look for CONSUL_MASTER_TOKEN",
    },
    {
      id: "11",
      title: "updating an entry in database directly within a container",
      content: "ssh thomassc@ho-staging4.lan",
      contentLine2: "sudo docker exec -it zim4cluster-jl-cmd-test-1 bash",
      contentLine3:
        "./psql.sh 1 (for example - whichever database # you want to access)",
      contentLine4: "then run `table recurring_purchase_event`",
      contentLine5: `it should be the last number in the list of "recurring_purchase_event_id" list but update the next query to match update recurring_purchase_event set recurring_purchase_event_timestamp = '2024-05-24 16:58:20.753479+00', recurring_purchase_event_data = '{"paused_until": "2024-06-15T09:58:20+1000", "is_system_change": false}', recurring_purchase_event_triggered_timestamp = '2024-05-24 05:09:29.530161+00' where recurring_purchase_event_id = #;`,
    },
    {
      id: "12",
      title: "consul for scheduled purchasing",
      content: `
    "ADMIN_FEATURE_SCHEDULED_PURCHASE": {
			"enabled": true
		},
		"SCHEDULED_PURCHASE": {
			"enabled": true
    },
      `,
    },
    {
      id: "13",
      title: "enter JL container locally",
      content: "docker exec -it jl bash",
    },
    {
      id: "14",
      title:
        "execute recurring purchase script/cron to process a scheduled purchase as a status",
      content: `
        docker exec -it jl bash
        ./psql.sh 1 (where 1 is the node number for a customer)
        select * from recurring_purchase_event where recurring_purchase_event_id = 123;
      `,
      contentLineTwo: "or",
      contentLine3: `
        docker exec -it jl bash
        ./psql.sh 1
        cd bin
        ./jumbo scheduled-purchase-process-on-next-cron -s ENCODED_ID_1 -f deposit_failed
      `,
    },
    {
      id: '15',
      title: 'to purchase all scheduled purchases in the queue',
      content: `
        docker exec -it jl bash
        ./jumbo.sh scheduled-purchase-process-on-next-cron --all
        ./jumbo.sh scheduled-purchase
      `
    },
    {
      id: '16',
      title: 'to get distance of element from left and right edge of page',
      content:`
        // Replace 'elementId' with the actual ID of your element.
        let elementId = 'elementId';
        let element = document.getElementById(elementId);

        // Make sure the element exists
        if (element) {
          let rect = element.getBoundingClientRect();
          let leftEdgeDistance = rect.left;
          let rightEdgeDistance = window.innerWidth - rect.right;

          console.log("Left Edge Distance (from left side of the window): ", leftEdgeDistance, "px");
          console.log("Right Edge Distance (from right side of the window): ", rightEdgeDistance, "px");
        } else {
          console.log("Element with ID '" + elementId + "' not found.");
        }
      `
    }
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
          {notes.contentLine5 && (
            <pre className="p-4 bg-gray-100 rounded-lg overflow-auto">
              <code className="text-gray-800">{notes.contentLine5}</code>
            </pre>
          )}
        </section>
      ))}
    </div>
  );
};

export default DevNotes;
