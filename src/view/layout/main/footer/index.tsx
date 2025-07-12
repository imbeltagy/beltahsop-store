import { useTranslations } from "next-intl";

import Logo from "@/view/components/logo";
import { paths } from "@/lib/config/paths";
import { Iconify } from "@/view/components/iconify";
import { Button, Container } from "@/view/components/elements";

export default function Footer() {
  const t = useTranslations("Navigation");
  const tFooter = useTranslations("Footer");

  const footerLinks = {
    company: [
      { name: "about", href: "#" },
      { name: "contact", href: "#" },
      { name: "blog", href: "#" },
      { name: "FAQs", href: "#" },
    ],
    support: [
      { name: "help_center", href: "#" },
      { name: "shipping", href: "#" },
      { name: "returns", href: "#" },
      { name: "size_guide", href: "#" },
    ],
  };

  const socialLinks = [
    {
      icon: "mdi:linkedin",
      href: "https://linkedin.com/in/imbeltagy",
      label: "LinkedIn",
    },
    {
      icon: "mdi:github",
      href: "https://github.com/imbeltagy",
      label: "GitHub",
    },
    {
      icon: "mdi:whatsapp",
      href: "https://wa.me/201027797554",
      label: "WhatsApp",
    },
  ];

  return (
    <footer className="bg-background border-divider border-t">
      <Container className="py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Logo full className="max-w-[200px]" href={paths.home} />
            <p className="text-secondary text-sm leading-relaxed">
              {tFooter("description")}
            </p>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn"
                  aria-label={social.label}
                >
                  <Iconify icon={social.icon} className="h-auto w-full" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">
              {tFooter("quick_links")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-secondary hover:text-foreground text-sm transition-colors"
                  >
                    {t(link.name)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">
              {tFooter("support")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-secondary hover:text-foreground text-sm transition-colors"
                  >
                    {t(link.name)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">
              {tFooter("stay_updated")}
            </h3>
            <p className="text-secondary text-sm">
              {tFooter("newsletter_description")}
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder={tFooter("email_placeholder")}
                className="border-divider bg-background text-foreground placeholder:text-secondary focus:border-primary w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
              />
              <Button size="medium" className="w-full">
                {tFooter("subscribe")}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-divider mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
            <p className="text-secondary text-sm">
              {tFooter("copyright", { year: new Date().getFullYear() })}
            </p>

            <div className="flex gap-6 text-sm">
              <span className="text-secondary">
                {tFooter("created_by_text")}{" "}
                <a
                  href="https://www.imbeltagy.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tFooter("creator_name")}
                </a>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
