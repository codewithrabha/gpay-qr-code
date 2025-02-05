'use client';
import Upiform from "@/components/Upiform";
import Footer from "../components/Footer";
import Header from "../components/Header";
import 'material-symbols';


export default function Home() {

  return (
    <>
      <Header />
      <main className="flex-grow">
        <div className="container h-auto sm:h-[100%] w-[100%] flex justify-center">
          <Upiform />
        </div>
      </main>
      <Footer />
    </>
  );
}
