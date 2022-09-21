import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import PersonalDataForm from "./components/PersonalDataForm";

import Calculator from './components/Calculator'


function App() {
  return (
    <div className="App">

      <Home />

      <PersonalDataForm />

        <Calculator />


    </div>
  );
}

export default App;
