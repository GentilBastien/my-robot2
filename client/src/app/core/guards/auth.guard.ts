import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication.service';
import { routeConstants } from '@app/app.routes';

export const authGuard: CanMatchFn = (_route: Route, _segments: UrlSegment[]) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.isLogged()) {
    return true;
  } else {
    return router.createUrlTree([routeConstants.LOGIN]);
  }
};
