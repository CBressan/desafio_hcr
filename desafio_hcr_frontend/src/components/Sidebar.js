import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/questions">Perguntas</Link>
          </li>
          <li>
            <Link to="/businesses">Empresas</Link>
          </li>
          <li>
            <Link to="/group-business">Group Business</Link>
          </li>
        </ul>
      </nav>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Sidebar;
