"use client";
import { useI18n } from "@/i18n";

export default function Footer() {
  const { t } = useI18n();

  const shopLinks = [
    { label: t.products.categories["screws-fasteners"], href: "/products?category=screws-fasteners" },
    { label: t.products.categories["tools"], href: "/products?category=tools" },
    { label: t.products.categories["power-tools"], href: "/products?category=power-tools" },
    { label: t.products.categories["building-hardware"], href: "/products?category=building-hardware" },
    { label: t.products.categories["door-window"], href: "/products?category=door-window" },
  ];

  return (
    <footer className="bg-apple-light border-t border-apple-border/30 mt-20">
      <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-apple-text">
        <div>
          <h4 className="font-semibold text-apple-dark mb-3">{t.header.storeName}</h4>
          <p className="text-xs leading-relaxed">{t.footer.description}</p>
        </div>
        <div>
          <h4 className="font-semibold text-apple-dark mb-3">{t.footer.shop}</h4>
          <div className="flex flex-col gap-1.5 text-xs">
            {shopLinks.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-apple-dark mb-3">{t.footer.help}</h4>
          <div className="flex flex-col gap-1.5 text-xs">
            <a href="/shipping">{t.nav.shipping}</a>
            <a href="/payment">{t.nav.payment}</a>
            <a href="/orders">{t.nav.orders}</a>
            <a href="/about">{t.nav.about}</a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-apple-dark mb-3">{t.footer.contact}</h4>
          <div className="flex flex-col gap-1.5 text-xs">
            <span>sales@myhardware.pro</span>
            <span>+60 3-xxxx-xxxx</span>
            <span>{t.footer.address}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-apple-border/30 px-5 py-4 text-center text-[11px] text-apple-text">
        &copy; {new Date().getFullYear()} {t.header.storeName}. {t.footer.rights}
      </div>
    </footer>
  );
}
