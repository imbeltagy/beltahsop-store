import { ReactNode } from "react";

import { cn } from "@/lib/utils/style-functions";

type ListItemAction = { link?: string } | { onClick?: () => void };

type ListItem = ListItemAction & {
  icon?: ReactNode;
  text: string;
  className?: string;
};

interface Props {
  items: ListItem[];
}

export default function List({ items }: Props) {
  return (
    <ul className="bg-background ring-divider flex max-h-48 min-w-36 flex-col gap-1 overflow-auto rounded-md p-1 shadow-md ring-2">
      {items.map((item) => (
        <li key={item.text}>
          {"link" in item ? (
            <a
              href={item.link}
              className={cn(
                "icon-btn flex w-full items-center gap-2",
                item.className,
              )}
            >
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </a>
          ) : null}
          {"onClick" in item ? (
            <button
              onClick={item.onClick}
              className={cn(
                "icon-btn flex w-full items-center gap-2",
                item.className,
              )}
            >
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </button>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
