import { Secondary as Layout } from '../layouts';
import { Instructors } from "../components/Instructors";
import { ContentMain } from '../components/layout';

const InstructorsPage = () => {
  return (
    <Layout
      title="Latin Shine | Dance Company - Meet Our Instructors"
      description="Meet Alyssa and Martin, our professional Latin dance instructors. Learn about their backgrounds, training, and passion for teaching Salsa and Bachata in High Wycombe.">
      <ContentMain>
        <Instructors />
      </ContentMain>
    </Layout>
  );
};

export default InstructorsPage;
