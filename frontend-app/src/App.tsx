import { BrowserRouter } from "react-router-dom";
import { Menu } from "./pages/Menu";
import { Routes } from "./routes";
import GlobalStyle from "./styles/globalStyle";

import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Menu>
        <Routes />
      </Menu>
      <GlobalStyle />
    </BrowserRouter>
  </>
);

export default App;
