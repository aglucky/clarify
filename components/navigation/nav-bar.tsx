'use client'
import Link from "next/link"



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
            </div>
        </div>
    )
};