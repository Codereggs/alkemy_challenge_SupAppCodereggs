import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <section>
        <Login />
        <Home />
      </section>
    </div>
  );
}

export default App;
