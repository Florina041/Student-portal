import { useEffect, useState } from "react";
import API from "../api";
import Table from "../components/Table";

export default function Societies() {
  const [societies, setSocieties] = useState([]);

  useEffect(() => {
    API.get("/societies").then((res) => setSocieties(res.data));
  }, []);

  return (
    <div>
      <h2>Societies</h2>
      <Table
        data={societies}
        columns={["name", "description", "lead","membersCount"]}
      />
    </div>
  );
}
