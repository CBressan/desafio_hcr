import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

function Businesses() {
  const [businesses, setBusinesses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const getGroupBusinessId = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.group_business_id;
    }
    return null;
  };

  const fetchBusinesses = async () => {
    const groupBusinessId = getGroupBusinessId();
    if (!groupBusinessId) {
      console.error("Group Business ID não encontrado no JWT.");
      return;
    }

    try {
      const response = await api.get(
        `/businesses/?group_business_id=${groupBusinessId}`
      );
      setBusinesses(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);
    }
  };

  const handleEditBusiness = (id) => {
    navigate(`/edit-business/${id}`);
  };

  const handleDeleteBusiness = async (id) => {
    if (window.confirm("Tem certeza de que deseja excluir esta empresa?")) {
      try {
        await api.delete(`/businesses/${id}/`);

        fetchBusinesses();
      } catch (error) {
        console.error("Erro ao excluir empresa:", error);
      }
    }
  };

  const handleRegisterBusiness = () => {
    navigate("/register-business");
  };

  return (
    <div>
      <h1>Empresas</h1>

      {businesses.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CNPJ</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((business) => (
              <tr key={business.id}>
                <td>{business.id}</td>
                <td>{business.name}</td>
                <td>{business.doc_number}</td>
                <td>{business.email}</td>
                <td>{business.phone}</td>
                <td>
                  <button onClick={() => handleEditBusiness(business.id)}>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteBusiness(business.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhuma empresa encontrada para o Group Business atual.</p>
      )}

      <button onClick={handleRegisterBusiness}>Cadastrar Nova Empresa</button>
    </div>
  );
}

export default Businesses;
