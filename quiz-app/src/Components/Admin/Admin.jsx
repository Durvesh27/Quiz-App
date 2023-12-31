import React, { useContext } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { useState } from "react";
import { AuthContext } from "../../MyContext";
import { useEffect } from "react";
import api from "../Api Config";
const Admin = () => {
  const [questionData, setQuestionData] = useState({
    category: "",
    categoryImg: "",
    question: "",
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
    answer: "",
  });
  const router = useNavigate();
  const { state, Logout } = useContext(AuthContext);
  const handleChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      questionData.category &&
      questionData.categoryImg &&
      questionData.question &&
      questionData.answer &&
      questionData.opt1 &&
      questionData.opt2 &&
      questionData.opt3 &&
      questionData.opt4
    ) {
      try {
        const token = JSON.parse(localStorage.getItem("QuizToken"));
        if (token) {
          const response = await api.post(
            "/create-quiz",
            { questionData, token }
          );
          if (response.data.success) {
            alert(response.data.message);
          } else {
            alert(response.data.message);
          }
        } else {
          return alert("No token");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  useEffect(() => {
    if (!state?.user) {
      router("/login");
    }
  }, [state]);
  return (
    <div className="admin">
      <nav className="admin-navbar">
        <div className="admin-nav1">
          <p>{state?.user?.name}</p>
        </div>
        <p onClick={Logout}>Logout</p>
      </nav>
      <div className="admin-box">
        <Text fontSize="lg" textAlign="center" mt={5} mb={5}>
          Create Quiz
        </Text>
        <form className="form" onSubmit={handleSubmit}>
          <label>Enter Category</label>
          <input
            type="text"
            name="category"
            onChange={handleChange}
            className="form-ip"
          />
          <label>Enter Category Image</label>
          <input
            type="text"
            name="categoryImg"
            onChange={handleChange}
            className="form-ip"
          />
          <label>Enter Question</label>
          <input
            type="text"
            name="question"
            onChange={handleChange}
            className="form-ip"
          />
          <label>Enter Option1</label>
          <input
            type="text"
            name="opt1"
            onChange={handleChange}
            className="form-ip"
          />
          <label>Enter Option2</label>
          <input
            type="text"
            name="opt2"
            onChange={handleChange}
            className="form-ip"
          />
          <label>Enter Option3</label>
          <input
            type="text"
            name="opt3"
            onChange={handleChange}
            className="form-ip"
          />
          <label>Enter Option4</label>
          <input
            type="text"
            name="opt4"
            onChange={handleChange}
            className="form-ip"
          />
          <label>Enter Answer</label>
          <input
            type="text"
            name="answer"
            onChange={handleChange}
            className="form-ip"
          />

          <input type="submit" value="Create" className="reg-btn" />
        </form>
      </div>
    </div>
  );
};

export default Admin;
