import {Routes, Route} from "react-router-dom";

import './App.css'
import RootLayout from './_root/RootLayout';
import Home from './_root/pages/Home';


function App() {

  return (
   <main className = "flex h-screen">
    <Routes>
      <Route element = {<RootLayout/>}>
        <Route index element = {<Home/>}/>

      </Route>
    </Routes>


   </main>
  )
}

export default App
