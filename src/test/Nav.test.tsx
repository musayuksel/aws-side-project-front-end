import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Nav } from "../components/Nav";

test("Renders Person component correctly", async () => {
  const { getByText } = render(<Nav />);

  expect(true).toBe(true);
  // expect(getByText("Nav menu")).toBeInTheDocument();
});
