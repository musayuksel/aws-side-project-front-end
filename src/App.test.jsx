import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
  test("should render initial text", () => {
    render(<App />);
    // press r to show content
    fireEvent.keyDown(document, { key: "r" });
    expect(screen.getByText("Most Popular")).toBeDefined();
  });

  // test("Counter should increment by one when clicked", () => {
  //   render(<App />);
  //   const counter = screen.getByRole("button");

  //   fireEvent.click(counter);

  //   expect(screen.getByText("count is: 1")).toBeDefined();
  // });
});
