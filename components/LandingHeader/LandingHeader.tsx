import React, { useRef, useEffect } from 'react';

export const LandingHeader = () => {
	const headerRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const header = headerRef.current;
		if (!header) return;

		header.style.color = 'transparent';
		header.style.background = 'linear-gradient(90deg, teal, green, yellow, orange, red)';
		header.style.backgroundClip = 'text';

		const handleMouseMove = (event: MouseEvent) => {
			const { left, top, width, height } = header.getBoundingClientRect();
			const mouseX = event.clientX;
			const mouseY = event.clientY;

			// Calculate the center of the text element
			const centerX = left + width / 2;
			const centerY = top + height / 2;

			const angle = Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI);

			header.style.background = `linear-gradient(${angle}deg, #005a9a, green, yellow, orange, red)`;
			header.style.color = 'transparent';
			header.style.backgroundClip = 'text';
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	return (
		<section className='mb-12 mt-8' id='about'>
			<h1 className='text-4xl pl-2.5 sm:text-5xl md:text-6xl font-bold'>
				<span ref={headerRef} className='gradient-text'>
					Hello, I&apos;m Tom.
				</span>
			</h1>
			{/* <p className='mt-6 text-md pl-3.5'>
				I&apos;m a software engineer and web developer with a passion for creating beautiful and responsive websites.
				With over 5 years of experience in various programming languages and frameworks, I can help bring your ideas to
				life.
			</p> */}
		</section>
	);
};
