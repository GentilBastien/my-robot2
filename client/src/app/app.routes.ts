import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/components/login-page/login-page';
import { HubPage } from './pages/hub/components/hub-page/hub-page';
import { GamePage } from './pages/game/components/hub-page/game-page';
import { authGuard } from '@core/guards/auth.guard';

export const routeConstants = {
  LOGIN: 'login',
  HUB: 'hub',
  GAME: 'game',
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: routeConstants.LOGIN,
    pathMatch: 'full',
  },
  {
    path: routeConstants.LOGIN,
    component: LoginPage,
  },
  {
    path: routeConstants.HUB,
    component: HubPage,
    canMatch: [authGuard],
  },
  {
    path: routeConstants.GAME,
    component: GamePage,
    canMatch: [authGuard],
  },
];
