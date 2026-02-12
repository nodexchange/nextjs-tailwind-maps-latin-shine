import fs from 'fs';
import path from 'path';
import { About } from "../components/About";
import { AboutSalsa } from "../components/AboutSalsa";
import HeroSection from "../components/HeroSection";
// import HeroVideo from "../components/HeroVideo";
import MainSection from "../components/MainSection";
import { Instructors } from "../components/Instructors";
import { News } from "../components/News";
import { UpcomingEventBanner } from "../components/UpcomingEventBanner";
import Header from "../components/Header";
import { Main as Layout } from "../layouts";
import ImageGallery from "../components/ImageGallery";
import { AnnouncementBanner } from "../components/AnnouncementBanner";

export default function Home({ articles, events, siteText }) {
  const { hero, main, about, instructors, footer } = siteText;
  return (
    <Layout title="Latin Shine | Dance Company - Learn Bachata & Salsa today!" description="Monthly Latin dance socials at the Guildhall in High Wycombe by Latin Shine Dance Company. Salsa, Bachata, Cha Cha and more. Class with guest teachers followed by social dancing. Beginners welcome. No partner required." footer={footer}>
      <Header />
      {/* <HeroVideo /> */}
      <HeroSection hero={hero} />
      <UpcomingEventBanner events={events} />
      <div className='relative h-[82vh] scroll-smooth hover:scroll-auto flex flex-col'>
        <div className="flex-1 overflow-auto">
          <News articles={articles} limit={4} />
        </div>
      </div>
      <ImageGallery />
      <AboutSalsa />
      <About about={about} />
      {/* <Signup /> */}
      <MainSection main={main} />
      <Instructors instructors={instructors} />
    </Layout>
  );
}

export async function getServerSideProps() {
  const articlesPath = path.join(process.cwd(), 'public', 'data', 'articles.json');
  const eventsPath = path.join(process.cwd(), 'public', 'data', 'events.json');
  const textPath = path.join(process.cwd(), 'public', 'data', 'text.json');

  const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
  const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
  const siteText = JSON.parse(fs.readFileSync(textPath, 'utf8'));

  return {
    props: {
      articles: articlesData.articles || [],
      events: eventsData.events || [],
      siteText,
    },
  };
}
