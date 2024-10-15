import { add } from "./add";

describe("String Calculator", () => {
  it("should return 0 for an empty string", () => {
    expect(add("")).toBe(0);
  });

  it("should return the number when only one number is passed", () => {
    expect(add("5")).toBe(5);
  });

  it("should return the sum of two comma-separated numbers", () => {
    expect(add("1,2")).toBe(3);
  });

  it("should return the sum of multiple comma-separated numbers", () => {
    expect(add("1,2,4")).toBe(7);
  });

  it("should handle newlines as delimiters", () => {
    expect(add("1\n2,3")).toBe(6);
  });

  it("should handle custom delimiters", () => {
    expect(add("//;\n2;4")).toBe(6);
  });

  it("should throw an exception when negative numbers are passed", () => {
    expect(() => add("1,-2")).toThrowError(
      /^negative numbers not allowed: -2$/
    );
  });

  it("should throw an exception when negative numbers are passed listing all the negative numbers", () => {
    expect(() => add("1,-2,-3")).toThrow(
      /^negative numbers not allowed: -2,-3$/
    );
  });

  it("should return the sum of numbers ignoring numbers bigger than 1000", () => {
    expect(add("1,2,1001")).toBe(3);
  });

  it("should handle custom delimiters of any length", () => {
    expect(add("//[***]\n1***2***3")).toBe(6);
  });
});
