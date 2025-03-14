import { useState, useEffect, useCallback, useRef } from "react";

export const useKeyAndHashHandlers = ({
  promos,
  menuItemsRef,
  tabsRef,
  promosRef,
}) => {
  // Internal states
  const [focusedSection, setFocusedSection] = useState("promos");
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [focusedItem, setFocusedItem] = useState(null);
  const [showContent, setShowContent] = useState(false);

  // Key handling logic
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "r") {
        setShowContent(true);
        window.location.hash = "promos-0";
        return;
      }

      if (event.key === "Backspace") {
        setShowContent(false);
        window.location.hash = "";
        return;
      }

      const refMap = {
        promos: promosRef,
        tabs: tabsRef,
        sideMenu: menuItemsRef,
      };

      if (!refMap[focusedSection]?.current.length) return;

      const updateFocus = (newSection, newIndex) => {
        setFocusedSection(newSection);
        setFocusedIndex(newIndex);
        setFocusedItem(refMap[newSection].current[newIndex]);
      };

      switch (focusedSection) {
        case "promos":
          if (event.key === "ArrowLeft" && focusedIndex > 0) {
            updateFocus("promos", focusedIndex - 1);
          } else if (
            event.key === "ArrowRight" &&
            focusedIndex < promos.length - 1
          ) {
            updateFocus("promos", focusedIndex + 1);
          } else if (event.key === "ArrowUp") {
            updateFocus("tabs", 0);
          } else if (event.key === "ArrowDown") {
            updateFocus("sideMenu", 0);
          }
          break;
        case "tabs":
          if (event.key === "ArrowLeft" && focusedIndex > 0) {
            updateFocus("tabs", focusedIndex - 1);
          } else if (
            event.key === "ArrowRight" &&
            focusedIndex < tabsRef.current.length - 1
          ) {
            updateFocus("tabs", focusedIndex + 1);
          } else if (event.key === "ArrowUp") {
            updateFocus("sideMenu", 0);
          } else if (event.key === "ArrowDown") {
            updateFocus("promos", 0);
          }
          break;
        case "sideMenu":
          if (
            event.key === "ArrowDown" &&
            focusedIndex < menuItemsRef.current.length - 1
          ) {
            updateFocus("sideMenu", focusedIndex + 1);
          } else if (event.key === "ArrowUp" && focusedIndex > 0) {
            updateFocus("sideMenu", focusedIndex - 1);
          } else if (event.key === "ArrowRight") {
            updateFocus("tabs", 0);
          }
          break;
        default:
          break;
      }
    },
    [focusedSection, focusedIndex, promos]
  );

  // Hash synchronization logic
  useEffect(() => {
    if (!focusedItem) return;

    const hash = `${focusedSection}-${focusedIndex}`;
    window.location.hash = hash;
  }, [focusedSection, focusedIndex, focusedItem]);

  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.substring(1);
    const [section, indexStr] = hash.split("-");
    const index = parseInt(indexStr, 10);

    if (section && !isNaN(index)) {
      setFocusedSection(section);
      setFocusedIndex(index);

      const refMap = {
        promos: promosRef,
        tabs: tabsRef,
        sideMenu: menuItemsRef,
      };

      const newItem = refMap[section]?.current[index];
      if (newItem) setFocusedItem(newItem);
    }
  }, [menuItemsRef, promosRef, tabsRef]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [handleKeyDown, handleHashChange]);

  return {
    focusedSection,
    focusedIndex,
    focusedItem,
    showContent,
    setShowContent,
  };
};
