
import Head from 'next/head';
import HeroSection from '@/app/sections/hero-section';
import MainSection from '@/app/sections/main-section';
import Contact  from '@/app/sections/contact';
import Link from "next/link";

export default function Home() {
  return (
    <main className=' z-0 snap-y scroll-smooth overflow-hidden' id="home">
      <Head>
        <title>Dh.dev</title>
      </Head>
      <section className='min-h-screen' id='hero'>
        <HeroSection />
      </section>
      <section className='min-h-screen bg-black snap-center' id='main'>
        <MainSection />
      </section>
      <section className='min-h-screen' id='contact'>
        <Contact />
      </section>
    </main>
  );
}
