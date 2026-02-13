import { Header } from "@/components/layout/header";
import { StatsCards } from "@/components/layout/stats-card";

export default function Home() {
  return (
    <div className="max-h-screen bg-background">
      <div className="mt-6">
        <Header />
      </div>
      <main className=" mx-16  px-4 py-6 md:px-8 mt-18">
        <StatsCards />
      </main>
    </div>
  );
}
