import { reversString } from "./util";

const argumentWithEvenSymbols = "qwer";
const argumentWithOddSymbols = "qwert";
const argumentWithOneSymbol = "q";
const argumentWithEmptyString = "";

const resultWithEvenSymbols = "rewq";
const resultWithOddSymbols = "trewq";
const resultWithOneSymbol = "q";
const resultWithEmptyString = "";

describe("Testing of reversString util", () => {
  it("Should be return correct reversed string for argument qwer", () => {
    expect(reversString(argumentWithEvenSymbols)).toEqual(resultWithEvenSymbols);
  });

  it("Should be return correct reversed string for argument qwert", () => {
    expect(reversString(argumentWithOddSymbols)).toEqual(resultWithOddSymbols);
  });

  it("Should be return correct reversed string for argument q", () => {
    expect(reversString(argumentWithOneSymbol)).toEqual(resultWithOneSymbol);
  });

  it("Should be return correct reversed empty string", () => {
    expect(reversString(argumentWithEmptyString)).toEqual(resultWithEmptyString);
  });
});
