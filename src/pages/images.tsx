import React from "react";
import { type NextPage } from "next";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";

const Images: NextPage = () => {
  const allActiveNotes = trpc.image.all.useQuery(undefined, {
    staleTime: 3000,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("allActiveNotes", data);
    },
  });
  return (
    <Layout>
      {allActiveNotes.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>{allActiveNotes.data?.length}</h1>
          {allActiveNotes.data?.map((image) => (
            <div key={image.id}>
              <pre className="text-xs">{JSON.stringify(image, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Images;
