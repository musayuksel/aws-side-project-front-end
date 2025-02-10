import { MenuItems } from "../MenuItems";
import { mockData } from "../../config/promos";
import { useCallback, useEffect, useRef, useState } from "react";
import "./CbAppContainer.css";
import { CategoryFilter } from "../CategoryFilterTabs";
import { PromosCarousel } from "../PromosCarousel";
import videoBg from "../../assets/olympics-bg-vid.mp4";
import { usePromos } from "../../hooks/usePromos";

const categories = ["Most Popular", "Sport", "Films"];

export const CbAppContainer = () => {
  const [focusedSection, setFocusedSection] = useState("promos");
  const [focusedIndex, setFocusedIndex] = useState(0); // Initialize focusedIndex
  const [focusedItem, setFocusedItem] = useState(null); // Stores the focused item object
  const [showContent, setShowContent] = useState(false); // State for showing/hiding content
  const [activeTab, setActiveTab] = useState(categories[0]);

  const [menuVisible, setMenuVisible] = useState(false);

  const menuItemsRef = useRef([]);
  const tabsRef = useRef([]);
  const promosRef = useRef([]);

  const { promoData, loading, error } = usePromos("bbc_scotland");
  // if (loading) return <p>Loading promos...</p>;
  // if (error) return <p>Error: {error.message}</p>;

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
      event.preventDefault();
      if (event.key === "r") {
        setShowContent(true); // Toggle content visibility
        setTimeout(() => setMenuVisible(true), 0); // Then trigger transition (important!)
        window.location.hash = "promos-0"; // Reset hash to default
        return; // Prevent default arrow key behavior when 'r' is pressed
      }

      if (event.key === "Backspace") {
        setMenuVisible(false); //
        setTimeout(() => setShowContent(false), 500); // Hide content after transition
        window.location.hash = ""; // Reset hash to default
        return;
      }

      // if (!showContent) return;

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
    [focusedSection, focusedIndex, promos, showContent]
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
  }, []);

  useEffect(() => {
    // Focus the element AFTER state updates
    if (focusedItem && showContent) {
      focusedItem.focus();
    }
  }, [focusedItem, showContent]);

  return (
    <div className="app-container">
      <video playsInline autoPlay muted loop id="bgvid" className={"bgvideo"}>
        {/* <source src={videoBg} type="video/mp4" /> */}
      </video>
      {showContent && (
        <>
          <div className="dimmer" />
          <div
            className={`menu-container ${menuVisible ? "slide-in" : ""}`}
            tabIndex={0}
          >
            <MenuItems
              focusedIndex={focusedIndex}
              setMenuItemRef={setMenuItemRef}
              focusedSection={focusedSection}
            />

            <div className="main-content">
              <CategoryFilter
                focusedIndex={focusedIndex}
                setTabRef={setTabRef}
                focusedSection={focusedSection}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                categories={categories}
              />
              <PromosCarousel
                focusedIndex={focusedIndex}
                setPromoRef={setPromoRef}
                focusedSection={focusedSection}
                activeTab={activeTab}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
