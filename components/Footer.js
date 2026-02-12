import Link from 'next/link';
import SocialIcons from './SocialIcons';
import { gaEvent } from '../lib/ga';

export default function Footer({ footer = {} }) {
  const handleClick = ({currentTarget}) => {
    gaEvent({ action: `${currentTarget.id}_click`, params: { section: 'footer' }});
  }

  return (
    <footer className="flex flex-col md:flex-row bg-almostBlack dark:bg-shine text-white dark:text-almostBlack px-8 py-10 md:py-10 lg:py-30 lg:px-30 xl:px-40 justify-between md:items-start">
      <h3
        className="text-bodyM font-black uppercase font-bigShoulder cursor-pointer"
        style={{ lineHeight: '1.5rem' }}>
        <Link href="/">Latin Shine</Link>
        <br />
        <Link href="/">Dance Company</Link>
        <br />
        <span className="text-[10px]">© All Rights Reserved</span>
      </h3>
      <p className="my-12 md:m-0 font-light font-outfit text-bodyXS md:w-2/5">
        {footer.description}
        <br />
        <Link href="/terms" className="underline text-white hover:text-shine" target="_self">Terms and Conditions</Link>
        {' | '}
        <Link href="/privacy" className="underline text-white hover:text-shine" target="_self">Privacy Policy</Link>
      </p>

      <div className="gap-5">
        <SocialIcons />
        <div className="flex flex-row justify-center">
          <Link id="email_us_text" className="hover:underline hover:text-shine" href="mailto:latin_shine@outlook.com?subject = Website&body = Hi Latin Shine," onClick={handleClick}>
            latin_shine@outlook.com
          </Link>
        </div>
        
      </div>
    </footer>
  );
}
