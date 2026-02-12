import { Secondary as Layout } from "../layouts";
import { ContentMain, ContentSection } from "../components/layout";
import ButtonA from "../components/ButtonA";

const AboutOurClasses = () => {
  return (
    <Layout
      title="Latin Shine | Dance Company - Monthly Socials & Classes"
      description="Join our monthly Latin dance socials in High Wycombe. Each evening features a 1-hour class with guest teachers followed by a social dance. Salsa, Bachata, Cha Cha and more. All levels welcome."
    >
      <ContentMain>
        <ContentSection
          id="monthly-social"
          background="dark"
          align="left"
        >
          <h2 className="font-black uppercase font-bigShoulder text-headingS lg:text-headingS md:mb-4">
            Monthly Social & Class — Guildhall, High Wycombe
          </h2>
          <p>
            Join us for our monthly Latin dance socials at the Guildhall in High
            Wycombe, featuring newly renovated wooden floors — perfect for
            dancing!
            <br />
            <br />
            Each evening kicks off with a <strong>1-hour class at 7PM</strong>{" "}
            led by guest teachers, covering a range of styles including Salsa,
            Bachata, Cha Cha and more. After the class, stay for our{" "}
            <strong>social dance until midnight</strong>.
            <br />
            <br />
            Partners are not required!
            <br />
            All levels welcome — from complete beginners to experienced dancers.
            <br />
            <br />
            For pricing and dates, please contact us for details.
          </p>
          <br />
          <p>
            Address: Guildhall, High Street, High Wycombe, HP11 2AG.
          </p>
          <div className="w-[200px]">
            <ButtonA path="/location" title="Our Venue" />
          </div>
        </ContentSection>

        <ContentSection
          id="what-to-expect"
          background="course"
          align="left"
        >
          <h2 className="font-black uppercase font-bigShoulder text-headingS lg:text-headingS md:mb-4">
            What to Expect
          </h2>
          <p>
            <strong>7:00 PM — Class:</strong> A fun, energetic 1-hour class with
            a rotating guest teacher each month. Whether it&apos;s Salsa, Bachata, Cha
            Cha or something new, you&apos;ll learn fresh moves and techniques in a
            supportive environment.
            <br />
            <br />
            <strong>8:00 PM — Social Dance:</strong> The floor opens up for
            social dancing until around midnight. Put your new moves into
            practice, dance with different partners, and enjoy the music in a
            friendly, welcoming atmosphere.
            <br />
            <br />
            Our socials are a fantastic way to meet like-minded people, improve
            your dancing, and enjoy a great night out. Come on your own or bring
            friends — everyone is welcome!
          </p>
        </ContentSection>
      </ContentMain>
    </Layout>
  );
};

export default AboutOurClasses;
