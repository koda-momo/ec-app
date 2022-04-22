import Router from "./Router";
import "./assets/reset.css";
import "./assets/style.css";
import { Header } from "./components/header/Header";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Header />
      <div>
        <Toaster />
      </div>
      <main className="py-24 flex flex-1 min-w-screen c-main">
        <Router />
      </main>
    </>
  );
};

export default App;
