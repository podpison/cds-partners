import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import LoginPage from './pages/login/index.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainPage from './pages/main/index.tsx';
import Header from './layout/header.tsx';
import Providers from './providers/index.tsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Providers>
          <ToastContainer position="bottom-right" />
          <Header />
          <Routes>
            <Route
              element={<MainPage />}
              path="/"
            />
            <Route
              element={<LoginPage />}
              path="/login"
            />
          </Routes>
        </Providers>
      </BrowserRouter>
    </>
  );
}

export default App;
