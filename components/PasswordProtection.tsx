import React, { useState, useEffect } from 'react';

interface PasswordProtectionProps {
	children: React.ReactNode;
	requiredPassword?: string;
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({
	children,
	requiredPassword = process.env.NEXT_PUBLIC_DEV_NOTES_PASSWORD || 'dev123',
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [password, setPassword] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [hasError, setHasError] = useState<boolean>(false);

	useEffect(() => {
		// Check if user is already authenticated in this session
		const storedAuth = sessionStorage.getItem('devNotesAuth');
		if (storedAuth === 'authenticated') {
			setIsAuthenticated(true);
		}
		setIsLoading(false);
	}, []);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setHasError(false);

		if (password === requiredPassword) {
			setIsAuthenticated(true);
			sessionStorage.setItem('devNotesAuth', 'authenticated');
		} else {
			setHasError(true);
			setPassword('');
		}
	};

	const handleLogout = () => {
		setIsAuthenticated(false);
		sessionStorage.removeItem('devNotesAuth');
		setPassword('');
	};

	if (isLoading) {
		return (
			<div className='min-h-screen bg-gray-100 flex items-center justify-center'>
				<div className='text-lg text-gray-600'>Loading...</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return (
			<div className='min-h-screen bg-gray-100 flex items-center justify-center'>
				<div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
					<h2 className='text-2xl font-bold text-center mb-6 text-gray-800'>Protected Area</h2>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<div>
							<label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
								Enter Password
							</label>
							<input
								type='password'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
								placeholder='Password'
								required
							/>
						</div>
						{hasError && <div className='text-red-600 text-sm text-center'>Incorrect password. Please try again.</div>}
						<button
							type='submit'
							className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors'
						>
							Access
						</button>
					</form>
				</div>
			</div>
		);
	}

	return (
		<div className='relative'>
			<button
				onClick={handleLogout}
				className='absolute top-4 right-4 z-10 bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors'
			>
				Logout
			</button>
			{children}
		</div>
	);
};

export default PasswordProtection;
