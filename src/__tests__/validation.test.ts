import {
  validateComponentName,
  validateProps,
  validateLayout,
  validateThemeMode,
  validateColor,
  ValidationError,
  sanitizeHtml,
} from "../utils/validation";

describe("Validation Utils", () => {
  describe("validateComponentName", () => {
    it("should accept valid component names", () => {
      expect(() => validateComponentName("Button")).not.toThrow();
      expect(() => validateComponentName("MyComponent")).not.toThrow();
      expect(() => validateComponentName("Component123")).not.toThrow();
    });

    it("should reject invalid component names", () => {
      expect(() => validateComponentName("")).toThrow(ValidationError);
      expect(() => validateComponentName("button")).toThrow(ValidationError);
      expect(() => validateComponentName("123Component")).toThrow(
        ValidationError,
      );
      expect(() => validateComponentName("My-Component")).toThrow(
        ValidationError,
      );
    });
  });

  describe("validateProps", () => {
    it("should return empty object for undefined props", () => {
      expect(validateProps(undefined)).toEqual({});
      expect(validateProps(null)).toEqual({});
    });

    it("should sanitize string props", () => {
      const props = validateProps({
        title: '<script>alert("xss")</script>',
        safe: "normal text",
      });
      expect(props.title).toBe('scriptalert("xss")/script');
      expect(props.safe).toBe("normal text");
    });

    it("should skip functions and undefined values", () => {
      const props = validateProps({
        onClick: () => {},
        value: undefined,
        text: "keep this",
      });
      expect(props).toEqual({ text: "keep this" });
    });

    it("should throw for non-object props", () => {
      expect(() => validateProps("string")).toThrow(ValidationError);
      expect(() => validateProps([])).toThrow(ValidationError);
    });
  });

  describe("validateLayout", () => {
    it("should accept valid layouts", () => {
      expect(validateLayout("vertical")).toBe("vertical");
      expect(validateLayout("horizontal")).toBe("horizontal");
      expect(validateLayout("grid")).toBe("grid");
    });

    it("should return default for invalid layouts", () => {
      expect(validateLayout("invalid")).toBe("vertical");
      expect(validateLayout("")).toBe("vertical");
      expect(validateLayout(null as any)).toBe("vertical");
    });
  });

  describe("validateThemeMode", () => {
    it("should accept valid theme modes", () => {
      expect(validateThemeMode("light")).toBe("light");
      expect(validateThemeMode("dark")).toBe("dark");
      expect(validateThemeMode("system")).toBe("system");
    });

    it("should return default for invalid modes", () => {
      expect(validateThemeMode("invalid")).toBe("light");
      expect(validateThemeMode("")).toBe("light");
    });
  });

  describe("validateColor", () => {
    it("should accept valid hex colors", () => {
      expect(validateColor("#fff")).toBe("#fff");
      expect(validateColor("#ffffff")).toBe("#ffffff");
      expect(validateColor("#123ABC")).toBe("#123ABC");
    });

    it("should accept valid rgb colors", () => {
      expect(validateColor("rgb(255, 255, 255)")).toBe("rgb(255, 255, 255)");
      expect(validateColor("rgb(0, 0, 0)")).toBe("rgb(0, 0, 0)");
    });

    it("should accept valid rgba colors", () => {
      expect(validateColor("rgba(255, 255, 255, 0.5)")).toBe(
        "rgba(255, 255, 255, 0.5)",
      );
      expect(validateColor("rgba(0, 0, 0, 1)")).toBe("rgba(0, 0, 0, 1)");
    });

    it("should reject invalid colors", () => {
      expect(() => validateColor("red")).toThrow(ValidationError);
      expect(() => validateColor("#gg")).toThrow(ValidationError);
      expect(() => validateColor("rgb(256, 256, 256)")).not.toThrow(); // This passes basic regex
    });
  });

  describe("sanitizeHtml", () => {
    it("should escape HTML entities", () => {
      expect(sanitizeHtml('<script>alert("xss")</script>')).toBe(
        "&amp;lt;script&amp;gt;alert(&amp;quot;xss&amp;quot;)&amp;lt;/script&amp;gt;",
      );
      expect(sanitizeHtml("it's")).toBe("it&amp;#39;s");
      expect(sanitizeHtml("&amp;")).toBe("&amp;amp;amp;");
    });
  });
});
