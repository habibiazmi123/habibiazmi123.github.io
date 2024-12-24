import type { NextPage } from "next";

import Hero from "../modules/home/Hero";
import Me from "../modules/home/Me";
import Projects from "../modules/home/Projects";
import Skills from "../modules/home/Skills";
import Layout from "../shared/Layout";

const Home: NextPage = () => (
  <Layout
    title='Muhamad Habibi Azmi — Software Developer'
    description='Muhamad Habibi Azmi is a Developer based in Bandung, Indonesia.'
  >
    <Hero />
    <Me />
    <Projects />
    <Skills />
  </Layout>
);

export default Home;
