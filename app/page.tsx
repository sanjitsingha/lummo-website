import CapsLockShowcase from "@/components/CapsLockShowcase";
import DownloadSection from "@/components/DownloadSection";
import FaqSection from "@/components/FaqSection";
import FeatureGrid from "@/components/FeatureGrid";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import WhatIsLummo from "@/components/WhatIsLummo";

export default function Home() {
  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-x-clip">
      <SiteHeader />
      <main className="flex flex-col">
        <WhatIsLummo />
        <FeatureGrid />
        <CapsLockShowcase />
        <DownloadSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  );
}
