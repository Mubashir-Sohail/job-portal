import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/ui/shared/Navbar'
import Login from './components/ui/shared/auth/Login'
import SignUp from './components/ui/shared/auth/SignUp'
import Home from './components/Home.jsx'


function App() {
  return (
    <div>
      <Router>
      <Navbar/>
        <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/Login' Component={Login}/>
          <Route path='/SignUp' Component={SignUp}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
