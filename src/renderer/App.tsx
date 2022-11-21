import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import WorkflowView from './workflow_view';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WorkflowView />} />
      </Routes>
    </Router>
  );
}
