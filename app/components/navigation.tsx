"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Custom Orders" },
];

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-[#eadbd5] bg-[#fffaf5]/90 backdrop-blur">
            <nav
                aria-label="Primary navigation"
                className="w-full px-5 py-3 sm:flex sm:items-center sm:justify-between sm:px-8 sm:py-4 lg:px-12"
            >
                <div className="flex items-center justify-between gap-4">
                    <Link
                        href="/"
                        className="inline-flex w-fit items-center rounded-full transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b8837a]"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <Image
                            src="/rt-header-logo.png"
                            alt="Rainbow Trove"
                            width={4806}
                            height={1301}
                            className="h-11 w-auto max-w-[245px] sm:h-16 sm:max-w-none"
                            priority
                        />
                    </Link>

                    <button
                        type="button"
                        aria-expanded={isMenuOpen}
                        aria-controls="primary-navigation-menu"
                        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        onClick={() => setIsMenuOpen((current) => !current)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#eadbd5] bg-[#fffdf9] text-[#7e5752] shadow-sm shadow-[#eadbd5] transition hover:bg-[#f3e8e2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b8837a] sm:hidden"
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                <div
                    id="primary-navigation-menu"
                    className={`${isMenuOpen ? "grid" : "hidden"} mt-3 gap-1 rounded-3xl border border-[#eadbd5] bg-[#fffdf9] p-2 shadow-sm shadow-[#eadbd5] sm:mt-0 sm:flex sm:flex-wrap sm:items-center sm:justify-end sm:gap-2 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none`}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="rounded-full px-4 py-3 text-sm font-semibold text-[#6f625c] transition hover:bg-[#f3e8e2] hover:text-[#9f6f68] sm:py-2"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}
