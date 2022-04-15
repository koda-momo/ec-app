import react from "react";
import Router from "./Router";
import "./assets/reset.css";
import "./assets/style.css";

const App = () => {
  return (
    <>
      <main className="py-24 flex flex-1 min-w-screen">
        <Router />
      </main>
    </>
  );
};

export default App;
