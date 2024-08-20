import * as Dialog from "@radix-ui/react-dialog";
import { HamburgerMenuIcon as MenuIcon } from "@radix-ui/react-icons";

import { Link } from "react-router-dom";
import { MountainIcon } from "./MountainIcon";
import CategoryMenu from "./CategoryMenu";
const Navbar = () => {
  return (
    <div className="container px-4  flex items-center h-16 w-full">
      <Link to="/" className="flex items-center gap-2">
        <MountainIcon className="h-6 w-6" />
        <span className="font-semibold text-lg">Slick</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4">
        <div className="hidden md:flex flex-row  gap-5">
          <CategoryMenu />
          <Link to="/about" className="text-sm font-medium hover:underline">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:underline">
            Contact
          </Link>
        </div>
        <Dialog.Root>
          <Dialog.Trigger>
            <button className="md:hidden lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only right-0">Toggle menu</span>
            </button>
          </Dialog.Trigger>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-20" />
          <Dialog.Content className="fixed right-0 top-0 bottom-0 w-3/4 max-w-xs bg-white p-4 z-20">
            <div className="grid gap-4 ">
              <CategoryMenu />

              <Link to="/about" className="text-sm font-medium hover:underline">
                About
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium hover:underline"
              >
                Contact
              </Link>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </nav>
    </div>
  );
};

export default Navbar;
