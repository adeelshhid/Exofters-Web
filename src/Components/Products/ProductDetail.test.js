import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductPage } from "./ProductDetail";
import { normalizeScreenshots } from "./screenshots";

jest.mock("../../content/ContentProvider", () => ({ useContent: jest.fn() }));

const product = {
  name: "Test product",
  page: { screenshots: [
    { id: "one", title: "First", desktopImageUrl: "/one.webp", mobileImageUrl: "/phone.webp" },
    { id: "two", title: "Second", desktopImageUrl: "/two.webp" },
  ] },
};

test("paired uploads display and advance automatically even while hovered", () => {
  jest.useFakeTimers();
  render(<MemoryRouter><ProductPage product={product} /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: "First" })).toBeInTheDocument();
  fireEvent.mouseEnter(document.getElementById("screens"));
  act(() => jest.advanceTimersByTime(5200));
  expect(screen.getByRole("heading", { name: "Second" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Pause slideshow" }));
  act(() => jest.advanceTimersByTime(10400));
  expect(screen.getByRole("heading", { name: "Second" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Resume slideshow" }));
  act(() => jest.advanceTimersByTime(5200));
  expect(screen.getByRole("heading", { name: "First" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("tab", { name: /Mobile/ }));
  expect(screen.getByAltText("First")).toHaveAttribute("src", "/phone.webp");
  jest.useRealTimers();
});

test("adding a second device preserves the original legacy screenshot", () => {
  expect(normalizeScreenshots([{ id: "old", device: "desktop", imageUrl: "/old.png", mobileImageUrl: "/new.webp" }]).map(shot => shot.imageUrl)).toEqual(["/old.png", "/new.webp"]);
});
