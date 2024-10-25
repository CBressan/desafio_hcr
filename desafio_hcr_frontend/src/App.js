import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Questions from "./components/Questions";
import GroupBusiness from "./components/GroupBusiness";
import Businesses from "./components/Businesses";
import EditQuestion from "./components/EditQuestion";
import RegisterGroupBusiness from "./components/RegisterGroupBusiness";
import RegisterBusiness from "./components/RegisterBusiness";
import EditBusiness from "./components/EditBusiness";
import EditGroupBusiness from "./components/EditGroupBusiness";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Rotas protegidas com token */}
        <Route
          path="/questions"
          element={
            <PrivateRoute>
              <Layout>
                <Questions />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-question/:id"
          element={
            <PrivateRoute>
              <Layout>
                <EditQuestion />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/businesses"
          element={
            <PrivateRoute>
              <Layout>
                <Businesses />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/register-business"
          element={
            <PrivateRoute>
              <Layout>
                <RegisterBusiness />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-business/:id"
          element={
            <PrivateRoute>
              <Layout>
                <EditBusiness />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/group-business"
          element={
            <PrivateRoute>
              <Layout>
                <GroupBusiness />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/register-group-business"
          element={
            <PrivateRoute>
              <Layout>
                <RegisterGroupBusiness />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-group-business/:id"
          element={
            <PrivateRoute>
              <Layout>
                <EditGroupBusiness />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
