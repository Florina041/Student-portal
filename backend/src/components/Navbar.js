import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{
      padding: "10px",
      backgroundColor: "#1976d2",
      color: "white",
      display: "flex",
      gap: "20px"
    }}>
      <Link to="/users" style={{ color: "white", textDecoration: "none" }}>Users</Link>
      <Link to="/societies" style={{ color: "white", textDecoration: "none" }}>Societies</Link>
      <Link to="/events" style={{ color: "white", textDecoration: "none" }}>Events</Link>
    </nav>
  );
}
