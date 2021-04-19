import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  public promptEvent: any = null;

  constructor(private swUpdate: SwUpdate) {
    swUpdate.available.subscribe((event) => {
      if (this.askUserToUpdate()) {
        window.location.reload();
      } else {
        window.location.reload();
      }
    });

    window.addEventListener('beforeinstallprompt', (event) => {
      this.promptEvent = event;
    });
  }

  public askUserToUpdate() {
    return confirm('Se actualizara a una nueva versión.');
  }
}
