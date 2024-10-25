import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

function GroupBusiness() {
  const [groupBusiness, setGroupBusiness] = useState(null);
  const navigate = useNavigate();

  const fetchGroupBusiness = useCallback(async () => {
    const groupBusinessId = getGroupBusinessId();
    if (!groupBusinessId) {
      console.error("Group Business ID não encontrado no JWT.");
      return;
    }

    try {
      const response = await api.get(`/group-businesses/${groupBusinessId}/`);
      setGroupBusiness(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar informações do Group Business:", error);
    }
  }, []);

  useEffect(() => {
    fetchGroupBusiness();
  }, [fetchGroupBusiness]);

  const getGroupBusinessId = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.group_business_id;
    }
    return null;
  };

  const handleEditClick = () => {
    const groupBusinessId = getGroupBusinessId();
    navigate(`/edit-group-business/${groupBusinessId}`);
  };

  return (
    <div>
      <h1>Informações do Group Business</h1>

      {groupBusiness ? (
        <div>
          <p>
            <strong>ID:</strong> {groupBusiness.id}
          </p>
          <p>
            <strong>Nome:</strong> {groupBusiness.name}
          </p>
          <p>
            <strong>Razão Social:</strong> {groupBusiness.corporate_name}
          </p>
          <p>
            <strong>CNPJ:</strong> {groupBusiness.doc_number}
          </p>
          <p>
            <strong>Email:</strong> {groupBusiness.email}
          </p>
          <p>
            <strong>Telefone:</strong> {groupBusiness.phone}
          </p>
          <p>
            <strong>Endereço:</strong> {groupBusiness.address},{" "}
            {groupBusiness.num_address}, {groupBusiness.city},{" "}
            {groupBusiness.state}, {groupBusiness.country}
          </p>
          <p>
            <strong>Complemento:</strong> {groupBusiness.complement}
          </p>
          <p>
            <strong>CEP:</strong> {groupBusiness.postal_code}
          </p>

          {/* Botão para editar */}
          <button onClick={handleEditClick}>Editar Group Business</button>
        </div>
      ) : (
        <p>Carregando informações do Group Business...</p>
      )}
    </div>
  );
}

export default GroupBusiness;
