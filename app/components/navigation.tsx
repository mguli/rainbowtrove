import Image from "next/image";
import Link from "next/link";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Custom Orders" },
];

export default function Navigation() {
    return (
        <header className="sticky top-0 z-50 border-b border-[#eadbd5] bg-[#fffaf5]/90 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
                <Link href="/" className="flex items-center gap-3 text-2xl font-extrabold tracking-wide text-[#9f6f68]">
                    <Image
                        src="/rt-logo.png"
                        alt="Rainbow Trove logo"
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-full object-cover"
                        priority
                    />
                    <span>Rainbow Trove</span>
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
