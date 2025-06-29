import Dashboard from './Pages/Dashboard'
import { Signin } from './Pages/Signin'
import { Signup } from './Pages/Signup'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
 return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path='/Signin' element={<Signin />}/>
    <Route path='/Signup' element={<Signup />}/>
    <Route path='/Dashboard' element={<Dashboard />}/>
  </Routes>
  </BrowserRouter>
  </>
 )
  }
export default App

