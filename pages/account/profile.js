import { useEffect, useRef, useState } from 'react';

import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Accordion from '../../components/Accordion';
import { Admin as Layout } from '../../layouts';

const Profile = ({ user, links, session }) => {
  const inputEmailEl = useRef(null);
  const inputFirstNameEl = useRef(null);
  const inputLastNameEl = useRef(null);
  const inputTelephoneEl = useRef(null);
  const inputENameEl = useRef(null);
  const inputETelEl = useRef(null);

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/api/auth/signin');
      return;
    }
    if (!session.user) {
      router.push('/api/auth/signin');
      return;
    }
    const { email, name, surname, telephone, eName, eContact } = user;
    inputEmailEl.current.value = email;
    inputFirstNameEl.current.value = name;
    inputLastNameEl.current.value = surname;
    inputTelephoneEl.current.value = telephone;
    inputENameEl.current.value = eName;
    inputETelEl.current.value = eContact;
  }, [session, router, user]);

  const register = async (e) => {};
  const checkboxHandler = (e) => {
    setTermsChecked(e.target.checked);
  };

  if (typeof window === 'undefined') return null;

  if (session && Object.keys(session).length > 0) {
    return (
      <Layout>
        <div className="w-full mx-auto pt-14">
          <Accordion user={user} links={links} />
          <br />
          <h3
            className="text-shine text-bodyM text-center font-black uppercase font-bigShoulder cursor-pointer"
            style={{ lineHeight: '1.5rem' }}>
            Your account details!
          </h3>
          <form className="mx-auto w-[50%]">
            <div className="flex items-center border-b border-shine py-2">
              <input
                ref={inputEmailEl}
                readOnly
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-hidden"
                type="email"
                placeholder="your email: eg. youremail@gmail.com"
                aria-label="Email Address Input Field"
              />
            </div>
            <div className="flex items-center border-b border-shine py-2">
              <input
                ref={inputFirstNameEl}
                readOnly
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-hidden"
                id="fname"
                name="fname"
                type="text"
                placeholder="Your First name"
                aria-label="First Name Input Field"
              />
            </div>
            <div className="flex items-center border-b border-shine py-2">
              <input
                ref={inputLastNameEl}
                readOnly
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-hidden"
                id="lname"
                name="lname"
                type="text"
                placeholder="Your Second name"
                aria-label="Second Name Input Field"
              />
            </div>
            <div className="flex items-center border-b border-shine py-2">
              <input
                ref={inputTelephoneEl}
                readOnly
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-hidden"
                type="tel"
                placeholder="Telephone eg. 07500905702"
                aria-label="Telephone Input Field"
              />
            </div>
            <div className="flex items-center border-b border-shine py-2">
              <input
                ref={inputENameEl}
                readOnly
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-hidden"
                type="text"
                placeholder="Emergency Contact Name"
                aria-label="Your emergency contact name input field"
              />
            </div>
            <div className="flex items-center border-b border-shine py-2">
              <input
                ref={inputETelEl}
                readOnly
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-hidden"
                type="tel"
                placeholder="Emergency Telephone Number"
                aria-label="Emergency Contact Telephone Name"
              />
            </div>
            {/* <ButtonC title="Update" action={register} disabled={!termsChecked} /> */}
          </form>
        </div>
      </Layout>
    );
  }
  return <p>Access Denied... redirecting</p>;
};

export default Profile;

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { session: {} } };
  }

  const links = {
    fullLink: process.env.STRIPE_PAYMENT_FULL_LINK,
    link: process.env.STRIPE_PAYMENT_LINK,
  };

  let user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      surname: true,
      email: true,
      telephone: true,
      eName: true,
      eContact: true,
      transactions: true
    },
  });

  user.transactions.map((transaction) => {
    transaction.createdAt = transaction.createdAt.toString();
    transaction.price = `£ ${(transaction.type === 'student') ? '7' : '10'}`;
    delete transaction.userId;
  });

  return {
    props: {
      user,
      links,
      session,
    },
  };
}
