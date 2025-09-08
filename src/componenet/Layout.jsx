import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useSearch } from "../context/SearchContext";

const Layout = ({ children }) => {
  const { isMobile } = useSearch();
  return (
    <>
      <Header />
      <section className={isMobile ? 'p-5 pt-10' : 'p-15'}>{children}</section>
      <Footer />
    </>
  );
};

export default Layout;
