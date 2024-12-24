import { menuLinks } from "../../config/menuLinks";
import "./MenuItems.css";

export const MenuItems = ({ focusedIndex, setMenuItemRef, focusedSection }) => {
  return (
    <nav className="menu-items-container">
      {menuLinks.map(({ title }, index) => (
        <a
          key={index}
          className="menu-item"
          ref={(element) => setMenuItemRef(element, index)}
          tabIndex={
            focusedSection === "sideMenu" && focusedIndex === index ? 0 : -1
          }
        >
          {title}
        </a>
      ))}
    </nav>
  );
};
