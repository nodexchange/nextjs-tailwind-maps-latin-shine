import { Secondary as Layout } from '../layouts';
import { About } from "../components/About";
import { ContentMain } from '../components/layout';

const AboutBachataPage = () => {
  return (
    <Layout
      title="Latin Shine | Dance Company - About Bachata"
      description="Learn about Bachata Sensual dance style. Discover the history, technique, and passion behind this beautiful Dominican dance form taught at our High Wycombe studio.">
      <ContentMain>
        <About />
      </ContentMain>
    </Layout>
  );
};

export default AboutBachataPage;
