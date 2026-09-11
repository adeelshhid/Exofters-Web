import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductFullPreview } from "./Admin";

jest.mock("../../lib/firebase", () => ({ auth: {}, storage: {} }));
jest.mock("../../content/ContentProvider", () => ({ useContent: () => ({ products: [] }) }));
jest.mock("firebase/auth", () => ({}));
jest.mock("firebase/storage", () => ({}));

test("preview renders paired screenshots and updates the dedicated card thumbnail", () => {
  const product = { id: "demo", name: "Demo", thumbnailUrl: "/thumbnail.webp",
    page: { screenshots: [{ id: "screen", title: "Shared screen", desktopImageUrl: "/desktop.webp", mobileImageUrl: "/mobile.webp" }] } };
  const view = render(<MemoryRouter><ProductFullPreview draft={product} /></MemoryRouter>);
  const frame = screen.getByTitle("Live product preview");
  // jsdom does not parse iframe srcDoc; supply the browser-created portal root.
  frame.contentDocument.body.innerHTML = '<div id="preview-root"></div>';
  fireEvent.load(frame);
  const preview = within(frame.contentDocument.body);
  expect(preview.getByRole("heading", { name: "Shared screen" })).toBeInTheDocument();
  fireEvent.click(preview.getByRole("tab", { name: /Mobile/ }));
  expect(preview.getByAltText("Shared screen")).toHaveAttribute("src", "/mobile.webp");
  fireEvent.click(screen.getByRole("button", { name: "Product card" }));
  expect(frame.contentDocument.querySelector(".product-card").style.getPropertyValue("--product-screenshot")).toContain("/thumbnail.webp");
  view.rerender(<MemoryRouter><ProductFullPreview draft={{ ...product, name: "Updated", thumbnailUrl: "/updated.webp" }} /></MemoryRouter>);
  expect(preview.getByRole("heading", { name: "Updated" })).toBeInTheDocument();
  expect(frame.contentDocument.querySelector(".product-card").style.getPropertyValue("--product-screenshot")).toContain("/updated.webp");
});
