import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationPWAService {
  constructor(private http: HttpClient) {}

  addPushSubscriber(sub: any) {
    const key = sub.getKey('p256dh');
    const token = sub.getKey('auth');
    const contentEncoding = (PushManager.supportedContentEncodings || ['aesgcm'])[0];
    const data = {
      endpoint: sub.endpoint,
      publicKey: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
      authToken: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null,
      contentEncoding,
    };
    return this.http.post('/api/subscriptions', data).toPromise();
  }

  send() {
    this.http.post('/api/notifications', null).subscribe((res) => {
      console.log(res);
    });
  }

  urlBase64ToUint8Array(base64String: any) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
