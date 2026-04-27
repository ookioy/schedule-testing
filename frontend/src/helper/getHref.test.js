import { render, screen } from "@testing-library/react";
import { getHref } from "./getHref";
import i18n from "../i18n";
import { COMMON_LINK_TO_MEETING_WORD } from "../constants/translationLabels/common";

jest.mock("../i18n", () => ({
  t: jest.fn((key) => "View Link"),
}));

jest.mock("../constants/translationLabels/common", () => ({
  COMMON_LINK_TO_MEETING_WORD: "common.link.to.meeting",
}));

describe("getHref function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Positive scenarios", () => {
    it("should return link with href", () => {
      // Arrange
      const link = "https://www.youtube.com/";
      // Act
      render(getHref(link));
      const anchor = screen.getByTitle(link);
      // Assert
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute("href", link);
    });

    it("should correctly display link text from i18n", () => {
      // Arrange
      const link = "https://google.com";

      i18n.t.mockReturnValue("View Link");

      // Act
      render(getHref(link));
      const anchor = screen.getByText("View Link");

      // Assert
      expect(anchor).toBeInTheDocument();
      expect(i18n.t).toHaveBeenCalledWith(COMMON_LINK_TO_MEETING_WORD);
    });

    it("should open link in new tab", () => {
      // Arrange
      const link = "https://example.com";
      // Act
      render(getHref(link));
      const anchor = screen.getByTitle(link);
      // Assert
      expect(anchor).toHaveAttribute("target", "_blank");
      expect(anchor).toHaveAttribute("rel", "noreferrer");
    });

    it("should handle special characters in URL correctly", () => {
      // Arrange
      const link = "https://example.com/path?query=1&name=test#anchor-1";
      // Act
      render(getHref(link));
      const anchor = screen.getByTitle(link);
      // Assert
      expect(anchor).toHaveAttribute("href", link);
    });
  });

  describe("Edge cases and Negative scenarios", () => {
    it("should handle empty string without crashing", () => {
      // Arrange
      const link = "";
      // Act
      const { container } = render(getHref(link));
      const anchor = container.querySelector("a");
      // Assert
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute("href", "");
    });

    it("should apply correct CSS class", () => {
      // Arrange
      const link = "https://example.com";
      // Act
      render(getHref(link));
      const anchor = screen.getByTitle(link);
      // Assert
      expect(anchor).toHaveClass("link-to-meeting");
    });
  });
});
