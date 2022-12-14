import React from "react";
import { type NextPage } from "next";
import Layout from "../components/Layout";
import { CreateNote } from "../components/Note";
import { HomeView } from "../components/Views";

const Home: NextPage = () => {
  return (
    <Layout>
      <CreateNote />
      <HomeView />
    </Layout>
  );
};

export default Home;
