import Link from "next/link";
import css from "./Sidebar.module.css";

const NotesSidebar = async () => {
  const localTags = [
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
    "Ideas",
    "Travel",
    "Finance",
    "Health",
    "Important",
    "Todo",
  ];

  return (
    <ul className={css.menuList}>
      {localTags.map((category) => (
        <li key={category} className={css.menuItem}>
          <Link href={`/notes/filter/${category}`} className={css.menuLink}>
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default NotesSidebar;
