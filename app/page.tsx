import CapsLockShowcase from "@/components/CapsLockShowcase";
import FaqSection from "@/components/FaqSection";
import FeatureGrid from "@/components/FeatureGrid";
import KeyboardSection from "@/components/KeyboardSection";
import ShortcutsSection from "@/components/ShortcutsSection";
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
        <ShortcutsSection />
        <CapsLockShowcase />
        <KeyboardSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  );
}
