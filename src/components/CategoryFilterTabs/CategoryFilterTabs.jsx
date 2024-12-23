import "./CategoryFilterTabs.css";

export const CategoryFilter = ({ focusedIndex, setTabRef, focusedSection }) => {
  const categories = ["Popular", "Sport", "Live"];

  return (
    <div className="category-filter-container">
      {categories.map((tab, index) => (
        <a
          key={index}
          className="tab"
          ref={(element) => setTabRef(element, index)}
          tabIndex={
            focusedSection === "tabs" && focusedIndex === index ? 0 : -1
          }
        >
          {tab}
        </a>
      ))}
    </div>
  );
};
