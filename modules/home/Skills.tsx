import React from "react";
import ContentWrapper from "../../shared/ContentWrapper";

const Toolbelt = () => (
  <div className='flex flex-wrap mb-12'>
    <div className='w-full lg:w-1/3'>
      <h2 className='font-display text-2xl md:text-4xl tracking-tight uppercase'>
        Skills
      </h2>
    </div>
    <div className='w-full lg:w-2/3'>
      <p className='font-medium text-2xl tracking-tight mb-4'>
        PHP | LARAVEL | JAVASCRIPT | TYPESCRIPT |
      </p>
      <p className='font-medium text-2xl tracking-tight mb-4'>
        VUE.JS | REACT.JS | NODE.JS | TAILWIND |
      </p>
      <p className='font-medium text-2xl tracking-tight mb-4'>
        DOCKER | NUXT.JS | NEXT.JS | NODE.JS | GO |
      </p>
      <p className='font-medium text-2xl tracking-tight mb-4'>
        MYSQL | POSTGRESQL | MONGODB | REDIS |
      </p>
      <p className='font-medium text-2xl tracking-tight'>
        FIGMA | GIT | GITHUB
      </p>
    </div>
  </div>
);

const Education = () => (
  <div className='flex flex-wrap mb-12'>
    <div className='w-full lg:w-1/3'>
      <h2 className='font-display text-2xl md:text-4xl tracking-tight uppercase'>
        Education
      </h2>
    </div>
    <div className='w-full lg:w-2/3'>
      <p className='font-medium text-2xl tracking-tight'>
        STMIK - IM — Computer Science (2014 - 2018)
      </p>
    </div>
  </div>
);

const Skills = () => (
  <section id='skills' className='skills mt-24'>
    <ContentWrapper extraClass='px-6 md:px-32 py-24'>
      <Toolbelt />
      <Education />
    </ContentWrapper>
  </section>
);

export default Skills;
