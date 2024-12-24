import { menuLinks } from "../../config/menuLinks";
import "./MenuItems.css";
import restartIcon from "../../assets/restartIcon.svg";

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
          <img
            src={restartIcon}
            alt="Restart Icon"
            className="menu-item-icon"
          />
          <span className="title">{title}</span>
        </a>
      ))}
    </nav>
  );
};
