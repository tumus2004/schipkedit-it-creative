import Image from 'next/image';

const testimonials = [
	{
		img: '/img/testimonials/michael-harris.webp',
		quote:
			'Andrew is an exceptional mentor and coach, and has provided outstanding results not only for my business but within myself as well. Working with him gave me the clarity and perspective I needed to launch my business successfully, and he continues to be a vital asset as I grow and scale month-on-month. If I could leave a 6-star rating, he would certainly deserve it.',
		author: 'Michael Harris',
		title: 'NSW',
	},
	{
		img: '/img/testimonials/melanie-taylor.webp',
		quote:
			'take time out to realign your business as it grows. My business has doubled and was trying to run my new business in the old business time management frame. Thanks Andrew Cominos for being a super coach!',
		author: 'Melanie Taylor',
		title: 'Vic',
	},
	{
		img: '/img/testimonials/peter-spinda.webp',
		quote: `I talk from experience. Thanks to Andrew, I'm in a place with my business that I only dreamed of six months ago, kicking serious goals and having truckloads of fun along the way. I can't speak highly enough of Andrew Cominos. Seriously. If you want to take your business to the next level, if you want to perform like you've been set free from all that has held you back, then you must reach out.`,
		author: 'Peter Spinda',
		title: 'Qld',
	},
];

export const Testimonials = () => {
	return (
		<section id='testimonials' className='py-20 bg-gradient-to-b from-black to-gray-900'>
			<div className='container mx-auto px-6'>
				<h2 className='text-4xl font-bold text-center text-gradient mb-12'>What Our Clients Say</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					{testimonials.map((testimonial, index) => (
						<div
							key={index}
							className='bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-md transition duration-300 hover:bg-opacity-20'
						>
							<p className='text-gray-300 mb-4 italic'>&ldquo;{testimonial.quote}&rdquo;</p>
							<div className='flex items-center'>
								<Image
									src={testimonial.img}
									alt={testimonial.author}
									width={50}
									height={50}
									className='rounded-full mr-4'
								/>
								<div>
									<p className='font-semibold text-white'>{testimonial.author}</p>
									<p className='text-gray-400 text-sm'>{testimonial.title}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
