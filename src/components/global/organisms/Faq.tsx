import React from "react";
import Accordion from "../molecules/Accordion";

const FAQ = () => {
  return (
    <div className="p-4 bg-white/35 rounded-lg w-1/2 mx-auto my-10">
      <Accordion
        title="Do you prefer Android or iOS"
        answer="I like to use iOS products"
      />
      <Accordion
        title="Do you prefer writing CSS or Tailwind?"
        answer="I like to use Tailwind"
      />
      <Accordion title="Firebase or Supabase?" answer="I am using Supabase!" />
    </div>
  );
};

export default FAQ;