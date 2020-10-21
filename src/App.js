import React, { useState, useEffect } from 'react';
import './App.scss';
import Layout from './components/Layout/Layout'
import Countries from './containers/Countries/Countries'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './containers/Home/Home';




function App() {

  let [dark, setDark] = useState(JSON.parse(localStorage.getItem("dark")) ?? false)

  // useLayoutEffect(() => {
  //   setDark(JSON.parse(localStorage.getItem("dark")) ?? false)
  // }, [])






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
        <Switch>
          <Route path="/countries" component={Countries}/>
          <Route path="/" exact component={Home}/>
          <Redirect to='/'/>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
