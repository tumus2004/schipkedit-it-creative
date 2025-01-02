import { TrendingUp, Brain, BicepsFlexed } from 'lucide-react';

const services = [
	{
		icon: <Brain className='h-12 w-12 text-white' />,
		title: 'Mind',
		description:
			"Unleash Your Potential: It's all in your head. We cut the fluff and rewire your mindset with tough love and proven strategies, breaking barriers to crush your business and life goals.",
	},
	{
		icon: <BicepsFlexed className='h-12 w-12 text-white' />,
		title: 'Body',
		description:
			'Power Up Your Physical Game: Your business thrives when you do. Forget six-packs—this is about stamina, resilience, and peak performance to fuel your entrepreneurial success.',
	},
	{
		icon: <TrendingUp className='h-12 w-12 text-white' />,
		title: 'Profit',
		description:
			'Turbocharge Your Bottom Line: No more financial fumbles. Master strategies to boost revenue, secure profits, and build a resilient business that thrives in any climate.',
	},
];

export const Services = () => {
	return (
		<section id='services' className='py-20 bg-gradient-to-b from-gray-900 to-black'>
			<div className='container mx-auto px-6'>
				<h2 className='text-4xl font-bold text-center text-gradient mb-12'>Mind, Body, Profit: Unleashed.</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{services.map((service, index) => (
						<div
							key={index}
							className='bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-md transition duration-300 hover:bg-opacity-20'
						>
							<div className='mb-4'>{service.icon}</div>
							<h3 className='text-xl font-semibold mb-2 text-white'>{service.title}</h3>
							<p className='text-gray-300'>{service.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
