import React from 'react';

const Contact: React.FC = () => {
	return (
		<div
			className='bg-center w-full h-screen bg-no-repeat bg-cover md:bg-fixed'
			style={{ backgroundImage: `url('./background_image.jpg')` }}
		>
			<div className='container mx-auto px-6 py-16'>
				<h1 className='text-3xl font-bold text-white'>Contact Us</h1>
				<p className='text-white text-xl font-light mt-4'>
					If you have any questions or would like to work with us, please dont hesitate to contact us using the
					information below:
				</p>
				<div className='mt-12'>
					<p className='font-bold text-lg text-white'>Phone:</p>
					<p className='text-white mt-2'>+1 555 555 5555</p>
				</div>
				<div className='mt-12'>
					<p className='font-bold text-lg text-white'>Email:</p>
					<p className='text-white mt-2'>info@example.com</p>
				</div>
				<div className='mt-12'>
					<p className='font-bold text-lg text-white'>Address:</p>
					<p className='text-white mt-2'>
						123 Main Street
						<br />
						Anytown, USA 12345
					</p>
				</div>
				<div className='mt-12'>
					<p className='font-bold text-lg text-white'>LinkedIn:</p>
					<p className='text-white mt-2'>
						<a href='https://www.linkedin.com/in/your-profile' target='_blank' rel='noopener noreferrer'>
							https://www.linkedin.com/in/your-profile
						</a>
					</p>
				</div>
				<div className='mt-12'>
					<p className='font-bold text-lg text-white'>Instagram:</p>
					<p className='text-white mt-2'>
						<a href='https://www.instagram.com/your-profile' target='_blank' rel='noopener noreferrer'>
							https://www.instagram.com/your-profile
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Contact;
