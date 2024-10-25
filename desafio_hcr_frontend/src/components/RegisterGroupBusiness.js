import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function RegisterGroupBusiness() {
  const [formData, setFormData] = useState({
    name: "",
    corporate_name: "",
    doc_number: "",
    phone: "",
    email: "",
    password: "",
    country: "",
    postal_code: "",
    address: "",
    num_address: "",
    city: "",
    state: "",
    complement: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/group-businesses/", formData);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar Group Business:", error);
    }
  };

  return (
    <div>
      <h2>Cadastrar Group Business</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Razão Social</label>
          <input
            type="text"
            name="corporate_name"
            value={formData.corporate_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>CNPJ</label>
          <input
            type="text"
            name="doc_number"
            value={formData.doc_number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Telefone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>País</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>CEP</label>
          <input
            type="text"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Endereço</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Número</label>
          <input
            type="number"
            name="num_address"
            value={formData.num_address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Cidade</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Estado</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Complemento</label>
          <input
            type="text"
            name="complement"
            value={formData.complement}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default RegisterGroupBusiness;
