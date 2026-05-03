jest.mock("../i18n", () => ({
  t: jest.fn((key) => "View Link"),
  use: jest.fn(function() { return this; }),
  init: jest.fn(function() { return this; }),
  changeLanguage: jest.fn(),
  language: 'en',
}));

jest.mock("../constants/translationLabels/common", () => ({
  COMMON_LINK_TO_MEETING_WORD: "common.link.to.meeting",
}));

// eslint-disable-next-line import/first
import { render, screen } from "@testing-library/react";
// eslint-disable-next-line import/first
import { COMMON_LINK_TO_MEETING_WORD } from "../constants/translationLabels/common";
// eslint-disable-next-line import/first
import { getHref } from "./getHref";
// eslint-disable-next-line import/first
import i18n from "../i18n";

describe("getHref function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Restore the return value after clearAllMocks
    i18n.t.mockImplementation((key) => "View Link");
  });

  describe("Positive scenarios", () => {
    it("should return link with href", () => {
      const link = "https://www.youtube.com/";
      render(getHref(link));
      const anchor = screen.getByTitle(link);
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute("href", link);
    });

    it("should correctly display link text from i18n", () => {
      const link = "https://google.com";
      render(getHref(link));
      const anchor = screen.getByText("View Link");
      expect(anchor).toBeInTheDocument();
      expect(i18n.t).toHaveBeenCalledWith(COMMON_LINK_TO_MEETING_WORD);
    });

    it("should open link in new tab", () => {
      const link = "https://example.com";
      render(getHref(link));
      const anchor = screen.getByTitle(link);
      expect(anchor).toHaveAttribute("target", "_blank");
      expect(anchor).toHaveAttribute("rel", "noreferrer");
    });

    it("should handle special characters in URL correctly", () => {
      const link = "https://example.com/path?query=1&name=test#anchor-1";
      render(getHref(link));
      const anchor = screen.getByTitle(link);
      expect(anchor).toHaveAttribute("href", link);
    });
  });

  describe("Edge cases and Negative scenarios", () => {
    it("should handle empty string without crashing", () => {
      const link = "";
      const { container } = render(getHref(link));
      const anchor = container.querySelector("a");
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute("href", "");
    });

    it("should apply correct CSS class", () => {
      const link = "https://example.com";
      render(getHref(link));
      const anchor = screen.getByTitle(link);
      expect(anchor).toHaveClass("link-to-meeting");
    });
  });
});