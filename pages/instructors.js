import fs from 'fs';
import path from 'path';
import { Secondary as Layout } from '../layouts';
import { Instructors } from "../components/Instructors";
import { ContentMain } from '../components/layout';

const InstructorsPage = ({ instructors, footer }) => {
  return (
    <Layout
      title="Latin Shine | Dance Company - Meet Our Instructors"
      description="Meet Alyssa and Martin, our professional Latin dance instructors. Learn about their backgrounds, training, and passion for teaching Salsa and Bachata in High Wycombe."
      footer={footer}>
      <ContentMain>
        <Instructors instructors={instructors} />
      </ContentMain>
    </Layout>
  );
};

export async function getServerSideProps() {
  const textPath = path.join(process.cwd(), 'public', 'data', 'text.json');
  const textData = JSON.parse(fs.readFileSync(textPath, 'utf8'));

  return {
    props: {
      instructors: textData.instructors || {},
      footer: textData.footer || {},
    },
  };
}

export default InstructorsPage;
