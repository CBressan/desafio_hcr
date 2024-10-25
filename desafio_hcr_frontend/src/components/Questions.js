import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");

  const navigate = useNavigate();

  const fetchQuestions = useCallback(async () => {
    if (businesses.length === 0) return;

    try {
      const response = await api.get("/questions/");
      const allQuestions = response.data.data;

      const filteredQuestions = allQuestions.filter((question) =>
        businesses.some((business) => business.id === question.business_id)
      );
      setQuestions(filteredQuestions);
    } catch (error) {
      console.error("Erro ao buscar perguntas:", error);
    }
  }, [businesses]);

  const fetchBusinesses = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  useEffect(() => {
    if (businesses.length > 0) {
      fetchQuestions();
    }
  }, [businesses, fetchQuestions]);

  const getGroupBusinessId = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.group_business_id;
    }
    return null;
  };

  const createQuestion = async () => {
    let questionId = 0;
    try {
      const response = await api.post("/questions/", {
        question: newQuestion,
        is_multiple_choice: isMultipleChoice,
        business_id: Number(selectedBusiness),
      });
      questionId = response.data.data.id;
      setNewQuestion("");
      setIsMultipleChoice(false);
      setSelectedBusiness("");
      fetchQuestions();
    } catch (error) {
      console.error("Erro ao criar pergunta:", error);
    }
    if (questionId !== 0 && isMultipleChoice) {
      saveOptions(questionId);
    }
  };

  const saveOptions = async (questionId) => {
    for (const option of options) {
      try {
        await api.post("/options/", {
          question_id: questionId,
          text: option,
        });
      } catch (error) {
        console.error("Erro ao salvar opção:", error);
      }
    }
  };

  const handleEditClick = (id) => {
    navigate(`/edit-question/${id}`);
  };

  const handleDeleteQuestion = async (id) => {
    if (window.confirm("Tem certeza de que deseja excluir esta pergunta?")) {
      try {
        await api.delete(`/questions/${id}/`);
        fetchQuestions();
      } catch (error) {
        console.error("Erro ao excluir pergunta:", error);
      }
    }
  };

  const addOption = () => {
    if (newOption.trim() === "") return;
    setOptions([...options, newOption]);
    setNewOption("");
  };

  const removeOption = (indexToRemove) => {
    const updatedOptions = options.filter(
      (_, index) => index !== indexToRemove
    );
    setOptions(updatedOptions);
  };

  return (
    <div>
      <h1>Questions</h1>

      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            {question.question}
            <button onClick={() => handleEditClick(question.id)}>Editar</button>
            <button onClick={() => handleDeleteQuestion(question.id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>

      <h2>Criar Nova Pergunta</h2>
      <input
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        placeholder="Digite a nova pergunta"
      />

      <label>
        <input
          type="checkbox"
          checked={isMultipleChoice}
          onChange={(e) => setIsMultipleChoice(e.target.checked)}
        />
        Múltipla Escolha
      </label>

      {isMultipleChoice && (
        <div>
          <h3>Adicionar Opções</h3>
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="Digite uma nova opção"
          />
          <button onClick={addOption}>Adicionar Opção</button>

          <ul>
            {options.map((option, index) => (
              <li key={index}>
                {option}
                <button onClick={() => removeOption(index)}>Excluir</button>
              </li>
            ))}
          </ul>
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

      <button onClick={createQuestion}>Adicionar Pergunta</button>
    </div>
  );
}

export default Questions;
