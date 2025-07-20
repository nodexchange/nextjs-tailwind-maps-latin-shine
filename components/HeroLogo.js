import Image from "next/image";
import Link from 'next/link';
import { motion } from "framer-motion"
import ButtonA from '../components/ButtonA';

/* Right hand side only */
const HeroLogo = ({hero}) => {
  return (
    <div className="hidden lg:block lg:absolute lg:top-[49px] lg:right-0 text-center mr-20">
        <div className="p-[0px] border-2 border-white">
          <div className="w-full mt-[10px] drop-shadow-xl">
            <Image
              className="mx-auto"
              src="/desktop/logo.webp"
              width={400}
              height={136}
              // layout="responsive"
              alt="Latin Shine Dance Company Logo"
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          </div>
          <div className="drop-shadow-xl ml-[76px] text-shine font-light text-4xl mb-10 mr-[61px]">
            {hero.logoText.split('_').map((item, id) => {
              return (
                <p key={`item-${id}`}>
                  {item}
                </p>
              );
            })}
          </div>
          <Link href="/reserve">
          <div className="drop-shadow-xl ml-[76px] text-white font-light text-4xl uppercase mb-20  mr-[61px]">
            {hero.logoWhite.split('_').map((item, id) => {
              return (
                <p key={`item-${id}`}>
                  {item}
                </p>
              );
            })}
          </div>
          </Link>
        </div>
        <p className="drop-shadow-xl font-outfit text-white font-light text-bodyM w-[550px] mb-6">
          {hero.description}
        </p>
        
          <div className="flex">
            <div className="flex-1">
              <motion.div
                key="key-buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <ButtonA path="/location" title="Our Locations" />
              </motion.div>
            </div>
            <div className="flex-1">
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  >
              {/* <ButtonA path="/reserve" title="Reserve your spot" /> */}
                </motion.div>
            </div>
          </div>
      </div>
  );
}

export default HeroLogo