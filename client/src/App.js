import "./App.css";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import PersonalDataForm from "./components/PersonalDataForm";

function App() {
  return (
    <div className="App">
      <Home />
      <PersonalDataForm />
    </div>
  );
}

export default App;
