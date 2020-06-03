import React from 'react';
import Main from './component/Main';
import Header from './component/Header';
import NavBar from './component/NavBar';

function App() {
  return (
    <div className="App">
      <header>
      <Header></Header>
      </header>
      <nav>
        <NavBar></NavBar>
      </nav>
      <section>
      <Main></Main>  
      </section>
      
    </div>
  );
}

export default App;
