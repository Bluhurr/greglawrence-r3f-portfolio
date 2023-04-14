import * as React from "react";
import Navbar from "../components/Navbar";

const PortfolioPage = () => {
  return (
    <main className="flex flex-col h-full">
      <Navbar className="flex-basis-20%" />
      <div>Portfolio Page</div>
    </main>
  );
};

export default PortfolioPage;

export const Head = () => <title>Portfolio - Greg Lawrence</title>;
