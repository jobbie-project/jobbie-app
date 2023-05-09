import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { SearchBar } from "@/components/searchbar";
import { JobCardBig } from "@/components/job-card-big";
import { JobCardMedium } from "@/components/card-medium";
import { Job } from "@/interfaces/job";

const inter = Inter({ subsets: ["latin"] });

const mockJob: Job = {
  title: "Desenvolvedor Front-end",
  company: {
    name: "Lorem ipsum S/A",
    email: "mockemail@gmail.com",
    phone: "11 99999-9999",
    document: "99.999.999/9999-99",
    sector: "Tecnologia",
    address: "Rua Lorem Ipsum, 9999",
  },
  sector: ["Design"],
  category: "Estágio",
  description: "Lorem ipsum dolor sit amet, consectetu",
  salary: 1600,
  modalities: "Remoto",
  daily_hours: 6,
};

const numberOfJobs = 5;

export default function Home() {
  const username = "Usuário";
  return (
    <>
      <Header />
      <div className="p-5">
        <p className="my-5">Olá, {username}</p>
        <SearchBar />
        <p className="mt-5">Recomendados</p>
        <div className="relative flex mb-5 items-center">
          <div className="w-full h-full bg- overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
            {Array(numberOfJobs)
              .fill(0)
              .map((_, index) => (
                <div className="inline-block mr-3 ">
                  <JobCardBig job={mockJob} key={index} />
                </div>
              ))}
          </div>
        </div>
        <p>Vagas recentes</p>
        {Array(numberOfJobs)
          .fill(0)
          .map((_, index) => (
            <div className="mb-5">
              <JobCardMedium job={mockJob} key={index} />
            </div>
          ))}
      </div>
    </>
  );
}
