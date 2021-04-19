import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@core';
import { I18nService } from '@app/i18n';

const log = new Logger('App');

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
import { Platform } from '@angular/cdk/platform';
import { SwPush } from '@angular/service-worker';
import { PushNotificationPWAService } from '@shared/services/push-notification-pwa.service';
import { TdDialogService } from '@covalent/core/dialogs';
import { PwaService } from '@shared/services/pwa.service';

const { PushNotifications } = Plugins;

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  readonly VAPID_PUBLIC_KEY = 'BDN-NL2vHEBPT4W-CZsWpnx1muOpgio7oP3E5On2bK8-N3juiMWUXkf-HBDgSsNjJFbDvQ4fJ0Wx4wJqii5A4Kc';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private i18nService: I18nService,
    private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private _platform: Platform,
    readonly swPush: SwPush,
    private pushNotification: PushNotificationPWAService,
    private _dialogService: TdDialogService,
    public pwa: PwaService
  ) {
    this._iconRegistry.addSvgIconInNamespace(
      'assets',
      'teradata',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'https://teradata.github.io/covalent/v3/assets/icons/teradata.svg'
      )
    );
    this._iconRegistry.addSvgIconInNamespace(
      'assets',
      'teradata-dark',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'https://teradata.github.io/covalent/v3/assets/icons/teradata-dark.svg'
      )
    );
    this._iconRegistry.addSvgIconInNamespace(
      'assets',
      'covalent',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'https://teradata.github.io/covalent/v3/assets/icons/covalent.svg'
      )
    );
  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        switchMap((route) => route.data),
        untilDestroyed(this)
      )
      .subscribe((event) => {
        const title = event.title;
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });

    if (this._platform.ANDROID || this._platform.IOS) {
      // Request permission to use push notifications
      // iOS will prompt user and return if they granted permission or not
      // Android will just grant without prompting
      PushNotifications.requestPermission().then((result) => {
        if (result.granted) {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });

      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration', (token: PushNotificationToken) => {
        alert('Push registration success, token: ' + token.value);
      });

      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError', (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      });

      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
        alert('Push received: ' + JSON.stringify(notification));
      });

      // Method called when tapping on a notification
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: PushNotificationActionPerformed) => {
          alert('Push action performed: ' + JSON.stringify(notification));
        }
      );
    }

    if (this._platform.FIREFOX || this._platform.WEBKIT) {
      console.log('firefox 0 webkit');
      if (this.swPush.isEnabled) {
        this.swPush
          .requestSubscription({
            serverPublicKey: this.VAPID_PUBLIC_KEY,
          })
          .then((subscription) => {
            // send subscription to the server
            this.pushNotification.addPushSubscriber(subscription).then((res: any) => {
              console.log(res);
            });
          })
          .catch(console.error);

        this.swPush.messages.subscribe((res: any) => {
          this._dialogService.openAlert({
            title: res.notification.title,
            disableClose: true,
            message: res.notification.message,
          });
        });
      }
      this.installPwa();
    }
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }

  installPwa(): void {
    this.pwa.promptEvent.prompt();
  }
}
