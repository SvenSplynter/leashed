import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize, Subscription } from 'rxjs';
import { SpinnerOverlayService } from '../services/spinner-overlay.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private spinnerOverlayService: SpinnerOverlayService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const spinnerSubscription: Subscription = this.spinnerOverlayService.spinner$.subscribe();
    return next.handle(request)
      .pipe(
        delay(1000),
        finalize(() => spinnerSubscription.unsubscribe()));
  }
}
