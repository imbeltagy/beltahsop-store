import React from "react";

import Container from "@/view/components/elements/container";

export default function HomeCategoriesLoading() {
  return (
    <section className="bg-neutral py-sectionV-sm md:py-sectionV-md">
      <Container>
        {/* Heading skeletons */}
        <div className="mb-6">
          <div className="mb-2 h-8 w-1/3 animate-pulse rounded bg-gray-300" />
          <div className="h-5 w-1/4 animate-pulse rounded bg-gray-200" />
        </div>
        {/* Category card skeletons */}
        <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-xl bg-gray-200"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
