import { Secondary as Layout } from '../layouts';
import { News } from "../components/News";
import { ContentMain } from '../components/layout';

const LatestNewsPage = () => {
  return (
    <Layout
      title="Latin Shine | Dance Company - Latest News"
      description="Learn about our latest news, course announcements, schedule changes and all sort of exciting news related to our Salsa and Bachata courses.">
      <ContentMain>
        <News />
      </ContentMain>
    </Layout>
  );
};

export default LatestNewsPage;
