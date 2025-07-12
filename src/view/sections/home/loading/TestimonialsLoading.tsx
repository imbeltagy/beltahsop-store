import React from "react";

import Container from "@/view/components/elements/container";

export default function TestimonialsLoading() {
  return (
    <section className="bg-primary py-sectionV-sm md:py-sectionV-md">
      <Container>
        {/* Heading skeletons */}
        <div className="mb-6">
          <div className="mb-2 h-8 w-1/3 animate-pulse rounded bg-gray-300" />
        </div>
        {/* Testimonial card skeletons */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-2xl border-2 border-white bg-gray-200"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
