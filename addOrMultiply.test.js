import { addOrMultiply } from "./addOrMultiply";

describe("String Calculator", () => {
  it("should return 0 for an empty string", () => {
    expect(addOrMultiply("")).toBe(0);
  });

  it("should return the number when only one number is passed", () => {
    expect(addOrMultiply("5")).toBe(5);
  });

  it("should return the sum of two comma-separated numbers", () => {
    expect(addOrMultiply("1,2")).toBe(3);
  });

  it("should return the sum of multiple comma-separated numbers", () => {
    expect(addOrMultiply("1,2,4")).toBe(7);
  });

  it("should handle newlines as delimiters", () => {
    expect(addOrMultiply("1\n2,3")).toBe(6);
  });

  it("should handle custom delimiters", () => {
    expect(addOrMultiply("//;\n2;4")).toBe(6);
  });

  it("should throw an exception when negative numbers are passed", () => {
    expect(() => addOrMultiply("1,-2")).toThrowError(
      /^negative numbers not allowed: -2$/
    );
  });

  it("should throw an exception when negative numbers are passed listing all the negative numbers", () => {
    expect(() => addOrMultiply("1,-2,-3")).toThrow(
      /^negative numbers not allowed: -2,-3$/
    );
  });

  it("should return the sum of numbers ignoring numbers bigger than 1000", () => {
    expect(addOrMultiply("1,2,1001")).toBe(3);
  });

  it("should handle custom delimiters of any length", () => {
    expect(addOrMultiply("//[***]\n1***2***3")).toBe(6);
  });

  it("should handle multiple delimiters", () => {
    expect(addOrMultiply("//[*][%]\n1*2%3")).toBe(6);
  });

  it("should multiply the numbers if delimiter is asterisk", () => {
    expect(addOrMultiply("//[*]\n2*3")).toBe(6);
  });
});
