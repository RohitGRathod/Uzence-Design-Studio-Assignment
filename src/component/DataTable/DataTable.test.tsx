import { render, screen, fireEvent } from "@testing-library/react";
import { DataTable} from "./DataTable";
import type { Column } from "./DataTable";

interface User {
  id: number;
  name: string;
}

const columns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
];

const data: User[] = [
  { id: 1, name: "Rohit" },
  { id: 2, name: "Anita" },
];

test("renders table with data", () => {
  render(<DataTable data={data} columns={columns} />);
  expect(screen.getByText("Rohit")).toBeInTheDocument();
  expect(screen.getByText("Anita")).toBeInTheDocument();
});

test("shows empty state", () => {
  render(<DataTable data={[]} columns={columns} />);
  expect(screen.getByText("No data available")).toBeInTheDocument();
});

test("allows row selection", () => {
  const onRowSelect = vi.fn();
  render(<DataTable data={data} columns={columns} selectable onRowSelect={onRowSelect} />);
  const checkbox = screen.getAllByRole("checkbox")[0];
  fireEvent.click(checkbox);
  expect(onRowSelect).toHaveBeenCalled();
});

test("allows sorting", () => {
  render(<DataTable data={data} columns={columns} />);
  const header = screen.getByText("ID");
  fireEvent.click(header);
  expect(header).toHaveTextContent("▲");
  fireEvent.click(header);
  expect(header).toHaveTextContent("▼");
});
