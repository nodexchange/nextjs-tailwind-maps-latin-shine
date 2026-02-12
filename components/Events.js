import { Article } from './Article';
import { ContentSection } from './layout';

export const Events = ({ events = [], limit = 30 }) => {
  const currentEvents = events.filter((event) => {
    return new Date(event.date) >= new Date();
  });
  const pastEvents = events.filter((event) => {
    return new Date(event.date) < new Date();
  });

  return (
    <ContentSection background="course">
      {currentEvents.length === 0 ? null : (
        <>
          <h2
            className="text-bodyM font-black uppercase font-bigShoulder cursor-pointer pb-1"
            style={{ lineHeight: '1.5rem' }}>
            Events
          </h2>
          <hr />
          <div className="mt-6">
            {currentEvents.slice(0, limit).map((event, id) => (
              <Article key={`event-${id}`} {...event} />
            ))}
          </div>
        </>
      )}
      {pastEvents.length === 0 ? null : (
        <>
          <h2
            className="text-bodyM font-black uppercase font-bigShoulder cursor-pointer pb-1"
            style={{ lineHeight: '1.5rem' }}>
            Past Events
          </h2>
          <hr />
          <div className="mt-6">
            {pastEvents.slice(0, limit).map((event, id) => (
              <Article key={`event-${id}`} {...event} />
            ))}
          </div>
        </>
      )}
    </ContentSection>
  );
};
