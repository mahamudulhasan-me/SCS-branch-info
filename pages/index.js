import Header from "@/components/Header";
import { Oswald } from "next/font/google";

import Head from "next/head";
import BranchInfoBySearch from "./BranchInfoBySearch";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Contacts | Sundarban Courier Service</title>
      </Head>
      <main className={oswald.className}>
        <Header />
        <BranchInfoBySearch />
      </main>
    </>
  );
}
