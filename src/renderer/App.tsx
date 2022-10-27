import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Diagram from "./diagram/diagram";
import icon from '../../assets/icon.svg';
import './App.css';

const Main = () => {
  return (
    <div>
      <Diagram></Diagram>
      <div className="Hello">
        <h1>electron-react-boilerplate</h1>
        <div className="Hello">
          <button type="button">Readss our docs</button>
          <button type="button">Donate</button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
