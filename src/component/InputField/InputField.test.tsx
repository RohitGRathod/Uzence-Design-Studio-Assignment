import { render, screen } from "@testing-library/react";
import { InputField } from "./InputField";
import userEvent from "@testing-library/user-event";

test("renders label and input", () => {
  render(<InputField label="Name" placeholder="Enter name" />);
  expect(screen.getByLabelText("Name")).toBeInTheDocument();
});

test("displays error message", () => {
  render(<InputField label="Email" errorMessage="Invalid email" invalid />);
  expect(screen.getByText("Invalid email")).toBeInTheDocument();
});

test("handles input change", async () => {
  const handleChange = vi.fn();
  render(<InputField label="Test" onChange={handleChange} />);
  const input = screen.getByLabelText("Test");
  await userEvent.type(input, "abc");
  expect(handleChange).toHaveBeenCalled();
});
