import fs from 'fs';
import path from 'path';
import LocationMap from "../components/LocationMap";
import { Secondary as Layout } from "../layouts";
import { DanceLocation } from '../components/DanceLocation';

const Location = ({ siteText }) => {
  const { locationCopy, footer } = siteText;
  return (
    <Layout
      title="Latin Shine | Dance Company - Our Venue"
      description="Find us at the Guildhall in High Wycombe for our monthly Latin dance socials featuring Salsa, Bachata, Cha Cha and more."
      footer={footer}>
      <LocationMap />
      <DanceLocation copy={locationCopy} />
    </Layout>
  );
};

export async function getServerSideProps() {
  const textPath = path.join(process.cwd(), 'public', 'data', 'text.json');
  const siteText = JSON.parse(fs.readFileSync(textPath, 'utf8'));

  return {
    props: {
      siteText,
    },
  };
}

export default Location;
