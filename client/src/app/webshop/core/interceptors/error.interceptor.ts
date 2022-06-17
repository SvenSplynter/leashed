import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snackbar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          if (error.status === 400) {
            if(error.error.errors) {
              throw error.error;
            } else {
              this.snackbar.open(error.error.message, error.error.statusCode, {
                duration: 2000,
                panelClass: ['mat-toolbar', 'mat-primary']
              });

            }
          }
          if (error.status === 401) {
            this.snackbar.open(error.error.message, error.error.statusCode, {
              duration: 2000,
              panelClass: ['mat-toolbar', 'mat-primary']
            });
          }
          if (error.status === 404) {
            this.router.navigateByUrl('/webshop/not-found');
          }
          if (error.status === 500) {
            const navigationExtras: NavigationExtras = {state: {error: error.error}};
            this.router.navigateByUrl('/webshop/server-error', navigationExtras);
          }
        }
        return throwError(error);
      })
    );
  }
}
