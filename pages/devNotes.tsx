import React, { useMemo } from 'react';

const DevNotes: React.FC = () => {
	const notesToRemember = useMemo(
		() => [
			{
				title: 'Restart TypeScript server to solve a bunch of linting issues',
				content: ['cmd + shift + p, then Restart TS Server (same with ESLint etc)'],
			},
			{
				title: 'Change ownership of node_modules cache folder to avoid permission issues',
				content: ['sudo mkdir -p node_modules/.cache', 'sudo chmod -R 777 node_modules/.cache'],
			},
			{
				title: 'Fix openVPN error: Error calling protect() method on socket',
				content: [
					'sudo launchctl unload -w /Library/LaunchDaemons/org.openvpn.client.plist',
					'ps auxww | grep ovpnagent',
					'sudo launchctl load -w /Library/LaunchDaemons/org.openvpn.client.plist',
					'ps auxww | grep ovpnagent',
				],
			},
			{
				title: 'Run a test file from JL container',
				content: [
					'docker exec -it jl bash',
					'./vendor/bin/phpunit testing/php/jumbo/lotteries/core/service/SubscriptionTicketServiceTest.php',
				],
			},
			{
				title: 'Disable sleep on MacOS',
				content: ['sudo pmset disablesleep 1 // To disable sleep', 'sudo pmset disablesleep 0 // To enable sleep'],
			},
			{
				title: 'To get into consul for a specific built staging environment, example zim5',
				content: ['sudo docker inspect zim5cluster-consul-master-1 | grep master', 'ssh ho-staging5.lan'],
			},
			{
				title: 'ISO 8601 date format',
				content: ['2024-05-31T12:50:11+10:00'],
			},
			{
				title: 'To access the consul UI for a staging environment (example has zim5)',
				content: [
					'https://admin.zim5.staging.ozl.jumdev.com/consul/ui/dc1/services',
					'and look for CONSUL_MASTER_TOKEN',
				],
			},
			{
				title: 'updating an entry in database directly within a container',
				content: [
					'ssh thomassc@ho-staging4.lan',
					'sudo docker exec -it zim4cluster-jl-cmd-test-1 bash',
					'./psql.sh 1 (for example - whichever database # you want to access)',
					'then run `table recurring_purchase_event`',
					`it should be the last number in the list of "recurring_purchase_event_id" list but update the next query to match update recurring_purchase_event`,
					`set recurring_purchase_event_timestamp = '2024-05-24 16:58:20.753479+00', recurring_purchase_event_data = '{"paused_until": "2024-06-15T09:58:20+1000", "is_system_change": false}', recurring_purchase_event_triggered_timestamp = '2024-05-24 05:09:29.530161+00' where recurring_purchase_event_id = #;`,
				],
			},
			{
				title: 'enter JL container locally',
				content: ['docker exec -it jl bash'],
			},
			{
				title: 'execute recurring purchase script/cron to process a scheduled purchase as a status',
				content: [
					`docker exec -it jl bash`,
					`./psql.sh 1 (where 1 is the node number for a customer)`,
					`select * from recurring_purchase_event where recurring_purchase_event_id = 123;`,
					`// OR`,
					`docker exec -it jl bash`,
					`./psql.sh 1`,
					`./bin/jumbo scheduled-purchase-process-on-next-cron -s ENCODED_ID_1 -f deposit_failed`,
				],
			},
			{
				title: 'to purchase all scheduled purchases in the queue',
				content: [
					'docker exec -it jl bash',
					'./jumbo.sh scheduled-purchase-process-on-next-cron --all',
					'./jumbo.sh scheduled-purchase',
				],
			},
			{
				title: 'to get distance of element from left and right edge of page (copy and paste in console)',
				content: [
					`// Replace 'elementId' with the actual ID of your element.
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
}`,
				],
			},
			{
				title: 'Shorthand to convert a string to a float in JavaScript, see the example below.',
				content: [`const isZeroDeposit = isCheckout && +depositAmount.amount === 0.0;`],
			},
			{
				title: 'Manually trigger a pact verification in jenkins',
				content:
					'You can trigger one in https://build.dev.benon.com/view/Pact/job/Pact.provider-verifier.jl-api-admin/. You need to set:\n- GERRIT_PATCHSET_REVISION to latest JL revision in production,\n- PACT_CONSUMER_NAME to admin-ui,\n- PACT_CONSUMER_VERSION to your admin patch commit hash',
			},
		],
		[]
	);

	return (
		<div id='dev-notes' className='p-4 bg-gray-100 h-screen'>
			<header className='mb-6 text-center'>
				<h1 className='text-4xl font-bold bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent'>
					Dev notes and tips
				</h1>
			</header>

			{notesToRemember.map((note) => (
				<section
					key={note.title}
					className='mb-4 p-6 bg-white rounded-lg shadow-md border-l-4 border-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500'
				>
					<div className='ml-4 mb-2 flex items-center gap-2'>
						<div className='text-lg text-gray-800'>{note.title}</div>
					</div>
					{note.content.map((line, index) => (
						<pre key={index} className='p-4 bg-gray-100 rounded-lg my-2 overflow-auto'>
							<code className='text-gray-800'>{line}</code>
						</pre>
					))}
				</section>
			))}
		</div>
	);
};

export default DevNotes;
