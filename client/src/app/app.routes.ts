import { Routes } from "@angular/router";
import { LoginPage } from "./pages/login/components/login-page/login-page";
import { HubPage } from "./pages/hub/components/hub-page/hub-page";
import { GamePage } from "./pages/game/components/hub-page/game-page";

export const routeConstants = {
  LOGIN: "login",
  HUB: "hub",
  GAME: "game",
};

export const routes: Routes = [
  {
    path: routeConstants.LOGIN,
    component: LoginPage,
  },
  {
    path: routeConstants.HUB,
    component: HubPage,
  },
  {
    path: routeConstants.GAME,
    component: GamePage,
  },
];
