import { Facebook, Instagram, Youtube, Linkedin, TwitterIcon as TikTok } from 'lucide-react';

const socialLinks = [
	{ name: 'Facebook', icon: Facebook, url: 'https://facebook.com' },
	{ name: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
	{ name: 'YouTube', icon: Youtube, url: 'https://youtube.com' },
	{ name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
	{ name: 'TikTok', icon: TikTok, url: 'https://tiktok.com' },
];

export const SocialButtons = () => {
	return (
		<section className='py-12 bg-gradient-to-b from-gray-900 to-black'>
			<div className='container mx-auto px-6'>
				<h2 className='text-2xl font-bold text-center text-gradient mb-8'>Connect With Us</h2>
				<div className='flex justify-center space-x-6'>
					{socialLinks.map((social) => (
						<a
							key={social.name}
							href={social.url}
							target='_blank'
							rel='noopener noreferrer'
							className='text-white hover:text-gray-300 transition duration-300'
							aria-label={`Follow us on ${social.name}`}
						>
							<social.icon className='h-8 w-8' />
						</a>
					))}
				</div>
			</div>
		</section>
	);
};
