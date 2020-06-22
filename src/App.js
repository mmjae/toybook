import React , {Component} from 'react';
import Header from './component/Header';
import NavBar from './container/NavBar';
import AppRouter from './route/RouterComponent';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  render(){
  return (
    <div className="App">
    <BrowserRouter>
      <header>
      <Header></Header>
      </header>
      <nav>
        <NavBar/>
      </nav>
      <section>
      <AppRouter/>
      </section>
      </BrowserRouter>
    </div>
  );
  }
}

export default App;
