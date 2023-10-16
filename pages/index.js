import Header from "@/components/Header";
import { Inter } from "next/font/google";

import BranchInfoBySearch from "./BranchInfoBySearch";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={inter.className}>
      <Header />
      <BranchInfoBySearch />
    </main>
  );
}
