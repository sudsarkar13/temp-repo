import Head from "next/head";
import React, { useState } from "react";
import { Nav, MobileNav } from "@/components/navigation";
import ShopMain from "@/components/shop/ShopMain";
import Footer from "@/components/footer/Footer";

const Shop = () => {
  const [nav, setNav] = useState(false);
  const openNav = () => setNav(true);
  const closeNav = () => setNav(false);

  return (
    <div className='overflow-x-hidden'>
      <Head>
        <title>Maa Tarini Electrical</title>
        <meta
          name='description'
          content='Maa Tarini Electrical is an electrical shop based in Cuttack, Odisha. We offer complete range of electrical services.'
        />
      </Head>
      <Nav openNav={openNav} />
      <MobileNav nav={nav} closeNav={closeNav} />
      <ShopMain />
      <Footer />
    </div>
  );
};

export default Shop;