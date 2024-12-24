import { menuLinks } from "../../config/menuLinks";
import { IPlayerIcon, RestartIcon, SoundsIcon } from "./Icons";
import "./MenuItems.css";

const iconVariants = {
  restart: RestartIcon,
  iplayer: IPlayerIcon,
  sounds: SoundsIcon,
};

export const MenuItems = ({ focusedIndex, setMenuItemRef, focusedSection }) => {
  return (
    <nav className="menu-items-container">
      {menuLinks.map(({ title, variantType }, index) => {
        const IconComponent = iconVariants[variantType];

        return (
          <a
            key={index}
            className="menu-item"
            ref={(element) => setMenuItemRef(element, index)}
            tabIndex={
              focusedSection === "sideMenu" && focusedIndex === index ? 0 : -1
            }
          >
            <IconComponent
              variantType={variantType}
              isFocused={
                focusedSection === "sideMenu" && focusedIndex === index
              }
            />
            <span className="title">{title}</span>
          </a>
        );
      })}
    </nav>
  );
};
