"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuContent,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface MainNavProps {
    pathname: string;
    continents: any[];
    getNavLinkClass: (href: string) => string;
}

const MainNav = ({ pathname, continents, getNavLinkClass }: MainNavProps) => {
    return (
        <nav className="ml-auto px-6 py-4 w-full lg:w-[78%]">
            <div className="flex w-full items-center">
                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-start space-x-4 lg:space-x-6 w-full">
                    <NavigationMenu style={{ marginRight: "auto" }}>
                        <NavigationMenuList className="flex-nowrap">
                            {/* TOPICS / CATEGORIES */}
                            {[
                                { label: "Conflict", href: "/conflict" },
                                { label: "Humanitarian", href: "/humanitarian" },
                                { label: "Trade", href: "/trade" },
                                { label: "Geopolitics", href: "/geopolitics" },
                                { label: "Spaces", href: "/spaces" },
                            ].map((item) => (
                                <NavigationMenuItem key={item.label}>
                                    <Link
                                        href={item.href}
                                        className={`border-r-2 border-black inline-flex h-10 w-max items-center justify-center rounded-none px-3 lg:px-4 py-2 text-xs lg:text-sm font-bold uppercase ${pathname === item.href ? 'text-red-600' : 'text-gray-800 hover:bg-gray-300'}`}
                                    >
                                        {item.label}
                                    </Link>
                                </NavigationMenuItem>
                            ))}

                            {/* WORLD / REGIONS Dropdown */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger
                                    className={`border-r-2 border-black h-10 rounded-none bg-transparent hover:bg-gray-300 text-xs lg:text-sm font-bold px-3 lg:px-4 ${pathname.startsWith('/regions') ? 'text-red-600' : 'text-gray-800'}`}
                                >
                                    WORLD
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white border shadow-lg">
                                        {continents.map((continent) => (
                                            <li key={continent._id} className="row-span-3">
                                                <div className="text-sm font-bold leading-none mb-2 text-red-600 uppercase tracking-wider">
                                                    {continent.title}
                                                </div>
                                                <div className="grid grid-cols-1 gap-1">
                                                    {continent.countries?.slice(0, 5).map((country: any) => (
                                                        <Link
                                                            key={country._id}
                                                            href={`/regions/${continent.slug.current}/${country.slug.current}`}
                                                            className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-accent-foreground"
                                                        >
                                                            <div className="text-xs font-medium leading-none">{country.title}</div>
                                                        </Link>
                                                    ))}
                                                    {continent.countries && continent.countries.length > 5 && (
                                                        <Link
                                                            href={`/regions/${continent.slug.current}`}
                                                            className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-accent-foreground"
                                                        >
                                                            <div className="text-xs font-medium leading-none text-gray-500">...</div>
                                                        </Link>
                                                    )}
                                                    {(!continent.countries || continent.countries.length === 0) && (
                                                        <div className="text-xs text-gray-400 italic p-2">No countries listed</div>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                        {continents.length === 0 && (
                                            <li className="p-4 text-sm text-gray-500 italic">Loading regions...</li>
                                        )}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="hidden md:flex flex-row justify-end items-center gap-2 w-full lg:w-[90%] p-2 ">
                    <form className="flex flex-row gap-2 items-center border border-gray-800 p-1 rounded-md">
                        <Search size="20" className="text-gray-600" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-[150px] xl:w-[200px] border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                        />
                    </form>
                    <Button
                        variant="outline"
                        className="border-2 border-red-500 bg-red-400/10 font-semibold text-sm xl:text-lg text-red-500 hover:text-red-600 hover:bg-red-400/20"
                    >
                        JOIN NOW
                    </Button>
                </div>

                {/* Mobile Logo (Center) */}
                <div className="flex md:hidden absolute left-1/2 transform -translate-x-1/2">
                    <Link href="/">
                        <Image
                            src="/conflict-wire-logo.png"
                            alt="Logo"
                            width={70}
                            height={70}
                            className="object-contain"
                            priority
                            unoptimized
                        />
                    </Link>
                </div>

                {/* Mobile Menu Button - Shown when width <= 1024 or on small screens */}
                <Button
                    variant="default"
                    size="icon-lg"
                    className="md:hidden lg:hidden ml-auto rounded-full flex items-center justify-center bg-black text-white"
                    onClick={() => {
                        if (typeof window !== "undefined") {
                            window.dispatchEvent(new CustomEvent("openMobileMenu"));
                        }
                    }}
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </div>
        </nav>
    );
};

export default MainNav;
