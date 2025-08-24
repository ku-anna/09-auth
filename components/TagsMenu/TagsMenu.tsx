"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import css from "./TagsMenu.module.css";
import Link from "next/link";
import { tags } from "../../lib/api/api";

const TagsMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className={css.menuContainer} ref={menuRef}>
      <button
        className={css.menuButton}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        Notes ▾
      </button>

      {open && (
        <ul className={css.menuList}>
          {tags.map((tagName) => (
            <li key={tagName} className={css.menuItem}>
              <Link href={`/notes/filter/${tagName}`} className={css.menuLink}>
                {tagName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
