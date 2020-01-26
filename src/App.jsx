import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./containers/Main";

const App = () => {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
      <Header />

      <main className="main">
        <Sidebar />
        <Main />
      </main>
    </div>
  );
};

export default App;
