import { Secondary as Layout } from '../layouts';
import { Events } from "../components/Events";
import { ContentMain } from '../components/layout';

const EventsPage = () => {
  return (
    <Layout
      title="Latin Shine | Dance Company - Events"
      description="Learn about our latest news, course announcements, schedule changes and all sort of exciting news related to our Salsa and Bachata courses.">
      <ContentMain>
        <Events />
      </ContentMain>
    </Layout>
  );
};

export default EventsPage;
