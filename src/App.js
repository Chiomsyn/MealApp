import {
  BrowserRouter,
  Routes,
  Route, 
  Navigate
} from "react-router-dom";
import Hero  from './pages/hero/Hero';
import SignUpPage from './pages/login/SignUpPage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import Tickets from "./pages/hero/Tickets";
import { useAuthContext} from './hooks/useAuthContext'
import Meal from './pages/hero/Meal'

function App() {

  const {user} = useAuthContext()

  const nav = () => {
    if(user.email === 'mirianangelk@gmail.com'){
      return <Navigate to='/cook'/>
    }else{
     return <Navigate to='/tickets'/>
    }
  }

  return (
    <BrowserRouter>
    <Routes>
    <Route index path="/" element={!user ? <Hero/> : nav()} />
    <Route path="/login" element={!user ? <LoginPage/> : <Navigate to='/'/>} />
    <Route path="/signup" element={!user ? <SignUpPage/> : <Navigate to='/'/>} />
    <Route path="/tickets" element={user ? <Tickets/> : <Navigate to='/'/>} />
    <Route path="/cook" element={user ? <Meal/> : <Navigate to='/'/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
