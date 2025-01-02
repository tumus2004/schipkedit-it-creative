import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Project Remarkable - Sales & Performance Coaching',
	description: 'Scale your business performance with Project Remarkable coaching.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={`remarkable-root ${inter.className}`}>{children}</body>
		</html>
	);
}
