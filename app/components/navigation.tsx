import Link from "next/link";
import Image from "next/image";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Custom Orders" },
];

export default function Navigation() {
    return (
        <header className="sticky top-0 z-50 border-b border-[#eadbd5] bg-[#fffaf5]/90 backdrop-blur">
            <nav
                aria-label="Primary navigation"
                className="flex w-full flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"
            >
                <Link href="/" className="inline-flex w-fit items-center rounded-full transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b8837a]">
                    <Image
                        src="/rt-header-logo.png"
                        alt="Rainbow Trove"
                        width={4806}
                        height={1301}
                        className="h-14 w-auto sm:h-16"
                        priority
                    />
                </Link>

                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="rounded-full px-4 py-2 text-sm font-semibold text-[#6f625c] transition hover:bg-[#f3e8e2] hover:text-[#9f6f68]"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}
