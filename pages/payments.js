import { Secondary as Layout } from '../layouts';
import Link from 'next/link';
import ButtonA from '../components/ButtonA';

const title = 'You can pay online for your classes here';
const description = '✨ Enjoy your class with Latin Shine team ✨';

const ReserveConfirmation = () => {
  return (
    <Layout
      title="Latin Shine | Dance Company - Reserve Confirmation Screen"
      description="Latin Shine Reserve Confirmation Screen for dance classes">
      <main className="text-center bg-almostBlack text-white w-full px-8 py-10 md:py-10 lg:py-30 lg:px-30 xl:px-40 justify-between md:items-start">
        <h1
          className="text-bodyM font-black uppercase font-bigShoulder"
          style={{ lineHeight: '1.5rem' }}>
          {title}
        </h1>
        <div>
          <p>{description}</p>
        </div>
        <br />
        <div className="h-56 grid grid-cols-3 gap-4 content-between">
          <div></div>
          <div>
            <ButtonA path="https://bit.ly/latin-shine-ticket" title="Pay Online" /></div>
          <div></div>
        </div>
        <div>
          
        </div>
      </main>
    </Layout>
  );
};

export default ReserveConfirmation;
