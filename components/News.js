import { Article } from './Article';
import { ContentSection } from './layout';
import articles from '../config/articles.json';

export const News = ({ limit = 30 }) => {
  return (
    <ContentSection background="course">
      <h2
        className="text-bodyM font-black uppercase font-bigShoulder cursor-pointer pb-1"
        style={{ lineHeight: '1.5rem' }}>
        LATEST NEWS
      </h2>
      <hr />
      <div className="mt-6">
        {articles.articles.slice(0, limit).map((article, id) => (
          <Article key={`article-${id}`} {...article} />
        ))}
      </div>
    </ContentSection>
  );
};
