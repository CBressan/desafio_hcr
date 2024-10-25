import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditQuestion() {
  const { id } = useParams();
  const [questionData, setQuestionData] = useState({
    question: "",
    is_multiple_choice: false,
  });
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [options, setOptions] = useState([]);
  const [editedOptions, setEditedOptions] = useState({});
  const [newOption, setNewOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestion();
    fetchBusinesses();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await api.get(`/questions/${id}/`);
      const { question, is_multiple_choice, business_id, options } =
        response.data.data;
      setQuestionData({ question, is_multiple_choice });
      setSelectedBusiness(business_id);
      setOptions(options);
    } catch (error) {
      console.error("Erro ao buscar a pergunta:", error);
    }
  };

  const fetchBusinesses = async () => {
    try {
      const response = await api.get("/businesses/");
      setBusinesses(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/questions/${id}/`, {
        question: questionData.question,
        is_multiple_choice: questionData.is_multiple_choice,
        business_id: selectedBusiness,
      });
      navigate("/questions");
    } catch (error) {
      console.error("Erro ao atualizar a pergunta:", error);
    }
  };

  const removeOption = async (optionId) => {
    try {
      await api.delete(`/options/${optionId}/`);
      setOptions(options.filter((option) => option.id !== optionId));
    } catch (error) {
      console.error("Erro ao remover a opção:", error);
    }
  };

  const handleOptionEdit = (optionId, newText) => {
    setEditedOptions({ ...editedOptions, [optionId]: newText });
  };

  const saveOptionEdit = async (optionId) => {
    try {
      const updatedText = editedOptions[optionId];
      await api.put(`/options/${optionId}/`, { text: updatedText });
      setOptions(
        options.map((option) =>
          option.id === optionId ? { ...option, text: updatedText } : option
        )
      );
      setEditedOptions({ ...editedOptions, [optionId]: undefined });
    } catch (error) {
      console.error("Erro ao salvar a edição da opção:", error);
    }
  };

  const addNewOption = async () => {
    if (newOption.trim() === "") return;
    try {
      const response = await api.post("/options/", {
        question_id: id,
        text: newOption,
      });
      setOptions([...options, response.data.data]);
      setNewOption("");
    } catch (error) {
      console.error("Erro ao adicionar nova opção:", error);
    }
  };

  return (
    <div>
      <h2>Editar Pergunta</h2>

      <input
        type="text"
        value={questionData.question}
        onChange={(e) =>
          setQuestionData({ ...questionData, question: e.target.value })
        }
        placeholder="Digite a nova pergunta"
      />

      <label>
        <input
          type="checkbox"
          checked={questionData.is_multiple_choice}
          onChange={(e) =>
            setQuestionData({
              ...questionData,
              is_multiple_choice: e.target.checked,
            })
          }
        />
        Múltipla Escolha
      </label>

      {questionData.is_multiple_choice && (
        <div>
          <h3>Opções</h3>
          <ul>
            {options.map((option) => (
              <li key={option.id}>
                <input
                  type="text"
                  value={
                    editedOptions[option.id] !== undefined
                      ? editedOptions[option.id]
                      : option.text
                  }
                  onChange={(e) => handleOptionEdit(option.id, e.target.value)}
                />
                <button onClick={() => saveOptionEdit(option.id)}>
                  Salvar
                </button>
                <button onClick={() => removeOption(option.id)}>Excluir</button>
              </li>
            ))}
          </ul>

          <h4>Adicionar Nova Opção</h4>
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="Digite uma nova opção"
          />
          <button onClick={addNewOption}>Adicionar Opção</button>
        </div>
      )}

      <h3>Selecione uma Empresa</h3>
      <select
        value={selectedBusiness}
        onChange={(e) => setSelectedBusiness(e.target.value)}
      >
        <option value="">Selecione uma empresa</option>
        {businesses.map((business) => (
          <option key={business.id} value={business.id}>
            {business.name}
          </option>
        ))}
      </select>

      <button onClick={handleUpdate}>Salvar Alterações</button>
    </div>
  );
}

export default EditQuestion;
