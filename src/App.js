import React from 'react';
import Header from './_header/Header.js';
import Content from './_content/Content.js';
import Footer from './_footer/Footer.js';
import 'materialize-css/dist/css/materialize.min.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Content/>
      <Footer/>
    </div>
  );
}

export default App;
