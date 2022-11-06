import renderer from "react-test-renderer";
import { Button } from "./button";

const mockTest = "Test text";

describe("Checking Button component with snapshot", () => {
  it("Button should be render with text", () => {
    const button = renderer.create(<Button text={mockTest} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Button should be render without text", () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Button should be render with disabled status", () => {
    const button = renderer.create(<Button disabled />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Button should be render with loader", () => {
    const button = renderer.create(<Button isLoader />).toJSON();
    expect(button).toMatchSnapshot();
  });
});
