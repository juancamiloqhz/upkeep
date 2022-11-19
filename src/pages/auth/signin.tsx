import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
} from "next";
import { signIn, getCsrfToken, getProviders } from "next-auth/react";
import Image from "next/image";
// import Header from "../../components/Header";

const Signin = ({
  csrfToken,
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      {/* <Header /> */}
      <div
      //   className={styles.wrapper}
      />
      <div
      //   className={styles.content}
      >
        <div
        // className={styles.cardWrapper}
        >
          <Image
            src="/katalog_full.svg"
            width={196}
            height={64}
            alt="App Logo"
            style={{ height: "85px", marginBottom: "20px" }}
          />
          <div
          //   className={styles.cardContent}
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <input
              placeholder="Email (Not Setup - Please Use Github)"
              //   size="large"
            />
            <button
            // className={styles.primaryBtn}
            >
              Submit
            </button>
            <hr />
            {providers &&
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              Object.values(providers).map((provider: any) => (
                <div key={provider.name} style={{ marginBottom: 0 }}>
                  <button onClick={() => signIn(provider.id)}>
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Image
        src="/login_pattern.svg"
        alt="Pattern Background"
        fill
        // className={styles.styledPattern}
      />
    </div>
  );
};

export default Signin;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      providers,
      csrfToken,
    },
  };
};
