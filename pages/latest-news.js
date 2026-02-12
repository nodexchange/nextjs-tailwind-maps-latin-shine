import fs from 'fs';
import path from 'path';
import { Secondary as Layout } from '../layouts';
import { News } from "../components/News";
import { ContentMain } from '../components/layout';

const LatestNewsPage = ({ articles, footer }) => {
  return (
    <Layout
      title="Latin Shine | Dance Company - Latest News"
      description="Learn about our latest news, course announcements, schedule changes and all sort of exciting news related to our Salsa and Bachata courses."
      footer={footer}>
      <ContentMain>
        <News articles={articles} />
      </ContentMain>
    </Layout>
  );
};

export async function getServerSideProps() {
  const articlesPath = path.join(process.cwd(), 'public', 'data', 'articles.json');
  const textPath = path.join(process.cwd(), 'public', 'data', 'text.json');

  const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
  const textData = JSON.parse(fs.readFileSync(textPath, 'utf8'));

  return {
    props: {
      articles: articlesData.articles || [],
      footer: textData.footer || {},
    },
  };
}

export default LatestNewsPage;
