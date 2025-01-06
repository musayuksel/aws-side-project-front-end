import { useState } from "react";
import "./CategoryFilterTabs.css";

const categories = ["Most Popular", "Sport", "Live"];

export const CategoryFilter = ({ focusedIndex, setTabRef, focusedSection }) => {
  const [activeTab, setActiveTab] = useState(categories[0]);

  const handleClick = (event, tabText) => {
    event.preventDefault();
    setActiveTab(tabText);
    window.location.hash = "promos-0";
  };

  return (
    <div className="category-filter-container">
      {categories.map((tab, index) => (
        <a
          key={index}
          className={`tab ${activeTab === tab ? "active" : ""}`}
          ref={(element) => setTabRef(element, index)}
          tabIndex={
            focusedSection === "tabs" && focusedIndex === index ? 0 : -1
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleClick(event, tab);
            }
          }}
          href="#"
        >
          {tab}
        </a>
      ))}
    </div>
  );
};
