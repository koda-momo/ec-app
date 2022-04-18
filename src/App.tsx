import Router from "./Router";
import "./assets/reset.css";
import "./assets/style.css";
import { Header } from "./components/header/Header";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-24 flex flex-1 min-w-screen c-main">
        <Router />
      </main>
    </>
  );
};

export default App;
