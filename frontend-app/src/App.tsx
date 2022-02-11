import { BrowserRouter } from "react-router-dom";
import { Menu } from "./pages/Menu";
import { Routes } from "./routes";
import GlobalStyle from "./styles/globalStyle";
import { ToastContainer } from "react-toastify";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => (
  <>
    <BrowserRouter>
          <Menu>
            <Routes />
          </Menu>
        <GlobalStyle />
      <ToastContainer />
    </BrowserRouter>
  </>
);

export default App;
