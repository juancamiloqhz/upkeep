import React from "react";
import { type NextPage } from "next";
import Layout from "../components/Layout";
import { TrashView } from "../components/Views";

const Home: NextPage = () => {
  return (
    <Layout>
      <TrashView />
    </Layout>
  );
};

export default Home;
