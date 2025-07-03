import { cn } from "@/lib/utils/style-functions/cn";
import { ReactNode } from "react";

type ListItemAction = { link?: string } | { onClick?: () => void };

type ListItem = ListItemAction & {
  icon?: ReactNode;
  text: string;
  className?: string;
};

interface Props {
  items: ListItem[];
}

export function List({ items }: Props) {
  return (
    <ul className="bg-default flex max-h-48 min-w-36 flex-col gap-1 overflow-auto rounded-md p-1 shadow-md ring-4 ring-gray-50 dark:ring-gray-700">
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
              {item.icon}
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
              {item.icon}
              <span>{item.text}</span>
            </button>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
