import { getPageData } from "@/lib/sanity";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Categories } from "@/components/Categories";
import { WhyUs } from "@/components/WhyUs";
import { Reviews } from "@/components/Reviews";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";
import { Newsletter } from "@/components/Newsletter";

const HOME_SERVICE_EXCLUDED_IDS = ["toilet-replacement", "tree-cutting", "garden-care"] as const;
const HOME_SERVICES_MAX = 6;

export default async function Home() {
  const data = await getPageData();
  const allServices = data.services ?? [];
  const homeServices = allServices
    .filter((s) => !HOME_SERVICE_EXCLUDED_IDS.includes(s.id as (typeof HOME_SERVICE_EXCLUDED_IDS)[number]))
    .slice(0, HOME_SERVICES_MAX);

  return (
    <>
      <Hero site={data.site} stats={data.stats} />
      <Services site={data.site} services={homeServices} />
      <Categories categories={data.categories} />
      <WhyUs whyUs={data.whyUs} />
      <Reviews reviews={data.reviews} />
      <Portfolio portfolio={data.portfolio} />
      <Contact site={data.site} />
      <Newsletter />
    </>
  );
}
