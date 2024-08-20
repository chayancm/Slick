import { ChevronDownIcon } from "@radix-ui/react-icons";
import { DropdownMenu, Theme } from "@radix-ui/themes";
import React from "react";
import { Link } from "react-router-dom";

const CategoryMenu = () => {
  return (
    <Theme>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="text-sm font-medium hover:underline ">
            Categories
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          align="start"
          className="w-48 bg-white shadow-lg rounded-md mt-2"
        >
          <DropdownMenu.Item>
            <Link to="/men" className="block px-4 py-2 text-sm hover:bg-muted">
              Men
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link
              to="/women"
              className="block px-4 py-2 text-sm hover:bg-muted"
            >
              Women
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link to="/kids" className="block px-4 py-2 text-sm hover:bg-muted">
              Kids
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link
              to="/accessories"
              className="block px-4 py-2 text-sm hover:bg-muted"
            >
              Accessories
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Theme>
  );
};

export default CategoryMenu;
