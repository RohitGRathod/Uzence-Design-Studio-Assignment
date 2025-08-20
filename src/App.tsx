import { useState } from "react";
import { InputField } from "./component/InputField/InputField";
import { DataTable} from "./component/DataTable/DataTable";
import type { Column } from "./component/DataTable/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

const data: User[] = [
  { id: 1, name: "Rohit", email: "rohit@example.com" },
  { id: 2, name: "Anita", email: "anita@example.com" },
  { id: 3, name: "Vikram", email: "vikram@example.com" },
];

function App() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-12 bg-gray-100 p-8">
      {/* InputField Demo */}
      <div className="w-full max-w-sm">
        <InputField
          label="Email"
          placeholder="Enter your email"
          helperText="We’ll never share your email."
          variant="outlined"
          size="md"
          clearable
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* DataTable Demo */}
      <div className="w-full max-w-2xl">
        <DataTable<User>
          data={data}
          columns={columns}
          selectable
          onRowSelect={(rows) => console.log("Selected rows:", rows)}
        />
      </div>
    </div>
  );
}

export default App;
