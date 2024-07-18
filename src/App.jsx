import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import RouterSetup from './components/Router.jsx';


const App = () => {
  return (
    <div className='container'>
      <Header />
      <main className="container-view">
        <RouterSetup />
      </main>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
