import React from "react";

import Container from "@/view/components/elements/container";

export default function HeroLoading() {
  return (
    <section className="bg-[#dacece]">
      <Container className="relative min-h-[350px] grid-cols-12 items-end gap-4 overflow-hidden md:grid">
        {/* Text skeleton */}
        <div className="py-sectionV-md relative z-10 col-span-7 grid gap-4 max-md:justify-center">
          <div className="mb-2 h-10 w-3/4 animate-pulse rounded bg-gray-300" />
          <div className="mb-4 h-6 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="flex flex-wrap items-center gap-2 max-md:justify-center">
            <div className="h-10 w-32 animate-pulse rounded bg-gray-300" />
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
        {/* Image skeleton */}
        <div className="md:py-sectionV-md bottom-0 left-0 col-span-5 flex w-full items-end max-md:absolute max-md:h-full">
          <div className="mx-auto h-[300px] w-[300px] animate-pulse rounded-xl bg-gray-200" />
        </div>
      </Container>
    </section>
  );
}
