"use client";

import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuContent,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface MainNavProps {
    pathname: string;
    worldTags: any[];
}

const MainNav = ({ pathname, worldTags }: MainNavProps) => {
    return (
        <nav className="w-full">
            <div className="flex w-full items-center justify-center">
                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-8">
                    <NavigationMenu>
                        <NavigationMenuList className="flex gap-8">
                            {[
                                { label: "Conflict", href: "/conflict" },
                                { label: "Humanitarian", href: "/humanitarian" },
                                { label: "Trade", href: "/trade" },
                                { label: "Geopolitics", href: "/geopolitics" },
                                { label: "Analysis", href: "/spaces" },
                            ].map((item) => (
                                <NavigationMenuItem key={item.label}>
                                    <Link
                                        href={item.href}
                                        className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${pathname === item.href ? 'text-red-600' : 'text-black hover:text-red-600 underline-offset-8 hover:underline'}`}
                                    >
                                        {item.label}
                                    </Link>
                                </NavigationMenuItem>
                            ))}

                            {/* WORLD / REGIONS Dropdown */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger
                                    className={`bg-transparent p-0 h-auto text-[11px] font-black uppercase tracking-[0.2em] hover:text-red-600 border-none shadow-none focus:bg-transparent data-[state=open]:bg-transparent ${pathname.startsWith('/regions') ? 'text-red-600' : 'text-black'}`}
                                >
                                    WORLD
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white border-b-8 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)]">
                                        {worldTags.map((tag: any) => (
                                            <li key={tag._id}>
                                                <Link
                                                    href={`/regions/${tag.slug.current}`}
                                                    className="block select-none space-y-1 p-3 leading-none no-underline outline-none transition-all hover:bg-gray-50 border border-transparent hover:border-gray-100"
                                                >
                                                    <div className="text-[10px] font-black uppercase tracking-widest text-black">{tag.title}</div>
                                                    {tag.description && (
                                                        <p className="line-clamp-1 text-[10px] text-gray-400 mt-1 uppercase tracking-tight">
                                                            {tag.description}
                                                        </p>
                                                    )}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </nav>
    );
};

export default MainNav;
