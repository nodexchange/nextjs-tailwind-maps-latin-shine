import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { gaEvent } from '../../lib/ga';
import { Secondary as Layout } from '../../layouts';
import ReserveSchedule from '../../components/ReserveSchedule';
import ReserveError from '../../components/ReserveError';
import ReserveForm from '../../components/ReserveForm';
import ReserveActions from '../../components/ReserveActions';
import ReserveHeader from '../../components/ReserveHeader';
import ReserveClass from '../../components/ReserveClass';
import ReserveLevel from '../../components/ReserveLevel';
import ReserveSteps from '../../components/ReserveSteps';
import ReserveValidation from '../../components/ReserveValidation';

const Reserve = () => {
  const router = useRouter();

  const inputEmailEl = useRef(null);
  const inputFirstNameEl = useRef(null);
  const inputLastNameEl = useRef(null);
  const [data, setData] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [bachataRadioCheck, setBachataRadioCheck] = useState(false);
  const [beginnerRadioCheck, setBeginnerRadioCheck] = useState(false);
  const [salsaRadioCheck, setSalsaRadioCheck] = useState(false);
  const [experiencedRadioCheck, setExperiencedRadioCheck] = useState(false);
  const [validation, setValidation] = useState('');
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reserveRequest = async () => {
      setLoading(true);
      gaEvent({ action: 'reserve_button_click', params: { section: 'reserve' } });
      const res = await fetch('/api/reserveRequest', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const { error } = await res.json();
      if (error) {
        gaEvent({ action: 'reserve_error', params: { section: 'reserve' } });
        setMessage(error);
        return;
      }
      if (data.classType === 'Bachata') {
        router.push({
          pathname: '/reserve/confirmation-bachata',
          query: { beginner: data.beginner },
        })
        return;
      }
      router.push({
        pathname: '/reserve/confirmation-salsa',
        query: { beginner: data.beginner },
      })
      setData({});
    };
    if (data.hasOwnProperty('beginner')) reserveRequest();
  }, [data, bachataRadioCheck, router]);
  const testForEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const validateForm = () => {
    if (inputEmailEl.current.value === '') {
      setValidation('Please check if your email is correct');
      return false;
    }
    if (!testForEmail(inputEmailEl.current.value)) {
      setValidation('Please check if your email is correct');
      return false;
    }
    if (inputFirstNameEl.current.value === '') {
      setValidation('First Name is required');
      return false;
    }
    
    const newData = {
      email: inputEmailEl.current.value,
      firstName: inputFirstNameEl.current.value,
      lastName: inputLastNameEl.current.value
    };
    saveData(newData);
    setValidation('');
    return true;
  };

  const validateClass = () => {
    if (bachataRadioCheck === false && salsaRadioCheck === false) {
      setValidation('Please select your preferred dance class');
      return false;
    }
    const newData = {
      classType: bachataRadioCheck ? 'Bachata' : 'Salsa'
    }
    saveData(newData);
    setValidation('');
    return true;
  }

  const validateLevel = () => {
    if (beginnerRadioCheck === false && experiencedRadioCheck === false) {
      setValidation('Please select your experience level');
      return false;
    }
    const newData = {
      beginner: beginnerRadioCheck ? true : false
    }
    saveData(newData);
    setValidation('');
    return true;
  }
  const saveData = (newData) => {
    setData({
      ...data,
      ...newData
    });
  };
  const stepHandler = (e) => {
    switch(step) {
      case 0: // form
        validateForm() && setStep(1);
        break;
      case 1: // Class Type
        validateClass() && setStep(2);
        break;
      case 2: // level
        validateLevel()
        break;
    }
  };
  const backHandler = () => {
    if (step === 0) return;
    setValidation('');
    setStep(step-1);
  }

  

  const radioHandler = (e) => {
    if (e.target.id === 'radioBachata') {
      setBachataRadioCheck(true);
      setSalsaRadioCheck(false);
      return;
    }
    if (e.target.id === 'radioBeginner') {
      setBeginnerRadioCheck(true);
      setExperiencedRadioCheck(false);
      return;
    }
    // class
    setBachataRadioCheck(false);
    setSalsaRadioCheck(true);
    // level
    if (step === 2) {
      setBeginnerRadioCheck(false);
      setExperiencedRadioCheck(true);
    }
  };

  return (
    <Layout
      title="Latin Shine | Dance Company - Reserve your spot"
      description="You can use the form below to reserve spot for our Salsa (LA Style) and Bachata Sensual latin dance class. Join our class every Tuesday & Wednesday, in High Wycombe">
      <main className="text-center bg-almostBlack text-white w-full px-8 py-10 sm:py-[80px] md:py-[100px] lg:py-30 lg:px-30 xl:px-40 justify-between md:items-start">
        {message ? (
          <ReserveError />
        ) : (
          <>
            <ReserveHeader step={step} />
            <div className='my-4 border-solid border-2 border-shineDark p-2'>
              <h1>We are closed for a while</h1>
              <p>We will be back in 2026</p>
              {/* <ReserveSteps
                step={step}
                step0={
                  <ReserveForm inputEmailEl={inputEmailEl} inputFirstNameEl={inputFirstNameEl} inputLastNameEl={inputLastNameEl} />
                }
                step1={
                  <ReserveClass radioHandler={radioHandler} bachataRadioCheck={bachataRadioCheck} salsaRadioCheck={salsaRadioCheck} />
                }
                step2={
                  <ReserveLevel radioHandler={radioHandler} beginnerRadioCheck={beginnerRadioCheck} experiencedRadioCheck={experiencedRadioCheck} />
                }
              >
                <ReserveValidation validation={validation} />
              </ReserveSteps>
              <ReserveActions loading={loading} stepHandler={stepHandler} backHandler={backHandler} step={step} /> */}
            </div>
            {/* <br /> */}
            {/* <ReserveSchedule /> */}
          </>
        )}
      </main>
    </Layout>
  );
};


export default Reserve;
