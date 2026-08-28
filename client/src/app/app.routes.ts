import { Routes } from "@angular/router";
import { LoginPage } from "./pages/login/components/login-page/login-page";
import { HubPage } from "./pages/hub/components/hub-page/hub-page";
import { GamePage } from "./pages/game/components/hub-page/game-page";

export const routes: Routes = [
  {
    path: "login",
    component: LoginPage,
  },
  {
    path: "hub",
    component: HubPage,
  },
  {
    path: "game",
    component: GamePage,
  },
];
