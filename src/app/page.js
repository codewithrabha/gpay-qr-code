'use client';
import Generator from "@/components/Generator";
import Footer from "../components/Footer";
import Header from "../components/Header";
import 'material-symbols';


export default function Home() {

  return (
    <>
      <Header />
      <main className="grow">
        <div className="container sm:h-[100%] h-[100%] w-[100%] items-center flex justify-center">
          <Generator />
        </div>
      </main>
      <Footer />
    </>
  );
}
