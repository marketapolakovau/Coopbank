import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Calculator from './components/Calculator'

function App() {
  return (
    <div className="App">
      <Home />
        <Calculator />
    </div>
  );
}

export default App;
