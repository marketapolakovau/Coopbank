import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
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
