import * as React from "react";
import Navbar from "../components/Navbar";

const AboutPage = () => {
  return (
    <main className="flex flex-col h-full">
      <Navbar className="flex-basis-20%" />
      <div>About Page</div>
    </main>
  );
};

export default AboutPage;

export const Head = () => <title>About Me - Greg Lawrence</title>;
