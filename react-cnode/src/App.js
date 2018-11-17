import React, { Component } from 'react';
import './app.scss';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './page/home';
// const Home = () => {
//   return (
//     <div>hello home</div>
//   )
// }
const About = () => {
  return (
    <div>hello about</div>
  )
}
const Detail = () => {
  return (
    <div>hello detail</div>
  )
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">home</Link></li>
            <li><Link to="/about">about</Link></li>
          </ul>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/about' component={About} />
            <Route path='/detail/:id' component={Detail} />
          </Switch>
        </div>
      </Router>
    )
  }
}


// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className='header'>hello world </div>
//       </div>
//     );
//   }
// }

export default App;
