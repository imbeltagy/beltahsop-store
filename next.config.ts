import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://beltashop.blob.core.windows.net/**")],
  },
};

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");
export default withFlowbiteReact(withNextIntl(nextConfig));
