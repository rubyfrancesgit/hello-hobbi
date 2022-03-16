import './sass/style.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from './hooks/useAuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// pages
import Home from './pages/Home';
import HostSession from './pages/HostSession';
import CreateSession from './pages/CreateSession';
import SignUp from './pages/SignUp';
import SoapMaking from './pages/SoapMaking';

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
              <Route path="/host-a-session" element={<HostSession />} />
              <Route path="/sign-up" element={ !user? <SignUp /> : <Home /> } />
              <Route path="/create-session" element={ user ? <CreateSession /> : <Home /> } />
              <Route path="/soap-making" element={ <SoapMaking /> } />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
