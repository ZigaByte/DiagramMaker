import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Workflow from 'model/workflow';
import WorkflowView from './workflow_view';

type AppProps = { workflow: Workflow };

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends React.Component<AppProps> {
  render() {
    const { workflow } = this.props;
    return (
      <Router>
        <Routes>
          <Route path="/" element={<WorkflowView workflow={workflow} />} />
        </Routes>
      </Router>
    );
  }
}
