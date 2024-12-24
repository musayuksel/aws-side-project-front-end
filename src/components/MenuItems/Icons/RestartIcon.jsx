import "./IconStyle.css";

export const RestartIcon = ({ variantType, isFocused }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      className={`icon-${variantType} ${isFocused ? "focused" : ""}`}
    >
      <path
        fillRule="evenodd"
        d="M15.07 5h1.43C23.39 5 29 10.61 29 17.5S23.39 30 16.5 30 4 24.39 4 17.5h2C6 23.29 10.71 28 16.5 28S27 23.29 27 17.5 22.29 7 16.5 7h-1.43L17 10h-2.18l-3.09-4 3.09-4H17l-1.93 3ZM9.7 6l2.57 4h-2.18L7 6l3.09-4h2.18L9.7 6Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
