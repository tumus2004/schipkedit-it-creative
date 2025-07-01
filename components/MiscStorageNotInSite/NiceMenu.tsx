'use client';
import { FC, Fragment } from 'react';
import { linkGroups } from '~/components/Nav/Navbar/Menu/presets';
// import NavbarJSON from '~/public/navbar.json'
import cx from 'classnames';
import Accordion from '~/components/Layout/Accordion';
import Button from '~/components/Layout/Button';
import Container from '~/components/Layout/Container';
import OutgoingLink from '~/components/Layout/OutgoingLink';
import PageLink from '~/components/Layout/PageLink';
import { socialLinks } from '~/components/Nav/Navbar/presets';
import { useSubscribeModalContext } from '~/context/SubscribeModalContext';
import { getCurrentYear } from '~/helpers/common';
import useBreakpoints from '~/hooks/useBreakpoints';
import FooterJSON from '~/public/footer.json';
import { FooterContent } from '~/types/cms/models/footer';
import { SitePages } from '~/types/pages';

// const navbarContent = NavbarJSON as unknown as NavbarContent
const footerContent = FooterJSON as unknown as FooterContent;

interface MenuProps {
	isOpen: boolean;
	onClose: () => void;
}

const Menu: FC<MenuProps> = ({ isOpen, onClose }) => {
	const { isTablet } = useBreakpoints();
	const { openSubscribeModal } = useSubscribeModalContext();

	return (
		<div
			aria-modal='true'
			tabIndex={isOpen ? 0 : -1}
			className={cx('fixed inset-0 z-40', {
				'pointer-events-none': !isOpen,
			})}
			aria-hidden={!isOpen}
		>
			<div
				className={cx(
					'absolute left-1/2 top-1/2 z-30 size-[150vmax] origin-top-right -translate-x-[calc(50%-10vw)] -translate-y-[calc(50%+10vw)] rounded-full bg-menu-background transition-transform duration-[1200ms] lg:-translate-x-[calc(50%-5vw)]',
					{
						'scale-[0.3]': !isOpen,
					}
				)}
			/>
			<div
				className={cx(
					'absolute inset-0 z-40 flex min-h-svh w-full overflow-y-auto pt-30 text-om-600 transition-[clip-path] lg:items-end lg:pt-20',
					{
						'duration-[1200ms] [clip-path:circle(150%_at_100%_0%)]': isOpen, // Or adjust % as needed
						'duration-[900ms] [clip-path:circle(0%_at_100%_0%)]': !isOpen,
					}
				)}
			>
				<Container
					className={cx('flex flex-col lg:flex-row', {
						'delay-500 duration-700': isOpen,
						'opacity-0 duration-500': !isOpen,
					})}
				>
					{linkGroups.map((group, i) => (
						<Fragment key={group.label}>
							{!isTablet ? (
								<div
									className={cx(
										'flex h-[620px] flex-col border-r border-om-400 px-4 pb-10 first:border-l',
										group.className,
										{
											'w-[184px]': !group.className,
										}
									)}
								>
									<PageLink
										href={group.href}
										onClick={onClose}
										className={cx('block w-max', {
											'hover:underline': group.href,
										})}
									>
										<h2 className='text-subheading-light mb-28'>{group.label}</h2>
									</PageLink>

									<div className='flex flex-1 flex-col justify-between'>
										{group.links && (
											<ul
												className={cx('gap-y-2', {
													'flex flex-col': !group.hasTwoLinkColumns,
													'grid grid-cols-2 gap-x-4': group.hasTwoLinkColumns,
												})}
											>
												{group.links.map((link) => (
													<li key={link.label}>
														<PageLink href={link.href} onClick={onClose} className='hover:underline'>
															{link.label}
														</PageLink>
													</li>
												))}
											</ul>
										)}
										{group.hasContactLinks && (
											<>
												<div className='flex flex-col items-start gap-y-6'>
													<PageLink href={SitePages.Contact}>
														<Button tabIndex={-1} onClick={onClose} variant='om-600'>
															Contact us
														</Button>
													</PageLink>
													<Button
														variant='om-600'
														onClick={() => {
															openSubscribeModal();
															onClose();
														}}
													>
														Subscribe to mailing list
													</Button>
													<div className='grid grid-cols-3 gap-x-4'>
														{socialLinks.map(({ label, link, icon: Icon }) => (
															<OutgoingLink key={label} href={link} aria-label={label} onClick={onClose}>
																<Icon className='size-4 min-w-4 text-om-600' />
															</OutgoingLink>
														))}
													</div>
												</div>
												{/* Acknowledgement text */}
												<div className='text-caption text-om-400'>
													<p className='mb-10 max-w-[250px]'>{footerContent.acknowledgementText}</p>
													<p className='text-[10px] font-medium leading-[10px]'>
														&copy; Omvivo {getCurrentYear()}. All rights reserved.
													</p>
												</div>
											</>
										)}
									</div>
								</div>
							) : (
								<>
									{!group.hasContactLinks && (
										<Accordion
											label={group.label}
											containerClassName='!border-om-400 last-of-type:!border-b-0 first-of-type:!border-t-0'
											buttonClassName={cx('text-subheading-light !text-om-600 !py-6', {
												'!pt-0': i === 0,
											})}
										>
											<div className='flex flex-1 flex-col justify-between pb-10 pt-4'>
												{group.links && (
													<ul
														className={cx('gap-y-2 text-lg', {
															'flex flex-col': !group.hasTwoLinkColumns,
															'grid grid-cols-2 gap-x-2': group.hasTwoLinkColumns,
														})}
													>
														{group.links.map((link) => (
															<li key={link.label} onClick={onClose} className='hover:underline'>
																{link.label}
															</li>
														))}
													</ul>
												)}
											</div>
										</Accordion>
									)}
									{group.hasContactLinks && (
										<>
											<div className='mb-6 mt-14 flex flex-col items-start gap-y-6'>
												<PageLink href={SitePages.Contact}>
													<Button tabIndex={-1} size={40} variant='om-600' onClick={onClose}>
														Contact us
													</Button>
												</PageLink>
												<Button
													size={40}
													variant='om-600'
													onClick={() => {
														openSubscribeModal();
														onClose();
													}}
												>
													Subscribe to mailing list
												</Button>
												<div className='grid grid-cols-3 gap-x-4'>
													{socialLinks.map(({ label, link, icon: Icon }) => (
														<OutgoingLink key={label} href={link} aria-label={label}>
															<Icon className='size-4 min-w-4 text-om-600' />
														</OutgoingLink>
													))}
												</div>
											</div>
											{/* Acknowledgement text */}
											<div className='text-caption text-om-400'>
												<p className='mb-10 max-w-[250px]'>{footerContent.acknowledgementText}</p>
												<p className='text-[10px] font-medium leading-[10px]'>
													&copy; Omvivo {getCurrentYear()}. All rights reserved.
												</p>
											</div>
										</>
									)}
								</>
							)}
						</Fragment>
					))}
				</Container>
			</div>
		</div>
	);
};

export default Menu;
