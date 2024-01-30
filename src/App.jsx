import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './NavBar';
import News from './News';
import Sidebar from './Sidebar';
import NewsState from './state';
import NewsData from './NewsData';

function App() {
  return (
    <>
      <NewsState>
        <NavBar />
        <Sidebar />
        <NewsData>
          <News />
        </NewsData>
      </NewsState>
    </>
  )
}

export default App
