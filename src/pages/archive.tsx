import React from "react";
import { type NextPage } from "next";
import Layout from "../components/Layout";
import { ArchiveView } from "../components/Views";

const Home: NextPage = () => {
  return (
    <Layout>
      <ArchiveView />
    </Layout>
  );
};

export default Home;
