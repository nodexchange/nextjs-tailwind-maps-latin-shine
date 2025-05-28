import { Secondary as Layout } from '../layouts';
import { WhyDance } from "../components/WhyDance";
import { ContentMain } from '../components/layout';

const WhyDancePage = () => {
  return (
    <Layout
      title="Latin Shine | Dance Company - Why Dance?"
      description="Discover the amazing benefits of Latin dancing. From fitness and confidence to community and joy - learn why thousands of people fall in love with Salsa and Bachata.">
      <ContentMain>
        <WhyDance />
      </ContentMain>
    </Layout>
  );
};

export default WhyDancePage;
