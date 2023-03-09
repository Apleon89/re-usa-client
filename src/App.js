
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route path="/registro" element={<Signup />} />
        <Route path="/acceso" element={<Login />} />

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
