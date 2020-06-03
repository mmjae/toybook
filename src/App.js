import React from 'react';
import Header from './component/Header';
import NavBar from './component/NavBar';
import AppRouter from './route/RouterComponent';
import {BrowserRouter} from 'react-router-dom';
function App() {
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

export default App;
