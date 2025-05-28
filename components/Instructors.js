import text from "../config/text.json";

export const Instructors = () => {
  const { instructors } = text;
  return (
    <section className="bg-no-repeat bg-cover bg-instructorsImage text-white w-full px-8 py-10 md:py-10 lg:py-30 lg:px-30 xl:px-40 justify-between md:items-start">
      <div className="block lg:flex">
        <div className="flex-none w-full md:w-[445px] md:h-[889px] ">
          <video id="player" controls className="w-auto h-[800px] relative top-0 left-0 sm:w-[320px] md:w-full lg:w-auto">
            <source src="/instructors.mp4" />
          </video>
        </div>
        <div className="grow px-4 pt-4 md:pt-0">
          <h2 className="font-black uppercase font-bigShoulder text-headingS lg:text-headingS md:mb-4">
            Meet your teachers
          </h2>
          <p className="my-4 l:my-12 md:m-0 font-light font-outfit text-bodyXS md:text-bodyS md:w-100">
            {instructors.first}
          </p>
          <br />
          <p className="my-4 l:my-12 md:m-0 font-light font-outfit text-bodyXS md:text-bodyS md:w-100">
            {instructors.second}
          </p>
          <br />
          <p className="my-4 l:my-12 md:m-0 font-light font-outfit text-bodyXS md:text-bodyS md:w-100">
            {instructors.third}
          </p>
        </div>
      </div>
    </section>
  );
};
