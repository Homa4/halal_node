"use client";
import Image from "next/image";
import Header from "./components/Header/Header";
import MainPage from "./pages/mainpage/MainPage";
import Carousel from "./components/Carousel/Carousel";
import InfoPage from "./pages/maininfopage/InfoPage";

export default function Home() {
  return (
    <>
      <Header />
      {/* <Carousel /> */}
      <MainPage />
      <InfoPage />
    </>
  );
}
