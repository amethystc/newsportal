import Header from "@/components/layout/Header";
import EditorChoise from "@/components/section/EditorChoise";
import { EditorsChoiceV2 } from "@/components/section/EditorChoiseV2";
import Exclusive from "@/components/section/Exclusive";
import { Footer } from "@/components/section/Footer";
import Hero from "@/components/section/Hero";
import { RegionSpotlight } from "@/components/section/RegionSpotLight";
import { SubscriptionCTA } from "@/components/section/SubscribtionCTA";
// import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <EditorChoise background="bg-gray-200" />
      <Exclusive />
      <EditorsChoiceV2 />
      <EditorsChoiceV2 />
      <SubscriptionCTA />
      <RegionSpotlight />
      <EditorChoise background="bg-gray-200" />
      <Footer />
    </>
  );
}
