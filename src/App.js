import './sass/style.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import HostSession from './pages/HostSession';
import CreateSession from './pages/CreateSession';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/host-a-session" element={<HostSession />} />
            <Route path="/create-session" element={<CreateSession />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
