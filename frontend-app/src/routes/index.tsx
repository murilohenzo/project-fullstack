import {
  Routes as Switch,
  Route,
} from "react-router-dom";
import { Devs } from "../pages/Devs/List";
import { Levels } from "../pages/Levels";

export const Routes = () => (
  <Switch>
    <Route path="/devs" element={<Devs />} />
    <Route path="/levels" element={<Levels />} />
  </Switch>
)