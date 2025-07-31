import Link from "next/link";

import { Iconify } from "../iconify";

interface Props {
  backLink?: { label: string; href: string };
  title: string;
  subtitle?: string;
  endComponent?: React.ReactNode;
}

export default function PageHeader({
  backLink,
  title,
  subtitle,
  endComponent,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div>
        {backLink && (
          <Link
            href={backLink.href}
            className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-2 text-sm"
          >
            <Iconify icon="mdi:arrow-left" className="h-4 w-4 rtl:rotate-180" />
            {backLink.label}
          </Link>
        )}
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
      </div>

      {endComponent}
    </div>
  );
}
