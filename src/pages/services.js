import * as React from "react";
import Navbar from "../components/Navbar";

const ServicesPage = () => {
  return (
    <main className="flex flex-col h-full">
      <Navbar className="flex-basis-20%" />
      <div>Services Page</div>
    </main>
  );
};

export default ServicesPage;

export const Head = () => <title>Skills & Services - Greg Lawrence</title>;
