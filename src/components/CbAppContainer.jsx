import { SideMenu } from "./SideMenu";
import { mockData } from "../config/promos";
import { useCallback, useEffect, useRef, useState } from "react";

export const CbAppContainer = () => {
  const [focusedSection, setFocusedSection] = useState("promos");
  const [focusedIndex, setFocusedIndex] = useState(0); // Initialize focusedIndex
  const [focusedItem, setFocusedItem] = useState(null); // Stores the focused item object

  const menuItemsRef = useRef([]);
  const tabsRef = useRef([]);
  const promosRef = useRef([]);

  const promos = mockData.promoted;
  // Update URL hash whenever focusedSection or focusedIndex changes
  useEffect(() => {
    if (!focusedItem) return;
    const hash = `${focusedSection}-${focusedIndex}`;
    window.location.hash = hash;
  }, [focusedSection, focusedIndex, focusedItem]);

  const setMenuItemRef = useCallback((element, index) => {
    menuItemsRef.current[index] = element;
  }, []);

  const setTabRef = useCallback((element, index) => {
    tabsRef.current[index] = element;
  }, []);

  const setPromoRef = useCallback((element, index) => {
    promosRef.current[index] = element;
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      // Check if refs are populated AND if the focused section has elements
      if (
        !menuItemsRef.current ||
        !tabsRef.current ||
        !promosRef.current ||
        (focusedSection === "sideMenu" && menuItemsRef.current.length === 0) ||
        (focusedSection === "tabs" && tabsRef.current.length === 0) ||
        (focusedSection === "promos" && promosRef.current.length === 0)
      ) {
        return;
      }

      switch (focusedSection) {
        case "promos":
          switch (event.key) {
            case "ArrowLeft":
              if (focusedIndex > 0) {
                setFocusedIndex(focusedIndex - 1);
                setFocusedItem(promosRef.current[focusedIndex - 1]);
              } else {
                setFocusedSection("sideMenu");
                setFocusedIndex(0);
                setFocusedItem(menuItemsRef.current[0]);
              }
              break;
            case "ArrowRight":
              if (focusedIndex < promosRef.current.length - 1) {
                setFocusedIndex(focusedIndex + 1);
                setFocusedItem(promosRef.current[focusedIndex + 1]);
              }
              break;
            case "ArrowUp":
              setFocusedSection("tabs");
              setFocusedIndex(0);
              setFocusedItem(tabsRef.current[0]);
              break;
          }
          break;
        case "tabs":
          switch (event.key) {
            case "ArrowDown":
              setFocusedSection("promos");
              setFocusedIndex(0);
              setFocusedItem(promosRef.current[0]);
              break;
            case "ArrowLeft":
              if (focusedIndex > 0) {
                setFocusedIndex(focusedIndex - 1);
                setFocusedItem(tabsRef.current[focusedIndex - 1]);
              } else {
                setFocusedSection("sideMenu");
                setFocusedIndex(0);
                setFocusedItem(menuItemsRef.current[0]);
              }
              break;
            case "ArrowRight":
              if (focusedIndex < tabsRef.current.length - 1) {
                setFocusedIndex(focusedIndex + 1);
                setFocusedItem(tabsRef.current[focusedIndex + 1]);
              }
              break;
          }
          break;
        case "sideMenu":
          switch (event.key) {
            case "ArrowRight":
              setFocusedSection("tabs");
              setFocusedIndex(0);
              setFocusedItem(tabsRef.current[0]);
              break;
            case "ArrowDown":
              if (focusedIndex < menuItemsRef.current.length - 1) {
                setFocusedIndex(focusedIndex + 1);
                setFocusedItem(menuItemsRef.current[focusedIndex + 1]);
              }
              break;
            case "ArrowUp":
              if (focusedIndex > 0) {
                setFocusedIndex(focusedIndex - 1);
                setFocusedItem(menuItemsRef.current[focusedIndex - 1]);
              }
              break;
          }
          break;
      }
    },
    [focusedSection, focusedIndex, promos]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const [section, indexStr] = hash.substring(1).split("-");
        const index = parseInt(indexStr, 10);

        console.log({ section, index });
        if (section && !isNaN(index)) {
          setFocusedSection(section);
          setFocusedIndex(index);

          // Set focused item based on the parsed hash
          if (section === "promos" && promosRef.current[index]) {
            setFocusedItem(promosRef.current[index]);
          } else if (section === "tabs" && tabsRef.current[index]) {
            setFocusedItem(tabsRef.current[index]);
          } else if (section === "sideMenu" && menuItemsRef.current[index]) {
            setFocusedItem(menuItemsRef.current[index]);
          }
        }
      } else {
        setFocusedSection("promos");
        setFocusedIndex(0);
        setFocusedItem(promosRef.current[0]);
        // update hash to default
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Call on mount to handle initial hash

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []); // Empty dependency array to run only on mount/unmount

  useEffect(() => {
    // Focus the element AFTER state updates
    if (focusedItem) {
      focusedItem.focus();
    }
  }, [focusedItem]);

  return (
    <div className="menu-container" tabIndex={0}>
      <div className="side-menu">
        {["Item 1", "Item 2", "Item 3"].map((item, index) => (
          <div
            key={index}
            className="menu-item"
            ref={(element) => setMenuItemRef(element, index)}
            tabIndex={
              focusedSection === "sideMenu" && focusedIndex === index ? 0 : -1
            }
          >
            {item}
          </div>
        ))}
      </div>
      <div className="main-content">
        <div className="tabs">
          {["Popular", "Sport", "Live"].map((tab, index) => (
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
        <div className="promo-container">
          {promos.map((promo, index) => (
            <a
              key={promo.id}
              className="promo-card"
              ref={(element) => setPromoRef(element, index)}
              tabIndex={
                focusedSection === "promos" && focusedIndex === index ? 0 : -1
              }
            >
              {promo.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
