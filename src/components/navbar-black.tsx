import { motion, useScroll, useTransform } from 'framer-motion';
import { SocialIcon } from 'react-social-icons'; 
import React from 'react';

const NavbarBlack: React.FC = () => {
  const targetRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.nav
      className='sticky mt-8 z-50 mx-auto w-full flex justify-center md:text-lg'
      ref={targetRef}
      style={{ opacity }}
    >
      <div className="hidden md:flex gap-4 ">
        <SocialIcon className="w-14 hover:-translate-y-2 duration-200" network="github" url="https://github.com/theeatch"></SocialIcon>
        <SocialIcon className="w-14 hover:-translate-y-2 duration-200" network="instagram" url="https://instagram.com/dhxdxd"></SocialIcon>
        <SocialIcon className="w-14 hover:-translate-y-2 duration-200" network="linkedin" url="https://www.linkedin.com/in/dhruv-negi-387a3a233/"></SocialIcon>
        <SocialIcon className="w-14 hover:-translate-y-2 duration-200" network="youtube" url="https://youtube.com/DHsPianoLand"></SocialIcon>
      </div>
    </motion.nav>
  );
};

export default NavbarBlack;