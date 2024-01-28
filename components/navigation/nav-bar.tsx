'use client'
import Link from "next/link";

export default function NavBar() {

  const menuItems = [
    { label: "Home", href: "/" },
  ];

  return (
    <nav>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex' }}>
        {menuItems.map((item, index) => (
          <li key={index} style={{ marginRight: 10 }}>
            <Link href={item.href} style={{ textDecoration: 'none', color: 'black' }}>
                {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};