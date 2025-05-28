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

export default function Home() {
  return (
    <Layout title="Latin Shine | Dance Company - Learn Bachata & Salsa today!" description="Fun and friendly Bachata and Salsa Latin dance classes in High Wycombe, every Tuesday and Wednesday by Latin Shine Dance Company. Beginners are welcome. No partners required. Booking highly recommended.">
      <Header />
      {/* <HeroVideo /> */}
      <HeroSection />
      <UpcomingEventBanner />
      {/* <AnnouncementBanner /> */}
      <div className='relative h-[82vh] scroll-smooth hover:scroll-auto flex flex-col'>
        <div className="flex-1 overflow-auto">
          <News limit={4} />
        </div>
      </div>
      {/* <ImageGallery /> */}
      <AboutSalsa />
      <About />
      {/* <Signup /> */}
      <MainSection />
      <Instructors />
    </Layout>
  );
}
