import {
  Routes as Switch,
  Route,
} from "react-router-dom";
import { FormDevs } from "../pages/Devs/Form";
import { Devs } from "../pages/Devs/List";
import { FormLevels } from "../pages/Levels/Form";
import { Levels } from "../pages/Levels/List";

export const Routes = () => (
  <Switch>
    <Route path="/" element={<Devs />} />
    <Route path="/devs/new" element={<FormDevs />} />
    <Route path="/devs" element={<Devs />} />
    <Route path="/levels/new" element={<FormLevels />} />
    <Route path="/levels" element={<Levels />} />
  </Switch>
)