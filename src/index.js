import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import ClassPage from './Components/ClassPage';
import FuncPage from './Components/FuncPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='container-fluid'>
      <Header/>
      <div className='row'>
        <div className='col-6'>
          <span className='h1 text-warning text-center'>Class Component</span>
          <ClassPage/>
        </div>
        <div className='col-6'>
          <span className='h1 text-warning text-center'>Func Component</span>
          <FuncPage/>
        </div>
      </div>
      <Footer/>
  </div>
 
);


