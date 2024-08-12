import { House, CircleCheck } from "lucide-react";
import Link from "next/link";

export default function SideNav() {
  const navigationLink = [
    { name: "Home", icon: House, directory: "/" },
    { name: "My Tasks", icon: CircleCheck, directory: "/" },
  ];

  return (
    <aside className="w-64 fixed h-screen border-r">
      <h1 className="mx-auto text-center my-4 font-bold text-lg">Todo App</h1>

      <ul className="px-8 space-y-4">
        {navigationLink.map((link) => (
          <li className="w-full ">
            <Link href={link.directory} className="flex gap-2 font-semibold  ">
              <link.icon className="inline-block" />
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
