import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';

import { Header } from './Header';
import FooterB from '../components/FooterB';
import ButtonB from '../components/ButtonB';
import ScrollDownIcon from '../components/ScrollDownIcon';
import SideNav from '../components/SideNav';

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

export const Secondary = ({
  title = 'Latin Shine | Dance Company',
  description,
  children,
  footer = {},
}) => {
  return (
    <div className="w-screen h-screen flex flex-col overflow-x-hidden">
      <NextSeo
        title={title}
        description={description}
        openGraph={{ title, description }}
      />
      <Header title={title} />
      <SideNav />
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: 'linear' }}
        className="
                    flex flex-col items-start w-full
                    h-full
                ">
        {children}
        <ButtonB path="/" title="Back to Home" />
        <ScrollDownIcon />
        <FooterB footer={footer} />
      </motion.main>
    </div>
  );
};
