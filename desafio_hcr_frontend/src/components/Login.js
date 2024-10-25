import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { isValidJwt, setAuthToken } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/questions");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let token = localStorage.getItem("token");
      if (token) {
        localStorage.removeItem("token");
      }
      const response = await api.post("/login/", {
        email: email,
        password: password,
      });
      token = response.data.access_token;
      if (isValidJwt(token)) {
        localStorage.setItem("token", token);
        setAuthToken(token);
        navigate("/questions");
      } else {
        console.error("Token recebido é inválido");
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const handleRegisterGroupBusiness = () => {
    navigate("/register-group-business");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {/* Botão para cadastrar Group Business */}
      <button onClick={handleRegisterGroupBusiness}>
        Cadastrar Group Business
      </button>
    </div>
  );
}

export default Login;
