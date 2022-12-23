import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Schipked it Creative</title>
        <meta name='description' content='Schipked it Creative' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <Image
          src='/background-ai-image.jpg'
          alt='primary-background'
          fill={true}
          className='w-full h-full absolute object-cover'
        />
        <div id='ParentContainer' className='font-sans w-full top-0 left-0 h-full absolute'>
          <div
            id='MenuContainer'
            className='w-full md:w-fit md:max-w-1/2 relative p-16 flex flex-col m-w-1/3 gap-4'>
            <a target="_blank" href="#" type="button" id='MenuItem' className='w-fit relative bg-none hover:bg-cyan-600 px-4 py-2 transition-all duration-200 rounded-md'>
              <h2 className='font-bold text-heading-gold'>About</h2>
            </a>
            <a target="_blank" href="#" type="button" id='MenuItem' className='w-fit relative bg-none hover:bg-cyan-600 px-4 py-2 transition-all duration-200 rounded-md'>
              <h2 className='font-bold text-heading-gold'>Web</h2>
            </a>
            <a target="_blank" href="#" type="button" id='MenuItem' className='w-fit relative bg-none hover:bg-cyan-600 px-4 py-2 transition-all duration-200 rounded-md'>
              <h2 className='font-bold text-heading-gold'>Image</h2>
            </a>
            <a target="_blank" href="#" type="button" id='MenuItem' className='w-fit relative bg-none hover:bg-cyan-600 px-4 py-2 transition-all duration-200 rounded-md mb-8'>
              <h2 className='font-bold text-heading-gold'>Video</h2>
            </a>
            <a target="_blank" href="#" className='w-fit bg-neutral-900 hover:bg-black rounded-lg relative border-solid border-1 overflow-hidden px-4 flex flex-row transition-all duration-200 py-4 border-white'>
              <h2 className='text-white text-start text-md w-full'>Ipsum whatever whatever whatever</h2>
            </a>
          </div>
        </div>
        {/* <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.tsx</code>
          </p>
          <div>
            <a
              href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
              target='_blank'
              rel='noopener noreferrer'>
              By{' '}
              <Image
                src='/vercel.svg'
                alt='Vercel Logo'
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>
        <div className={styles.center}>
          <Image
            className={styles.logo}
            src='/next.svg'
            alt='Next.js Logo'
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image src='/thirteen.svg' alt='13' width={40} height={31} priority />
          </div>
        </div>
        <div className={styles.grid}>
          <a
            href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            className={styles.card}
            target='_blank'
            rel='noopener noreferrer'>
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            className={styles.card}
            target='_blank'
            rel='noopener noreferrer'>
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            className={styles.card}
            target='_blank'
            rel='noopener noreferrer'>
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            className={styles.card}
            target='_blank'
            rel='noopener noreferrer'>
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL with&nbsp;Vercel.
            </p>
          </a>
        </div> */}
      </main>
    </>
  );
}
