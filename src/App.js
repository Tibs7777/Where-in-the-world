import React, { useState, useEffect } from 'react';
import './App.scss';
import Layout from './components/Layout/Layout'
import Countries from './containers/Countries/Countries'
import { BrowserRouter } from 'react-router-dom';




function App() {

  let [dark, setDark] = useState(false)

  // let isDark = JSON.parse(localStorage.getItem("dark")) || false
  // if(isDark) {
  //   document.body.classList.add("body--dark")
  // }

  // setDark(JSON.parse(localStorage.getItem("dark")) || false)

  useEffect(() => {
    setDark(JSON.parse(localStorage.getItem("dark")) || false)
  }, [])


  useEffect(() => {
    if(dark) {
      document.body.classList.add("body--dark")
      localStorage.setItem("dark", true)
    } else {
      document.body.classList.remove("body--dark")
      localStorage.setItem("dark", false)
    }
  }, [dark])

  

  const toggleDark = () => {
    setDark(prevState => !prevState)
  }


  return (
    <BrowserRouter>
      <Layout dark={dark} toggleDark={toggleDark}>
        <Countries />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
