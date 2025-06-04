// "use client";
// import Image from "next/image";
import Header from "./components/Header/Header";
import MainPage from "./components/mainpage/MainPage";
// import Carousel from "./components/Carousel/Carousel";
import InfoPage from "./components/maininfo/InfoPage";
import Bottom from "./components/Bottom/Bottom";

export default function Home() {
  return (
    <>
      <Header />
      <MainPage />
      <InfoPage />
      <Bottom />
    </>
  );
}
