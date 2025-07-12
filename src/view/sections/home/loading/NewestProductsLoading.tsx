import React from "react";

import Container from "@/view/components/elements/container";

export default function NewestProductsLoading() {
  return (
    <section className="bg-[#F9FAFB]">
      <Container className="py-sectionV-sm md:py-sectionV-md">
        {/* Heading skeletons */}
        <div className="mb-6">
          <div className="mb-2 h-8 w-1/3 animate-pulse rounded bg-gray-300" />
          <div className="h-5 w-1/4 animate-pulse rounded bg-gray-200" />
        </div>
        {/* Product card skeletons */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-xl bg-gray-200"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
