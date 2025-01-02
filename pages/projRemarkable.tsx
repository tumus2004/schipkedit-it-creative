import { CTA } from '../components/ProjectRemarkable/components/cta';
import { Footer } from '../components/ProjectRemarkable/components/footer';
import { Header } from '../components/ProjectRemarkable/components/header';
import { Hero } from '../components/ProjectRemarkable/components/hero';
import { Highlights } from '../components/ProjectRemarkable/components/highlights';
import { Services } from '../components/ProjectRemarkable/components/services';
import { SocialButtons } from '../components/ProjectRemarkable/components/social-buttons';
// import { Story } from '../components/ProjectRemarkable/components/story';
import { Testimonials } from '../components/ProjectRemarkable/components/testimonials';

const ProjRemarkableHome = () => {
	return (
		<main className='flex min-h-screen flex-col'>
			<Header />
			<Hero />
			{/* <Story /> */}
			<Highlights />
			<Services />
			<Testimonials />
			<CTA />
			<SocialButtons />
			<Footer />
		</main>
	);
};

export default ProjRemarkableHome;
