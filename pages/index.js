import Header from "@/components/Header";
import { Roboto } from "next/font/google";

import Head from "next/head";
import BranchInfoBySearch from "./BranchInfoBySearch";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Contacts | Sundarban Courier Service</title>
      </Head>
      <main className={roboto.className}>
        <Header />
        <BranchInfoBySearch />
      </main>
    </>
  );
}
