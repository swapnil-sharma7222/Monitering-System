import { Bar } from 'react-chartjs-2'
import './App.css'
import { BarChart } from './component/barChart'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignInPage from './authantication/signin'
import SignUpPage from './authantication/signup'
import NavBar from './component/Navbar'
import Admin from './component/Admin'

export default function App() {
  return (
    <div className="App">
      <Router>
        {/* <BarChart className="Bar" /> */}
        {/* <SignInPage/> */}
        <Routes>
          <Route exact path="/" element={<NavBar />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/locality" element=""></Route> //exact path is not fixed
          <Route path="/locality/:id" element=""></Route>
        </Routes>
      </Router>
    </div>
  )
}
