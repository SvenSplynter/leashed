import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { defer, NEVER, finalize, share } from 'rxjs';
import { SpinnerOverlayComponent } from 'src/app/shared/components/spinner-overlay/spinner-overlay.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerOverlayService {
  private overlayRef: OverlayRef = undefined;
  
public readonly spinner$ = defer(() => {
  this.show();
  return NEVER.pipe(
    finalize(() => {
      this.hide();
    })
  );
}).pipe(share());

  constructor(private overlay: Overlay) { }

  public show(): void {
    // Hack avoiding `ExpressionChangedAfterItHasBeenCheckedError` error
    Promise.resolve(null).then(() => {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        hasBackdrop: true,
        backdropClass: 'dark-backdrop'
      });
      this.overlayRef.attach(new ComponentPortal(SpinnerOverlayComponent));
    });
  }

  public hide(): void {
    this.overlayRef.detach();
    this.overlayRef = undefined;
  }
}
