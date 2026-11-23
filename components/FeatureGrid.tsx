import { APP_ICONS } from "@/components/AppIcons";
import FeatureCarousel from "@/components/FeatureCarousel";
import { CurrencyAnswer } from "@/components/FeatureDemos";
import { MockCalc, MockHeading, MockQuickFiles, MockRow, MockSplit, SpotlightMockCard } from "@/components/SpotlightMock";

const RECENTLY_OPENED = [
  { name: "Slack", icon: APP_ICONS.slack },
  { name: "Notion", icon: APP_ICONS.notion },
  { name: "Visual Studio Code", icon: APP_ICONS.vscode },
  { name: "Spotify", icon: APP_ICONS.spotify },
  { name: "Discord", icon: APP_ICONS.discord },
  { name: "Google Chrome", icon: APP_ICONS.chrome },
];

/** Everything on the hotkey, opening apps first, each shown in a still Spotlight mockup. */
export default function FeatureGrid() {
  return (
    <section id="features" aria-labelledby="features-title" className="w-full pt-24 max-sm:pt-8 lg:pt-36">
      <h2 id="features-title" className="mb-12 text-center text-[clamp(1.25rem,1.8vw,1.625rem)] font-medium tracking-[-0.02em] text-ink lg:mb-16">
        One hotkey. <span className="text-ink-2">All of this.</span>
      </h2>
      <FeatureCarousel>
        <SpotlightMockCard tone="purple" query="Figma" lead="Open anything." rest="Super quick.">
          <MockHeading>Top Hit</MockHeading>
          <MockRow name="Figma" icon={APP_ICONS.figma} selected />
          <MockHeading>Recently opened</MockHeading>
          {RECENTLY_OPENED.map((app) => (
            <MockRow key={app.name} {...app} />
          ))}
        </SpotlightMockCard>
        <SpotlightMockCard query="$1" panelWidth="100cqw" lead="Money, converted." rest="166 currencies, updated daily and ready offline.">
          <CurrencyAnswer />
          <MockHeading>Related</MockHeading>
          <MockRow name="Search Google for “1 USD to INR”" subtitle="Web search" icon={APP_ICONS.chrome} />
        </SpotlightMockCard>
        <SpotlightMockCard tone="blue" query="5'10 in cm" panelWidth="100cqw" lead="Every unit, understood." rest="Height, weight, temperature and more, typos included.">
          <MockSplit
            left={{ code: "ft", amount: "5 ft 10 in", name: "Feet", note: "Length" }}
            right={{ code: "cm", amount: "177.8 cm", name: "Centimeters", note: "1 ft = 30.48 cm" }}
          />
          <MockHeading>Related</MockHeading>
          <MockRow name="Search Google for “5 ft 10 in to cm”" subtitle="Web search" icon={APP_ICONS.chrome} />
        </SpotlightMockCard>
        <SpotlightMockCard lead="Quick files." rest="Everything you copy, ready to paste again.">
          <MockQuickFiles />
        </SpotlightMockCard>
        <SpotlightMockCard tone="teal" query="249*12" panelWidth="100cqw" fade={0.85} lead="Quick math." rest="Type a sum and the answer is already there.">
          <MockHeading>Calculator</MockHeading>
          <MockCalc expression="249 × 12" answer="2988" />
          <MockHeading>Web</MockHeading>
          <MockRow name="Search Google for “249*12”" subtitle="Web search" icon={APP_ICONS.chrome} />
        </SpotlightMockCard>
        <SpotlightMockCard query="best laptops 2026" fade={1.08} lead="Search the web." rest="Press enter and Google opens in your default browser.">
          <MockHeading>Web</MockHeading>
          <MockRow name="Search Google for “best laptops 2026”" subtitle="Web search" icon={APP_ICONS.chrome} selected />
          {/* empty panel below the result, so the fade has room and the result stays clear */}
          <div style={{ height: 190 }} />
        </SpotlightMockCard>
      </FeatureCarousel>
    </section>
  );
}
