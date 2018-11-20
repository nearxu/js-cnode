import React, { Component } from 'react';
import './app.scss';
import { Router, Route, hashHistory } from 'react-router';
import Home from './page/home';


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
      <Router history={hashHistory}>
        <div>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/detail/:id' component={Detail} />
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
