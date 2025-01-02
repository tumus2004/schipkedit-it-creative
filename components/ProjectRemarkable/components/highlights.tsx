import { TrendingUp, Award, Users } from 'lucide-react';

const highlights = [
	{
		icon: TrendingUp,
		title: '10x Growth',
		description: 'Our clients see an average of 10x growth in their key performance indicators.',
	},
	{
		icon: Award,
		title: 'Industry Leaders',
		description: 'Recognized as top performance coaches by Forbes and Harvard Business Review.',
	},
	{
		icon: Users,
		title: '1000+ Clients',
		description: "We've helped over 1000 businesses and individuals reach their peak potential.",
	},
];

export const Highlights = () => {
	return (
		<section className='py-16 bg-gradient-to-b from-black to-gray-900'>
			<div className='container mx-auto px-6'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{highlights.map((item, index) => (
						<div key={index} className='flex flex-col items-center text-center'>
							<item.icon className='h-16 w-16 text-white mb-4' />
							<h3 className='text-2xl font-bold text-gradient mb-2'>{item.title}</h3>
							<p className='text-gray-300'>{item.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
