const aboutSections = [
  {
    title: "Why Choose Us",
    body: [
      "Each item is meticulously crafted and designed to perfection.",
      "We employ various techniques like vinyl, sublimation, and printing to produce exquisite pieces.",
    ],
  },
  {
    title: "Explore Our Collections",
    body: [
      "While we offer a thoughtfully curated range on our Etsy store, our specialty lies in crafting custom-made products tailored to your requirements.",
    ],
  },
  {
    title: "Our Background",
    body: [
      'I have always had a flair for crafting meaningful gifts. What began with handmade cards and gifts for loved ones evolved into Rainbow Trove. The name "Rainbow Trove" symbolizes our belief in vibrant treasures, and our creations embody simplicity and happiness.',
    ],
  },
  {
    title: "Tailored Requests",
    body: [
      "We take pleasure in bringing your ideas to life! Whether it is personalizing an item or designing something entirely new, we are here to realize your vision. Contact us by email for any custom inquiries.",
    ],
  },
  {
    title: "Sustainability",
    body: [
      "We prioritize eco-friendly packaging, choosing compostable or recyclable materials whenever feasible.",
    ],
  },
];

export default function About() {
  return (
    <main className="bg-[#fffaf5] text-[#4A4A4A]">
      <section className="bg-[linear-gradient(135deg,#fffaf5_0%,#f5e6df_50%,#e7efdf_100%)]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20 lg:px-8">
          <p className="inline-flex rounded-full bg-[#fffaf5]/85 px-4 py-2 text-sm font-bold text-[#9f6f68] shadow-sm shadow-[#eadbd5]">
            About Rainbow Trove
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
            Welcome to Rainbow Trove!
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#6f625c]">
            At Rainbow Trove, our idea is to transform every gift into a cherished
            memory. We take pride in our dedication to creating one-of-a-kind,
            handmade products with meticulous attention and heartfelt passion.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {aboutSections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-[#eadbd5] bg-[#fffdf9] p-6 shadow-sm shadow-[#eadbd5]"
            >
              <h2 className="text-xl font-extrabold text-[#4A4A4A]">{section.title}</h2>
              <div className="mt-4 space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="leading-7 text-[#6f625c]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#dfe8d7] bg-[#eef4e8] p-8 text-[#4f5f49] shadow-sm shadow-[#dfe8d7]">
          <h2 className="text-2xl font-extrabold">Queries or special requests?</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[#65795d]">
            For queries or special requests, feel free to message. Happy shopping!
          </p>
        </div>
      </section>
    </main>
  );
}
