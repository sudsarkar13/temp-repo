"use client";

import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const services = [
  {
    id: 1,
    num: "01",
    title: "Web Development",
    description: "I develop websites using Next.js and Tailwind CSS.",
    href: "",
  },
  {
    id: 2,
    num: "02",
    title: "UI/UX Design",
    description: "I design user interfaces and experiences.",
    href: "",
  },
  {
    id: 3,
    num: "03",
    title: "SEO Optimization",
    description: "I optimize websites for search engines.",
    href: "",
  },
  {
    id: 4,
    num: "04",
    title: "Consultation",
    description: "I provide consultation services for businesses.",
    href: "",
  },
]

const ServicesPage: React.FC = () => {
  return (
    <main>
      <section>
        <div className={`container mx-auto`}>Services Page</div>
      </section>
    </main>
  );
};

export default ServicesPage;