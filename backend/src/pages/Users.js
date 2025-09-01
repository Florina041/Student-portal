import { useEffect, useState } from "react";
import API from "../api";
import Table from "../components/Table";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <Table data={users} columns={["name", "email", "role"]} />
    </div>
  );
}
