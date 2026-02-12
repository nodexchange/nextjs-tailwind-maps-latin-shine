import fs from 'fs';
import path from 'path';
import { Secondary as Layout } from '../layouts';
import { Events } from "../components/Events";
import { ContentMain } from '../components/layout';

const EventsPage = ({ events, footer }) => {
  return (
    <Layout
      title="Latin Shine | Dance Company - Events"
      description="Learn about our latest news, course announcements, schedule changes and all sort of exciting news related to our Salsa and Bachata courses."
      footer={footer}>
      <ContentMain>
        <Events events={events} />
      </ContentMain>
    </Layout>
  );
};

export async function getServerSideProps() {
  const eventsPath = path.join(process.cwd(), 'public', 'data', 'events.json');
  const textPath = path.join(process.cwd(), 'public', 'data', 'text.json');

  const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
  const textData = JSON.parse(fs.readFileSync(textPath, 'utf8'));

  return {
    props: {
      events: eventsData.events || [],
      footer: textData.footer || {},
    },
  };
}

export default EventsPage;
