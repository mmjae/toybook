import React , {Component} from 'react';
import Header from './component/Header';
import NavBar from './component/NavBar';
import AppRouter from './route/RouterComponent';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  state = {
    addUser : {}
  }

  render(){
  return (
    <div className="App">
    <BrowserRouter>
      <header>
      <Header></Header>
      </header>
      <nav>
        <NavBar data={this.state.addUser}/>
      </nav>
      <section>
      <AppRouter onChange={function(user){
        this.setState({
          addUser : user
        });
      }.bind(this)}/>
      </section>
      </BrowserRouter>
    </div>
  );
  }
}

export default App;
