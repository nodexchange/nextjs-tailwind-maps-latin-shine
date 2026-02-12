import { Article } from './Article';

export const UpcomingEventBanner = ({ events = [] }) => {
  const currentEvents = events.filter((event) => {
    return new Date(event.date) >= new Date();
  });

  // If no upcoming events, don't render anything
  if (currentEvents.length === 0) {
    return null;
  }

  // Get the next upcoming event (first one in the filtered array)
  const nextEvent = currentEvents[0];

  return (
    <section className="bg-gradient-to-r from-shine to-shineDark text-white px-8 py-8 md:py-12 lg:py-16 lg:px-30 xl:px-40 justify-between md:items-start">
      <div className="text-center mb-6">
        <h2
          className="text-bodyM font-black uppercase font-bigShoulder cursor-pointer pb-1"
          style={{ lineHeight: '1.5rem' }}>
          🎉 Next Upcoming Social in High Wycombe 🎉
        </h2>
        <hr className="border-white/30 max-w-md mx-auto" />
      </div>
      <div className="mt-6">
        <Article key={`upcoming-event-${nextEvent.id}`} {...nextEvent} />
      </div>
    </section>
  );
};
