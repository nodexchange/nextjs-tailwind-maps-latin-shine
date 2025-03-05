import { Secondary as Layout } from "../layouts";
import ButtonA from "../components/ButtonA";

const AboutOurClasses = () => {
  return (
    <Layout
      title="Latin Shine | Dance Company - Our Salsa and Bachata Classes"
      description="Learn more about our Latin Dance LA Style (on-1 / crossbody) Salsa & Bachata Sensual Classes, weekly schedule, prices and locations"
    >
      <main className=" bg-almostBlack text-white py-10 md:py-10 lg:py-30 justify-between md:items-start">
        <section
          id="salsa"
          className="text-left bg-almostBlack text-white px-8 py-10 md:py-10 lg:py-30 lg:px-30 xl:px-40 justify-between md:items-start"
        >
          <h2 className="font-black uppercase font-bigShoulder text-headingS lg:text-headingS md:mb-4">
            Salsa Tuesdays - Castle Street Dance Studios (High Wycombe)
          </h2>
          <p>
            📣 SALSA Beginners & Improvers COURSES 📣
            <br />
            <br />
            You have been asking and we have listened! We are Starting our new
            LA Style (Crossbody on1) Salsa classes at Castle Street Dance
            Studio. Classes will be taught by two of our instructors Alyssa and
            Martin.
            <br />
            Partners are not required!
            <br />
            Beginners are welcome!
            <br />
            <br />
            <p className="font-bold">Price: £10 per person</p>
            (£7 for student with the valid NUS/University card).
            <br />
          </p>
          <br />
          <p className="font-bold">Tuesdays</p>
          <p>19:00 - 20:00 - Salsa LA (Crossbody on1) Beginners Class</p>
          <p>20:00 - 21:00 - Salsa LA (Crossbody on1) Improvers Class</p>
          <br />
          <p>
            Address: Castle Dance Studio, 52a Castle Street High Wycombe HP13
            6RG.
          </p>
          <div className="w-[200px]">
            <div className="flex">
              <div className="flex-1">
                <ButtonA path="/location#salsa-location" title="Salsa Location" />
              </div>
              <div className="flex-1 ml-5">
                <ButtonA path="/reserve" title="Reserve Now" />
              </div>
            </div>
          </div>
        </section>
        <section
          id="bachata"
          className="text-left bg-courseImage text-white px-8 py-10 md:py-10 lg:py-30 lg:px-30 xl:px-40 justify-between md:items-start"
        >
          <h2 className="font-black uppercase font-bigShoulder text-headingS lg:text-headingS md:mb-4">
            Bachata Wednesdays - Guildhall (High Wycombe)
          </h2>
          <p>
            📣 Bachata Beginners & Improvers COURSES 📣
            <br />
            <br />
            🕺💃 We are teaching Bachata Sensual classes at the High Wycombe
            Guildhall (High Street). 🕺💃
            <br />
            Classes are taught by two of our instructors Alyssa and Martin to
            represent Sensual Style dynamics of followers and leaders.
          </p>
          <p>
            You will learn the basics of Bachata sensual, dancing technique, and
            partner work.
            <br />
            Partners are not required!
            <br />
            Beginners are welcome!
            <br />
            <br />
            <p className="font-bold">Price: £10 per person</p>
            (£7 for student with the valid NUS/University card).
            <br />
          </p>
          <br />
          <p className="font-bold">Wednesdays</p>
          <p>19:00 - 20:00 - Bachata Beginners Class</p>
          <p>20:00 - 21:00 - Bachata Improvers Class</p>
          <br />
          <p>Address: Guildhall (High Street), High Wycombe.</p>
          <div className="w-[200px]">
            <div className="flex">
              <div className="flex-1 ml-5">
              <ButtonA
                path="/location#bachata-location"
                title="Bachata Location"
              />
              </div>
              <div className="flex-1 ml-5">
                  <ButtonA path="/reserve" title="Reserve Now" />
                </div>
            </div>
          </div>
        </section>
        <section
          id="pricing"
          className="text-left bg-almostBlack text-white px-8 py-10 md:py-10 lg:py-30 lg:px-30 xl:px-40 justify-between md:items-start"
        >
          <h2 className="font-black uppercase font-bigShoulder text-headingS lg:text-headingS md:mb-4">
            Prices
          </h2>
          <p className="font-bold">Adult Classes (Salsa and Bachata):</p>
          <p>
            One class (Bachata or Salsa): £10
            <br />
            Two classes (Bachata and Salsa same week): £15
            <br />
            Monthly Pass (All monthly Bachata and Salsa classes): £50
          </p>
          <br />
          <p className="font-bold">Students (Salsa and Bachata):</p>
          <p>
            One class (Bachata or Salsa): £7
            <br />
            Two classes (Bachata and Salsa - same week): £10
            <br />
            Monthly Pass (All monthly Bachata and Salsa classes): £40
          </p>
        </section>
      </main>
    </Layout>
  );
};

export default AboutOurClasses;
