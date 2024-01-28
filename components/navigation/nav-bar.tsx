'use client'
import Link from "next/link"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "../ui/menubar"


export default function NavBar() {
    const menuItems = [
        { label: "Home", href: "/" }
    ]
    return (
        <div className="container mx-auto px-6 md:px-8 lg:px-10 py-2">
            <div className="flex justify-between items-center">
                <div className="hidden md:flex space-x-8">
                    {menuItems.map((item, index) => (
                        <Link key={index} href={item.href}>
                            <span className="text-white">
                                {item.label}
                            </span>                        
                        </Link>
                    ))}
                </div>
                <Menubar className="md:hidden">
                    <MenubarMenu>
                        <MenubarTrigger>
                            <svg
                                className=" h-6 w-6"
                                fill="none"
                                height="24"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <line x1="4" x2="20" y1="12" y2="12" />
                                <line x1="4" x2="20" y1="6" y2="6" />
                                <line x1="4" x2="20" y1="18" y2="18" />
                            </svg>
                        </MenubarTrigger>
                        <MenubarContent>
                            {menuItems.map((item, index) => (
                                <Link key={index} href={item.href}>
                                    <MenubarItem key={index}>
                                        {item.label}
                                    </MenubarItem>
                                </Link>
                            ))}
                        </ MenubarContent>
                    </MenubarMenu>

                </Menubar>
            </div>
        </div>
    )
};