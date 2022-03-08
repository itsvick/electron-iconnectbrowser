import { Injectable } from '@angular/core';
import { DtoSystemInfo } from '../../extraResources/ipc-dtos/dtosysteminfo';
import { Observable } from 'rxjs';

export interface device {
  locationId: number;
  vendorId: number;
  productId: number;
  deviceName: string;
  manufacturer: string;
  serialNumber: string;
  deviceAddress: number;
}
@Injectable({
  providedIn: 'root'
})
export class IpcService {

  constructor() { }

  openDevTools() {
    (window as any).api.electronIpcSend('dev-tools');
  }

  getSystemInfoAsync(): Observable<DtoSystemInfo> {
    return new Observable(subscriber => {
      (window as any).api.electronIpcOnce('systeminfo', (event, arg) => {
        const systemInfo: DtoSystemInfo = DtoSystemInfo.deserialize(arg);
        subscriber.next(systemInfo);
        subscriber.complete();
      });
      (window as any).api.electronIpcSend('request-systeminfo');
    });
  }

  openExternalLink(url: string) {
    (window as any).api.electronIpcSend('open-link', url);
  }

  getDetectSDCard(): Observable<{add: boolean, device: device}> {
    (window as any).api.electronIpcSend('start-monitoring');
    return new Observable(subscriber => {
      (window as any).api.electronIpcOn('usb-info-change', (event, arg) => {
        subscriber.next(arg as {add: boolean, device: device});
      });
    });
  }

  getSDCardPath(): Observable<any> {
    return new Observable(subscriber => {
      (window as any).api.electronIpcOn('detect-sd-card-complete', (event, arg) => {
        console.log('event-detect-sd-card-complete', event);
        console.log('arg', arg);
        subscriber.next(arg);
      });
    });
  }

  getAllVideoPaths(): Observable<any> {
    return new Observable(subscriber => {
      (window as any).api.electronIpcOnce('all-video-path-complete', (event, arg) => {
        subscriber.next(arg);
        subscriber.complete;
      });
    });
  }

  getVideoPath(): Observable<any> {
    return new Observable(subscriber => {
      (window as any).api.electronIpcOn('video-path-complete', (event, arg) => {
        subscriber.next(arg);
      });
    });
  }

  getVideoPathNow(sdCardPath: string, code: string) {
    (window as any).api.electronIpcSend('video-path', sdCardPath, code);
  }


  getSDCardPathNow() {
    (window as any).api.electronIpcSend('detect-sd-card');
  }

  getDetectSDCardNow() {
    (window as any).api.electronIpcSend('monitoring');
  }

  getAllVideoPathsNow(sdCardPath: string) {
    (window as any).api.electronIpcSend('all-video-paths', sdCardPath);
  }
}
