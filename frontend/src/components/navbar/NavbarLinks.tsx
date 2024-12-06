import { Link } from "react-router-dom";


export const navbarLinks = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  {
    id: 1,
    name: "All Products",
    href: "/products/all",
  },
  {
    id: 2,
    name: "Men",
    href: "/products/men",
  },
  {
    id: 3,
    name: "Woman",
    href: "/products/women",
  },
];

export function NavbarLinks() {
  return (
    <div className="hidden md:flex justify-center items-center gap-x-4 ml-8">
      {navbarLinks.map((item) => (
        <Link to={item.href} key={item.id} className="font-medium">
          {item.name}
        </Link>
      ))}
    </div>
  );
}
