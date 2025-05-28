
import HeroLogo from './HeroLogo';
import HeroAnnouncement from './HeroAnnouncement';
import HeroTestimonials from './HeroTestimonials';
import HeroVideo from './HeroVideo';
import HeroImageMobile from './HeroImageMobile';
import HeroImageTablet from './HeroImageTablet';

import text from '../config/text.json';

export default function HeroSection() {
  const { hero } = text;
  return (
    <div className="h-auto w-full sm:relative lg:flex bg-custom-stone">
      <HeroAnnouncement hero={hero} />
      <HeroTestimonials hero={hero} />
      <HeroLogo hero={hero} />
      <HeroImageMobile />
      <HeroImageTablet hero={hero} />
      {/* <HeroVideo /> */}
    </div>
  );
}
