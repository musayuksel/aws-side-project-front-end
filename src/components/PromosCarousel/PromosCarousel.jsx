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
      {promos.map(({ id, title, subtitle, image }, index) => (
        <a
          key={id}
          className="promo-card"
          ref={(element) => setPromoRef(element, index)}
          tabIndex={
            focusedSection === "promos" && focusedIndex === index ? 0 : -1
          }
        >
          <section className="preview-container">
            <img src={image} alt={title} />
          </section>
          <section className="footer">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </section>
        </a>
      ))}
    </section>
  );
};
