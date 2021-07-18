import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import NodeListDemo from './demo/node-list/index'
import './App.less';

function App() {
  return (
    <div className="App">
    <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/list">List</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/list" component={NodeListDemo}/>
    </div>
    </Router>
    </div>
  );
}

export default App;
