import Link from 'next/link';
import Image from "next/image";

import SocialIcons from './SocialIcons';
import ProfileIcon from './ProfileIcon';
import LogoutIcon from './LogoutIcon';
import LoginIcon from './LoginIcon';
import ReserveIcon from './ReserveIcon';
import HomeIcon from './HomeIcon';


const NavLeft = ({ isActive }) => (
  <div className="left pl-10">
    <Link href="/">
      <Image
        src="/android-chrome-192x192.png"
        width={22}
        height={22}
        // layout="responsive"
        alt="Latin Shine - Dance Company - Logo"
        priority="true"
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    </Link>
  </div>
);

const NavRight = ({ isActive }) => (
  <div className="right">
    <div className='relative right-[60px] gap-3 lg:right-20 md:right-20 sm:gap-5 row flex flex-row justify-center'>
      {/* <LoginIcon /> */}
      {/* <ReserveIcon /> */}
      <div className="hidden md:inline">
        <SocialIcons />
      </div>
    </div>
    <style jsx>{`
      a {
        text-decoration: none;
        color: var(--geist-foreground);
        display: inline-block;
      }

      a + a {
        margin-left: 1rem;
      }

      .right {
        margin-left: auto;
      }

      .right a {
        border: 1px solid var(--geist-foreground);
        padding: 0.5rem 1rem;
        border-radius: 3px;
      }
    `}</style>
  </div>
);


const UserNavLeft = ({ isActive }) => {
  return (
    <div className="left">
      <Image
        src="/android-chrome-192x192.png"
        width={22}
        height={22}
        // layout="responsive"
        alt="Latin Shine - Dance Company - Logo"
        priority="true"
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    </div>
  );
};



const UserNavRight = ({ isActive, info, signOut }) => (
  <div className="right">
    <div className='relative right-2 gap-3 lg:right-20 md:right-20 sm:gap-5 row flex flex-row justify-center'>
      <p className="hidden text-sm pr-1 lg:inline-block">
        Welcome, {info}
      </p>
      <HomeIcon />
      <ProfileIcon />
      <LogoutIcon action={signOut} />
      <div className="hidden md:inline">
        <SocialIcons />
      </div>
    </div>
    <style jsx>{`
      a {
        text-decoration: none;
        color: var(--geist-foreground);
        display: inline-block;
      }

      a + a {
        margin-left: 1rem;
      }

      .right {
        margin-left: auto;
      }

      .right a {
        border: 1px solid var(--geist-foreground);
        padding: 0.5rem 1rem;
        border-radius: 3px;
      }

      button {
        border: none;
      }
    `}</style>
  </div>
);

const AdminMenu = ({ isActive, info, signOut }) => (
  <div className="right">
    <p>
      {info}
    </p>
    <Link href="/admin/customers" className="bold" data-active={isActive('/')}>
      Customers
    </Link>
    <button onClick={() => signOut()}>
      <a>Log out</a>
    </button>
    <style jsx>{`
      a {
        text-decoration: none;
        color: var(--geist-foreground);
        display: inline-block;
      }

      p {
        display: inline-block;
        font-size: 13px;
        padding-right: 1rem;
      }

      a + a {
        margin-left: 1rem;
      }

      .right {
        margin-left: auto;
      }

      .right a {
        border: 1px solid var(--geist-foreground);
        padding: 0.5rem 1rem;
        border-radius: 3px;
      }

      button {
        border: none;
      }
    `}</style>
  </div>
);

export { UserNavLeft, UserNavRight, NavLeft, NavRight, AdminMenu };
