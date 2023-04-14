import * as React from "react";
import Navbar from "../components/Navbar";

const ContactPage = () => {
  return (
    <main className="flex flex-col h-full">
      <Navbar />
      <div>Contact Page</div>
    </main>
  );
};

export default ContactPage;

export const Head = () => <title>Say Hi! - Greg Lawrence</title>;
