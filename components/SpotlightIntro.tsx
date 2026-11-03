/** Sits under the hero's laptop and says in a few lines what Spotlight is. */
export default function SpotlightIntro() {
  return (
    <p className="mt-5 max-w-[60rem] shrink-0 px-2 text-center text-pretty text-[clamp(0.8125rem,0.85vw,0.9375rem)] leading-[1.65] tracking-[-0.01em] text-[#6e6e6e] sm:mt-7">
      Mac users have had Spotlight for years. Windows and Linux never got it, so lummo brings it over: a search bar
      that pops up over whatever you&apos;re doing. Start typing and it finds your apps, files and folders as you go,
      does quick sums on the spot, and hands anything else to a web search. Press enter to open the top result, and it
      gets right out of your way.
    </p>
  );
}
