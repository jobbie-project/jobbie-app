import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { SearchBar } from "@/components/searchbar";
import { JobCardBig } from "@/components/job-card-big";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const username = "Usuário";
  return (
    <>
      <Header />
      <div className="p-5">
        <p>Olá, {username}</p>
        <SearchBar />
        <p>Recomendados</p>
        <div className="horizontal-scroll">
          <JobCardBig />
          <JobCardBig />
          <JobCardBig />
          <JobCardBig />
          <JobCardBig />
          <JobCardBig />
        </div>
      </div>
    </>
  );
}
