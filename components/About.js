import Link from "next/link";
import { useEffect } from 'react';
import { gaEvent } from '../lib/ga';
import text from "../config/text.json";


export const About = () => {
  const { about } = text;
  const handlePlay = () => {
    gaEvent({ action: 'about_video_play', params: { section: 'about' } });
  }
  useEffect(() => {
    if (document.getElementById('player')) {
      const player = document.getElementById('player');
      player.addEventListener('play', handlePlay);
    }
    return () => {
      if (document.getElementById('player')) {
        const player = document.getElementById('player');
        player.removeEventListener('play', handlePlay);
      }
    }
  }, []);
  return (
    <section className="bg-no-repeat bg-cover bg-aboutImage text-white w-full px-8 py-10 md:py-10 lg:py-30 lg:px-30 xl:px-40 justify-between md:items-start">
      <div className="block lg:flex">
        <div className="block w-full h-[424px] relative pb-10 sm:w-[235px] sm:mx-auto">
          <video id="player" controls className="w-auto h-[424px] top-0 left-0 relative sm:absolute sm:w-[235px] md:w-full lg:w-auto">
            <source src="/about.mp4" />
          </video>
        </div>
        <div className="w-full px-4 pt-10 md:pt-2 lg:w-[70%]">
          <h2 className="font-black uppercase font-bigShoulder text-headingS lg:text-headingS md:mb-4">
            What is Bachata Sensual?
          </h2>
          <p className="my-4 l:my-12 md:m-0 font-light font-outfit text-bodyXS md:text-bodyS md:w-100">
            {about.first}
          </p>
          <br />
          <p className="my-4 l:my-12 md:m-0 font-light font-outfit text-bodyXS md:text-bodyS md:w-100">
            {about.second}
          </p>
          <br />
          <br />
          <p>Ready to start learning: {' '}
            <Link href="/classes#bachata" className="font-medium text-blue-400 dark:text-blue-400 hover:underline">
              Learn about our Bachata Classes in High Wycombe
            </Link>
          </p>
          <br/>
          <hr />
          <br/>
          <br/>
          <br/>
          <p className="my-4 l:my-12 md:m-0 font-light font-outfit text-bodyXS md:text-bodyS md:w-100">
            Ref: {about.third}{" "}
            <Link href={about.link} className="font-medium text-blue-400 dark:text-blue-400 hover:underline">
              {about.link}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
