import { useEffect, useState } from "react";
import API from "../api";
import Table from "../components/Table";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/events").then((res) => setEvents(res.data));
  }, []);

  return (
    <div>
      <h2>Events</h2>
      <Table
        data={events}
        columns={["title", "date", "description", "society", "participants"]}
      />
    </div>
  );
}
