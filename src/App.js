import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import SharedLayout from './components/SharedLayout';
import NotFound from './components/NotFound';
import ProtectRoute from './components/ProtectRoute';
import AuthShared from './components/AuthShared';
import ContactUs from './components/ContactUs';

function App() {
  // const [user, setUser] = useState("") 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <ProtectRoute ><SharedLayout /></ProtectRoute>
          } >
            <Route index element={<Home />} />
          </Route>

          <Route path='/auth' element={<AuthRedirect ><AuthShared /></AuthRedirect>}> 
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/signup' element={<Signup />} />
          </Route>

          <Route path='/contactus' element={<ContactUs />} />

        <Route path='*' element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

const AuthRedirect = ({children})=> {

  const user = window.localStorage.getItem('user')

  if(user) {
    return <Navigate to={'/'} />
  }

  return children;
}

export default App;
