import { Secondary as Layout } from '../layouts';
import { AboutSalsa } from "../components/AboutSalsa";
import { ContentMain } from '../components/layout';

const AboutSalsaPage = () => {
  return (
    <Layout
      title="Latin Shine | Dance Company - About Salsa"
      description="Learn about Salsa LA Style (on-1 / crossbody) dance. Our Salsa classes focus on technique, partner work, and musicality in a fun and supportive environment.">
      <ContentMain>
        <AboutSalsa />
      </ContentMain>
    </Layout>
  );
};

export default AboutSalsaPage;
