import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as FromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AppLoadingActions from '../../store/loading-store/loading.actions';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerInterceptor implements HttpInterceptor {


  constructor(private snackBar:MatSnackBar,
    private store: Store<FromApp.AppState>,
    ) {}
// close loading spinner after snackBare 
intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if(error.message=='No Cities that match your term'){
            return
          }
       this.snackBar.open(error.message,'close',{verticalPosition:'top',panelClass:'background'})
          this.store.dispatch(new AppLoadingActions.ToggleLoading(false))
        }
        return throwError(() => error);
      })
    )
  }

}
