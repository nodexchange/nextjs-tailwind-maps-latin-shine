import fs from 'fs';
import path from 'path';
import { Secondary as Layout } from '../../layouts';
import Link from 'next/link';
import { Article } from '../../components/Article';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-bold">Page not found</h2>
      <Link href='/'>
        <button className='bg-shine text-black font-bold uppercase text-sm px-6 py-3 rounded-full mt-6'>Return back to home</button>
      </Link>
    </div>
  );
}

export default function EventPage({
  event,
  footer
}) {
  if (!event) return <NotFound />;
  return (
    <Layout
      title={`Latin Shine | Dance Company - ${event.title}`}
      description={event.text}
      footer={footer}>
      <main className="bg-almostBlack text-white py-10 md:py-10 lg:py-30 justify-between md:items-start">
      <section className="bg-no-repeat bg-cover bg-courseImage text-white px-8 py-10 md:py-10 lg:py-30 lg:px-30 xl:px-40 justify-between md:items-start">
      <div className="mt-6">
        <Article key={`article-${event.id}`} {...event} standalone={true} />
      </div>
      </section>
      </main>
    </Layout>
  );
}

export const getServerSideProps = ({ params }) => {
  const { slug } = params;
  const eventsPath = path.join(process.cwd(), 'public', 'data', 'events.json');
  const textPath = path.join(process.cwd(), 'public', 'data', 'text.json');

  const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
  const textData = JSON.parse(fs.readFileSync(textPath, 'utf8'));
  const event = eventsData.events.find((event) => event.href === slug) || null;

  return { props: { event, footer: textData.footer || {} } }
}
