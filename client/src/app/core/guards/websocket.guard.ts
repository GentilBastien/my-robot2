import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { inject } from '@angular/core';
import { WebsocketService } from '@core/services/websocket.service';

export const websocketGuard: CanMatchFn = (_route: Route, _segments: UrlSegment[]) => {
  const websocketService = inject(WebsocketService);
  return websocketService.websocketReady$;
};
