"use client";

import { useState, useRef, useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { UserMenuProps } from "@/types/usermenu";

export default function UserMenu({ name }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
      >
        {name} {open ? <FaAngleUp className="ml-2" /> : <FaAngleDown className="ml-2" /> } 
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="block w-full rounded-md text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </button>
          </form>
        </div>
      )}
    </div>
  );
}