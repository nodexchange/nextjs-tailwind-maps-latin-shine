import React from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

import { AdminMenu, UserNavLeft, UserNavRight, NavLeft, NavRight } from './UserNav';

const Header = () => {
  const router = useRouter();
  const isActive = (pathname) => router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (<NavLeft isActive={isActive} />);

  let right = null;

  if (status === 'loading') {
    left = (<NavLeft isActive={isActive} />);
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  const customSignup = () => {
    signOut({callbackUrl: '/'});
  }

  if (!session) {
    right = (<NavRight isActive={isActive} />);
  }

  if (session) {
    if (session.user) {
      const { admin } = session.user; 
      const info = `${session.user.name}`
      left = (<UserNavLeft isActive={isActive} />);
      right = !admin ? (
        <UserNavRight isActive={isActive} info={info} signOut={customSignup} />
        ) : (
        <AdminMenu isActive={isActive} info={info} signOut={customSignup} />
      );
    } else {
      right = (<NavRight isActive={isActive} />);
    }
  }

  return (
    <nav className="bg-linear-to-b from-navBlack to-navBlackEnd fixed w-full z-100 flex p-[5px] text-white items-center">
      {left}
      {right}
    </nav>
  );
};

export default Header;
