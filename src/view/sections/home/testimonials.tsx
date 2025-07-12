import { useTranslations } from "next-intl";

import { Iconify } from "@/view/components/iconify";
import { useCurrentLocale } from "@/lib/hooks/locale-hooks";
import { Rating, Container } from "@/view/components/elements";
import SectionHeadding from "@/view/components/features/section-headding";

export default function Testimonials() {
  const t = useTranslations("Pages.Home.Testimonials");

  return (
    <section className="bg-primary py-sectionV-sm md:py-sectionV-md">
      <Container>
        <SectionHeadding headding={t("headding")} darkBG />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {TESTIMONIALS_DATA.map((item, index) => (
            <Card {...item} key={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Card({
  nameEn,
  nameAr,
  locationEn,
  locationAr,
  stars,
  feedback,
}: CardPropsType) {
  const { value: locale } = useCurrentLocale();

  return (
    <div className="relative rounded-2xl border-2 border-white px-4 py-16 text-center text-white md:px-6 lg:px-12">
      <p className="mx-auto text-balance lg:text-lg" dir="ltr">
        {feedback}
      </p>

      {/* Author */}
      <div className="my-4 text-lg lg:text-xl">
        <span className="font-special">
          {locale === "en" ? nameEn : nameAr}
        </span>
        {" - "}
        <span className="font-semibold">
          {locale === "en" ? locationEn : locationAr}
        </span>
      </div>

      {/* Rating */}
      <Rating stars={stars} />

      {/* Quotes Icons */}
      {/* Top Icon */}
      <div className="bg-primary absolute right-full bottom-full w-20 translate-x-[85%] translate-y-[75%] -scale-x-100 p-2 text-white">
        <Iconify icon="streamline:quotation-2-solid" width="100%" />
      </div>
      {/* Bottom Icon */}
      <div className="bg-primary absolute top-full left-full w-20 translate-x-[-85%] translate-y-[-75%] -scale-x-100 p-2 text-white">
        <Iconify icon="streamline:quotation-2-solid" width="100%" />
      </div>
    </div>
  );
}

interface CardPropsType {
  nameEn: string;
  nameAr: string;
  locationEn: string;
  locationAr: string;
  stars: number;
  feedback: string;
}

const TESTIMONIALS_DATA: CardPropsType[] = [
  {
    nameEn: "John Doe",
    nameAr: "جون دو",
    locationEn: "London",
    locationAr: "لندن",
    stars: 5,
    feedback:
      "All base UI elements are made using Nested Symbols and shared styles that are logically connected. Gorgeous, high-quality video sharing on desktop, mobile, tablet. All base UI elements are made using Nested Symbols",
  },
  {
    nameEn: "Jane Smith",
    nameAr: "جان سميث",
    locationEn: "New York",
    locationAr: "نيويورك",
    stars: 4,
    feedback:
      "The user interface is intuitive and easy to navigate. The design is modern and visually appealing. The video quality is excellent on all devices. I highly recommend this platform.",
  },
];
