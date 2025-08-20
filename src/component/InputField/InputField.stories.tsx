import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";
import type { InputFieldProps } from "./InputField";
import { useState } from "react";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
};

export default meta;
type Story = StoryObj<typeof InputField>;

// 🔹 Wrapper for controlled stories
const ControlledTemplate = (args: InputFieldProps) => {
  const [val, setVal] = useState("");
  return (
    <InputField
      {...args}
      value={val}
      onChange={(e) => setVal(e.target.value)}
    />
  );
};

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    helperText: "This will be visible to others",
    variant: "outlined",
    size: "md",
  },
  render: (args) => <ControlledTemplate {...args} />,
};

export const Error: Story = {
  args: {
    label: "Email",
    placeholder: "Enter email",
    errorMessage: "Invalid email address",
    invalid: true,
  },
  render: (args) => <ControlledTemplate {...args} />,
};

export const Clearable: Story = {
  args: {
    label: "Search",
    placeholder: "Type something...",
    clearable: true,
    variant: "outlined",
    size: "md",
  },
  render: (args) => <ControlledTemplate {...args} />,
};

export const PasswordToggle: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    showPasswordToggle: true,
    variant: "outlined",
    size: "md",
  },
  render: (args) => <ControlledTemplate {...args} />,
};
