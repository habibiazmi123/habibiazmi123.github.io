import React from "react";
import Image from "next/image";
import ContentWrapper from "../../shared/ContentWrapper";
import { shimmer, toBase64 } from "../../lib/utils";

type Project = {
  name: string;
  type: string;
  description: string;
  url: string;
  image: string;
};

const Project = (project: Project) => (
  <div className='relative py-12 border-white border-b-2 group'>
    <a
      href={project.url}
      target='_blank'
      rel='noopener noreferrer'
      className='flex flex-col md:flex-row md:justify-between md:items-center'
    >
      <Image
        src={project.image}
        alt={project.name}
        layout='fill'
        placeholder='blur'
        objectFit='cover'
        objectPosition='center'
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
          shimmer(1000, 1000)
        )}`}
        className='z-0 opacity-60 md:opacity-0 md:group-hover:opacity-75 md:duration-150'
      />
      <h2 className='relative z-10 font-display text-4xl md:text-7xl md:transform px-4 md:px-0 md:group-hover:translate-x-12 duration-500'>
        {project.name}
      </h2>
      <section className='relative z-10 md:text-right md:transform px-4 md:px-0 md:group-hover:-translate-x-12 duration-500'>
        <p className='font-medium text-lg md:text-xl'>{project.type}</p>
        <p className='font-medium text-lg md:text-xl'>{project.description}</p>
      </section>
    </a>
  </div>
);

const projects: Project[] = [
  {
    name: "Pegi",
    type: "Full-stack Development",
    description: "PEGI helps parents choose video games that are appropriate for their children",
    url: "https://pegi.info",
    image: "/images/pegirating.png",
  },
  {
    name: "Leapsy",
    type: "Full-stack Development",
    description: "Innovative platform designed to enhance language learning",
    url: "https://leapsy.com",
    image: "/images/leapsy.png",
  },
  {
    name: "Dili",
    type: "Full-stack Development",
    description: "Discover wines and winemakers through backsales",
    url: "https://dilibuzz.com",
    image: "/images/dili.png",
  },
  {
    name: "Pisaaf",
    type: "Full-stack Development",
    description: "web app streamlining operations for foster care agencies",
    url: "https://pisaaf.be",
    image: "/images/pisaaf.png",
  },
  {
    name: "Kypas",
    type: "Full-stack Development",
    description: "Kypas IAM manages who can access a web application",
    url: "https://tgkypas.telkom.co.id",
    image: "/images/kypas.png",
  },
  {
    name: "Baznas Jabar",
    type: "Full-stack Development",
    description: "Baznas Crowdfunding is an online platform that connects donors with charity projects",
    url: "https://baznasjabar.org",
    image: "/images/baznas.png",
  },
  {
    name: "Badami",
    type: "Full-stack Development",
    description: "Bandung Smart City is a discussion forum for the community and MSMEs as well as an information center related to all services provided by the government",
    url: "https://smartcity.bandung.go.id",
    image: "/images/badami.webp",
  },
  {
    name: "Edelweiss Hospital",
    type: "Full-stack Development",
    description: "Hospital web company profile showcasing the hospital's comprehensive facilities and range of services",
    url: "https://edelweiss.id",
    image: "/images/edelweiss.png",
  },
  {
    name: "Digispace",
    type: "Full-stack Development",
    description: "HRIS app like talenta, I develop web and mobile applications designed to streamline company, branch, employee management",
    url: "https://beta.digispace.id",
    image: "/images/digispace.png",
  },
];

const Projects = () => (
  <section
    id='projects'
    className='projects relative z-20 mt-12 tracking-tighter'
  >
    <ContentWrapper extraClass='px-6 md:px-32 py-24'>
      {projects.map((project) => (
        <Project key={project.name} {...project} />
      ))}
    </ContentWrapper>
  </section>
);

export default Projects;
