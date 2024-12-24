export const IPlayerIcon = ({ variantType, isFocused }) => {
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
        fill="#CD2974"
        d="M9.607 24.349h-5.58a.165.165 0 0 1-.164-.165V7.688a.165.165 0 0 1 .164-.165h5.58a.16.16 0 0 1 .115.049c.03.03.049.07.049.116v16.496a.165.165 0 0 1-.164.165Z"
      ></path>
      <path
        fill="#EB468A"
        d="m25.303 15.403 2.812-4.876a.165.165 0 0 0 .017-.126.164.164 0 0 0-.077-.1L13.73 2.021a.165.165 0 0 0-.226.06l-2.812 4.876a.169.169 0 0 0-.017.126c.01.041.037.078.077.101l14.326 8.279a.164.164 0 0 0 .225-.06v-.001Z"
      ></path>
      <path
        fill="#AF105B"
        d="m25.303 16.596 2.812 4.876a.16.16 0 0 1 .017.126.164.164 0 0 1-.077.1l-14.325 8.28a.165.165 0 0 1-.226-.06l-2.812-4.876a.169.169 0 0 1-.017-.126.164.164 0 0 1 .077-.101l14.326-8.279a.165.165 0 0 1 .225.06Z"
      ></path>
    </svg>
  );
};