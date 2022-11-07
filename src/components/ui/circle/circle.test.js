import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Checking Circle component with snapshot", () => {
  it("Circle should be render without letters", () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle should be render with letter", () => {
    const circle = renderer.create(<Circle letter="A" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle should be render with head", () => {
    const circle = renderer.create(<Circle head="A" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle should be render with react-element into the head", () => {
    const circle = renderer.create(<Circle head={<Circle letter="A" />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle should be render with tail", () => {
    const circle = renderer.create(<Circle tail="Z"/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle should be render with react-element into the tail", () => {
    const circle = renderer.create(<Circle tail={<Circle letter="Z" />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle should be render with index", () => {
    const circle = renderer.create(<Circle index={1} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle should be render with prop isSmall", () => {
    const circle = renderer.create(<Circle isSmall />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle should be render with default state", () => {
    const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle should be render with changing state", () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle should be render with modified state", () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
});
