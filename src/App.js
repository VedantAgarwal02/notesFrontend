import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import SharedLayout from './components/SharedLayout';
import NotFound from './components/NotFound';
import ProtectRoute from './components/ProtectRoute';
import AuthShared from './components/AuthShared';
import PostNotes from './components/PostNotes';
import ContactUs from './components/ContactUs';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState("")

  const changeLoading = (isLoading, loadingMessage="Nothing") => {
    setLoading(isLoading)
    setMessage(loadingMessage)
  }

  return (
    <div className="App">
      
    {loading && 
    <section id="loading">
      <p>
        {message}...
      <FontAwesomeIcon icon={faSpinner} />
      </p>
    </section>
    }

      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <ProtectRoute ><SharedLayout /></ProtectRoute>
          } >
            <Route index element={<Home changeLoading={changeLoading} />} />
            <Route path='/postnotes' element={<PostNotes changeLoading={changeLoading} />} />
          </Route>

          <Route path='/auth' element={<AuthRedirect ><AuthShared /></AuthRedirect>}> 
            <Route path='/auth/login' element={<Login changeLoading={changeLoading} />} />
            <Route path='/auth/signup' element={<Signup changeLoading={changeLoading} />} />
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
  const token=Cookies.get('token')

  if(!token) {
    window.localStorage.removeItem('user')
  }

  if(user && token) {
    return <Navigate to={'/'} />
  }

  return children;
}

export default App;
