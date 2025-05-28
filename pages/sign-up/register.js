import { useEffect, useRef, useState } from 'react';
import validator from 'email-validator'
import { signIn, getSession } from 'next-auth/react';
import Link from 'next/link';
import { getCsrfToken } from "next-auth/react"

import { Secondary as Layout } from "../../layouts";
import ButtonA from '../../components/ButtonA';
import ButtonC from '../../components/ButtonC';

const Register = (props) => {
  const inputEmailEl = useRef(null);
  const inputPwdEl = useRef(null);
  const inputFirstNameEl = useRef(null);
  const inputLastNameEl = useRef(null);
  const inputTelephoneEl = useRef(null);
  const inputENameEl = useRef(null);
  const inputETelEl = useRef(null);

  const [message, setMessage] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [valid, setValid] = useState(false);
  const [emailError, setEmailError] = useState(true);

  useEffect(() => {
    if (emailError === false && termsChecked === true) {
      setValid(true);
    }
  }, [emailError, termsChecked]);
  const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.validate(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
      setValid(false);
    }
  }

  const register = async (e) => {
    e.preventDefault();
    if (!termsChecked) return;
    const res = await fetch('/api/register', {
      body: JSON.stringify({
        email: inputEmailEl.current.value,
        password: inputPwdEl.current.value,
        name: inputFirstNameEl.current.value,
        surname: inputLastNameEl.current.value,
        telephone: inputTelephoneEl.current.value,
        eName: inputENameEl.current.value,
        eContact: inputETelEl.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
    const response = await res.json();
    if (response.error) {
      setMessage(response.message);
      return;
    }

    const credentials = {
      email: inputEmailEl.current.value,
      password: inputPwdEl.current.value
    }

    inputEmailEl.current.value = '';
    inputPwdEl.current.value = '';
    inputFirstNameEl.current.value = '';
    inputLastNameEl.current.value = '';
    inputTelephoneEl.current.value = '';
    inputENameEl.current.value = '';
    inputETelEl.current.value = '';
    setMessage('Success! 🎉 You have Registered! 🎉 redirecting to profile...');
    setTimeout(() => {
      signInHandler(credentials);
    }, [2000]);
  }
  const checkboxHandler = (e) => {
    setTermsChecked(e.target.checked);
    if(e.target.checked === false) setValid(false);
  }

  const signInHandler = (credentials) => {
    const { email, password } = credentials;
    signIn('credentials', { username: email, password, callbackUrl: '/account/profile' });
  }

  return (
    <Layout title="Latin Shine | Dance Company - Register" description="You can register on our website to manage payments and reserve spots for our Salsa (LA Style) & Bachata Sensual latin dance classes.">
      <main className="text-center bg-almostBlack w-full text-white px-8 py-10 md:py-10 lg:py-30 lg:px-30 xl:px-40 justify-between md:items-start">
        {message ? (
          <>
          <h3
            className="text-bodyM font-black uppercase font-bigShoulder cursor-pointer"
            style={{ lineHeight: "1.5rem" }}>
              {message}
            </h3>
          </>
        ) : 
        (
          <>
            <h3
              className="text-bodyM font-black uppercase font-bigShoulder cursor-pointer"
              style={{ lineHeight: "1.5rem" }}
            >
              Register!
            </h3>
            <form className="w-full max-w-sm mx-auto">
              <div className="flex items-center border-b border-shine py-2">
                <input onChange={(e) => validateEmail(e)} autoComplete="off" ref={inputEmailEl} className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-hidden" type="email" placeholder="your email: eg. youremail@gmail.com" aria-label="Email Address Input Field" />
              </div>
              <div className="flex items-center border-b border-shine py-2">
                <input ref={inputPwdEl} type="password" autoComplete="off" className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-hidden" minLength="6" placeholder="your password (min 6 characters)" aria-label="Password Input Field" />
              </div>
              <div className="flex items-center border-b border-shine py-2">
                <input ref={inputFirstNameEl} className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-hidden" id="fname" name="fname" type="text" placeholder="Your First name" aria-label="First Name Input Field" />
              </div>
              <div className="flex items-center border-b border-shine py-2">
                <input ref={inputLastNameEl} className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-hidden" id="lname" name="lname" type="text" placeholder="Your Second name" aria-label="Second Name Input Field" />
              </div>
              <div className="flex items-center border-b border-shine py-2">
                <input ref={inputTelephoneEl} className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-hidden" type="tel" placeholder="Telephone eg. 07500905702" aria-label="Telephone Input Field" />
              </div>
              <div className="flex items-center border-b border-shine py-2">
                <input ref={inputENameEl} className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-hidden" type="text" placeholder="Emergency Contact Name" aria-label="Your emergency contact name input field" />
              </div>
              <div className="flex items-center border-b border-shine py-2">
                <input ref={inputETelEl} className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-hidden" type="tel" placeholder="Emergency Telephone Number" aria-label="Emergency Contact Telephone Name" />
              </div>
              <div className="form-check inline-block pt-4">
                <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-xs bg-white checked:bg-shine checked:border-white focus:outline-hidden transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="flexCheckChecked" onChange={checkboxHandler} />
                <label className="form-check-label block w-full pl-7 text-left text-white" htmlFor="flexCheckChecked">
                  You agree to the <Link href="/terms" className="underline text-white hover:text-shine" target="_self">Terms and Conditions</Link> set out by this site, including our Cookie Use.
                </label>
              </div>
              <ButtonC title="Register" action={register} disabled={!valid} />
            </form>
            <span className="text-bodyM text-shine">{(emailError && 'Please enter a valid email address')}</span>
          </>
        )}
      </main>
    </Layout>
  )
}


export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });
  if (session) {
    if (session.user) {
      return {
        redirect: {
          destination: '/account/profile',
          permanent: false,
        },
      }
    }
  }
  return {
    props: {}
  }
}

export default Register;