import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import { BrowserRouter as BroswerRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <>
    <BroswerRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} /> 
      </Routes>
      </BroswerRouter>
    </>
  )
}

export default App
