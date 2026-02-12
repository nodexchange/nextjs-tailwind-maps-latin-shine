import Link from 'next/link';
import { motion } from 'framer-motion';

const HeroAnnouncement = ({ hero }) => {
  return (
    <div className="hidden lg:relative lg:block lg:bg-almostBlack lg:w-full lg:h-[600px] lg:bg-desktopHero lg:bg-no-repeat lg:bg-right lg:bg-cover">
      <motion.div
        key="announcement"
        initial={{ x: -600 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}>
        <Link href="/reserve">
          <div className="bg-shine-alpha absolute top-[88px] w-[590px] pt-4 pb-4">
            <h1 className="pl-[85px] font-black w-auto text-white font-bigShoulder uppercase text-headingS">
              {hero.heading.split('_').map((item, id) => {
                return (
                  <span key={`item-${id}`}>
                    <span className="drop-shadow-3xl">{item}</span>
                    <br />
                  </span>
                );
              })}
            </h1>
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

HeroAnnouncement.propTypes = {};

export default HeroAnnouncement;
