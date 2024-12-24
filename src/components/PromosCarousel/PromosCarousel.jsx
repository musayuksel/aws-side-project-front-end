import { mockData } from "../../config/promos";
import "./PromosCarousel.css";

export const PromosCarousel = ({
  focusedIndex,
  setPromoRef,
  focusedSection,
}) => {
  const promos = mockData.promoted;

  return (
    <section className="promo-container">
      {promos.map(({ id, title }, index) => (
        <a
          key={id}
          className="promo-card"
          ref={(element) => setPromoRef(element, index)}
          tabIndex={
            focusedSection === "promos" && focusedIndex === index ? 0 : -1
          }
        >
          {title}
        </a>
      ))}
    </section>
  );
};
