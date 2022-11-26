import React from "react";
import { type NextPage } from "next";
import Layout from "../components/Layout";
import { RemindersView } from "../components/Views";

const Home: NextPage = () => {
  return (
    <Layout>
      <RemindersView />
    </Layout>
  );
};

export default Home;
