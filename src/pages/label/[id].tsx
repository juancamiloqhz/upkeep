import React from "react";
import { type GetServerSideProps, type NextPage } from "next";
import Layout from "../../components/Layout";
import { trpc } from "../../utils/trpc";
import { CreateNote, ListNote } from "../../components/Note";
import { MdLabelOutline } from "react-icons/md";

const LabelView: NextPage<{ id: string }> = ({ id }) => {
  const allNotesByLabel = trpc.note.allByLabel.useQuery(
    { labelId: id },
    {
      staleTime: 3000,
      refetchOnWindowFocus: false,
      enabled: false,
      //   onSuccess: (data) => {
      //     console.log("allNotesByLabel", data);
      //   },
    }
  );

  React.useEffect(() => {
    allNotesByLabel.refetch();
  }, [id]);
  return (
    <Layout>
      <CreateNote />
      {allNotesByLabel.data?.length ? (
        <ul className="mt-6 columns-1 gap-4 pb-16 sm:columns-[240px]">
          {allNotesByLabel.data?.map((note) => (
            <ListNote key={note.id} note={note} />
          ))}
        </ul>
      ) : null}
      {!allNotesByLabel.data?.length && !allNotesByLabel.isLoading ? (
        <div className="absolute top-1/3 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
          <MdLabelOutline
            size={130}
            className="fill-black/30 dark:fill-white/30"
          />
          <p className="mt-5 text-center text-2xl text-black/30 dark:text-white/30">
            No notes with this label yet
          </p>
        </div>
      ) : null}
    </Layout>
  );
};

export default LabelView;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query?.id as string;
  if (!id) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      id,
    },
  };
};
