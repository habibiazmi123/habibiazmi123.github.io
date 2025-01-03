import React from "react";
import Link from "next/link";
import ContentWrapper from "./ContentWrapper";

const Socials = () => (
  <div className='flex flex-1 flex-col space-y-4'>
    <a
      href='https://github.com/habibiazmi123'
      className='text-xl opacity-60 hover:opacity-100 duration-150'
      target="_blank" rel="noreferrer"
    >
      GitHub
    </a>
    <a
      href='https://www.linkedin.com/in/azmibanget'
      className='text-xl opacity-60 hover:opacity-100 duration-150'
      target="_blank" rel="noreferrer"
    >
      LinkedIn
    </a>
    <a
      href='https://instagram.com/m.habibiazmi'
      className='text-xl opacity-60 hover:opacity-100 duration-150'
      target="_blank" rel="noreferrer"
    >
      Instagram
    </a>
  </div>
);

const Links = () => (
  <div className='flex flex-1 flex-col space-y-4'>
    <Link href='/' passHref={true}>
      <span className='text-xl opacity-60 hover:opacity-100 duration-150'>
        Home
      </span>
    </Link>
    <Link href='/#projects' passHref={true}>
      <span className='text-xl opacity-60 hover:opacity-100 duration-150'>
        Projects
      </span>
    </Link>
    <Link href='/#about' passHref={true}>
      <span className='text-xl opacity-60 hover:opacity-100 duration-150'>
        About
      </span>
    </Link>
  </div>
);

const Footer = () => (
  <footer className='w-full py-6'>
    <ContentWrapper extraClass='px-6 md:px-32 pt-12'>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-6'>
        <Socials />
        <Links />
        <a
          href='mailto:habibiazmi.m@gmail.com'
          className='text-xl hover:text-primary duration-150'
        >
          habibiazmi.m@gmail.com
        </a>
      </div>

      <div className='flex justify-between items-baseline mt-8 pt-6 border-t-2 border-white border-opacity-75'>
        <span className='text-xl opacity-60'>
          © {new Date().getFullYear()} — Muhamad Habibi Azmi
        </span>
        <Link href='/' passHref={true}>
          <span className='text-xl opacity-60 hover:opacity-100 duration-150'>
            TOP
          </span>
        </Link>
      </div>
    </ContentWrapper>
  </footer>
);

export default Footer;
