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
    worldTags: any[];
    getNavLinkClass: (href: string) => string;
}

const MainNav = ({ pathname, worldTags, getNavLinkClass }: MainNavProps) => {
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
                                        {worldTags.map((tag) => (
                                            <li key={tag._id}>
                                                <Link
                                                    href={`/regions/${tag.slug.current}`}
                                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-red-600"
                                                >
                                                    <div className="text-sm font-bold uppercase tracking-tight">{tag.title}</div>
                                                    {tag.description && (
                                                        <p className="line-clamp-2 text-xs leading-snug text-gray-500 mt-1">
                                                            {tag.description}
                                                        </p>
                                                    )}
                                                </Link>
                                            </li>
                                        ))}
                                        {worldTags.length === 0 && (
                                            <li className="p-4 text-sm text-gray-500 italic">No world tags found...</li>
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
                    {/* Hide JOIN NOW for early stage/waitlist as requested by user */}
                    {/* 
                    <Button
                        variant="outline"
                        className="border-2 border-red-500 bg-red-400/10 font-semibold text-sm xl:text-lg text-red-500 hover:text-red-600 hover:bg-red-400/20"
                    >
                        JOIN NOW
                    </Button>
                    */}
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
