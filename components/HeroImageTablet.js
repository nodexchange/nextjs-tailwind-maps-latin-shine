import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import ButtonA from './ButtonA';

function HeroImageTablet({hero}) {
  return (
    <>
    
    <div className="hidden sm:block sm:w-100 sm:max-h-[10vh] lg:hidden">
        <Image
          src="/tablet/image-hero.webp"
          width={437}
          height={100}
          alt="hero image tablet"
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="flex flex-col text-center px-4 py-10 sm:top-[5px] lg:hidden">
        <div className="mx-auto p-[0px] border-2 border-white mb-10 w-[290px]">
          <div className="ml-[20px] mt-[15px]">
            <Image
              src="/tablet/logo.webp"
              width={250}
              height={95}
              // layout="responsive"
              alt="Latin Shine Dance Company - Tablet Logo"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
        </div>
        <Link href="/reserve">
          <h1 className="py-2 font-black w-screen text-shine font-bigShoulder uppercase text-headingS md:text-headingS">
            {hero.heading.split('_').map((item, id) => {
              return (
                <span key={`item-${id}`}>
                  {item}
                  <br />
                </span>
              );
            })}
          </h1>
        </Link>
        <div className="font-outfit text-white font-light text-bodyS py-8 sm:py-12 sm:w-[280px] md:w-[340px] mx-auto">
          {hero.logoText.split('_').map((item, id) => {
            return <p key={`item-${id}`}>{item}</p>;
          })}
        </div>
        
        <ButtonA path="/location" title="Our Locations" />
        <br />
        {/* <ButtonA path="/reserve" title="Reserve your spot" /> */}
      </div>
    </>
  )
}

export default HeroImageTablet