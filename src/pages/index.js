import * as React from "react";
import Experience from "../components/Experience";
import Navbar from "../components/Navbar";

const IndexPage = () => {
  return (
    <main className="h-full static">
      <Navbar />
      <Experience />
      <div className="h-[1000px]">Other Stuff</div>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Greg Lawrence - Web Developer</title>;
