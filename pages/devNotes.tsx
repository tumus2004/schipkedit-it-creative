import React, { useMemo } from 'react';
import PasswordProtection from '../components/PasswordProtection';

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
				title: 'Manually trigger a pact verification in jenkins',
				content: [
					'You can trigger one in https://build.dev.benon.com/view/Pact/job/Pact.provider-verifier.jl-api-admin/. You need to set:',
					'- GERRIT_PATCHSET_REVISION to latest JL revision in production,',
					'- PACT_CONSUMER_NAME to admin-ui,',
					'- PACT_CONSUMER_VERSION to your admin patch commit hash',
				],
			},
			{
				title: 'check out JL locally and use it against admin/web',
				content: [
					'Checkout the JL patch you want to use',
					'dab repo entrypoint run jl enter',
					'make update_depends_composer',
					'make build',
					'make reload',
				],
			},
			{
				title: 'add to overrides to enable recurring purchase operator recovery',
				content: [
					`"RECURRING_PURCHASE": {
						"operator_recovery": false
					},
					"RECURRING_PURCHASE_SUBSCRIPTION": {
						"enabled": true
					},`,
				],
			},
			{
				title: 'Awesome prompt for cursor',
				content: [
					'Does this component follow react best practices, in particular the SOLID principles? If not, can you refactor it to be better without losing any functionality and without introducing any bugs or typescript errors?',
				],
			},
			{
				title: 'Check if a component is using the correct hook',
				content: [
					'Is this component using the correct hook? If not, can you refactor it to be better without losing any functionality and without introducing any bugs or typescript errors?',
				],
			},
			{
				title: 'Update CMS translations JSON after changing them in admin portal CMS',
				content: [
					'docker exec -ti cms_api yarn cli seed snapshot',
					'docker exec -it cms_api yarn cli metadata snapshot',
				],
			},
			{
				title: 'If you encounter an error around error:  TypeError: Cannot convert undefined or null to object,',
				content: [
					'This is likely because your code is using a named export and looking for a default export.',
					'you can do named but the loadable syntax needs to change',
					'you just do loadable(() => import(‘./VariantC’))',
					'and not import("./VariantC").then((module) => ({ default: module.VariantC })),',
				],
			},
			{
				title: 'enable zendesk/chat widget in staging',
				content: [
					'https://admin.handy5.staging.ozl.jumdev.com/admin/settings/zendesk',
					'ZENDESK_API_KEY: 2e8148dd-5ec1-45ce-bd11-81eb89d9b228',
					'Restart services:',
					'ssh ho-staging5.lan',
					'sudo docker exec -it handy5cluster-jl-cmd-1 bash ./jl_cli.sh ./bin/reload_cluster.php',
					'sudo docker restart handy5cluster-tier2-1',
				],
			},
			{
				title: 'kill cluster staging timer',
				content: ['ssh ho-staging3.lan', 'sudo docker stop handy3cluster-monitor-1'],
			},
			{
				title: 'To start social-play and have the cards visible',
				content: ['dab jl bjumbo open-syndicates;', 'dab syndicates create-promoted-party;'],
			},
		],
		[]
	);

	return (
		<PasswordProtection>
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
						{note.content.map((line: string, index: number) => (
							<pre key={index} className='p-4 bg-gray-100 rounded-lg my-2 overflow-auto'>
								<code className='text-gray-800'>{line}</code>
							</pre>
						))}
					</section>
				))}
			</div>
		</PasswordProtection>
	);
};

export default DevNotes;
