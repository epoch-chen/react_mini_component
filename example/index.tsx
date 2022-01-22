import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ReactDOM from 'react-dom';
import NodeListDemo from './node-list';
import DialogDemo from './dialog';
import DndDemo from './dnd';
// import ScrollView from './../src/component/test/scrollView';
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/list">List</Link>
            </li>
            <li>
              <Link to="/dialog">Dialog</Link>
            </li>
            <li>
              <Link to="/dnd">Drag and Drop</Link>
            </li>
          </ul>
          <hr />
          <Route path="/list" component={NodeListDemo} />
          <Route path="/dialog" component={DialogDemo} />
          <Route path="/dnd" component={DndDemo} />
        </div>
      </Router>
    </div>
  );
}

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
  // Do something with the error
  // E.g. log to an error logging client here
  console.log(error, info);
};

type ErrorBoundaryFallbackProps = {
  // resetErrorBoundary: (...args: Array<unknown>) => void;
  error: Error;
};

const ErrorBoundaryFallback: React.ComponentType<ErrorBoundaryFallbackProps> = ({
  // resetErrorBoundary,
  error,
}: ErrorBoundaryFallbackProps) => (
  <div>
    <h2>{error.name}</h2>
    <output>{error.message}</output>
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onError={myErrorHandler}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
