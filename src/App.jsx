import React from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./containers/Main";

const App = () => {
  return (
    <div className="App">
      <Header />

      <main className="main">
        <Sidebar />
        <Main />
      </main>
    </div>
  );
};

export default App;
