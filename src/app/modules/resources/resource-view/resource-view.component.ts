import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VideoDialogComponent } from '@shared/components/video-dialog/video-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { device, IpcService } from '@app/services/ipc.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-resource-view',
  templateUrl: './resource-view.component.html',
  styleUrls: ['./resource-view.component.scss']
})
export class ResourceViewComponent implements OnInit, OnDestroy {

  code = new FormControl();
  sdCardStatus: { hasSDCard: boolean; isLoading: boolean; } = { hasSDCard: false, isLoading: true }
  sdCardPath: string = '';
  device: device;
  private unsubscribe = new Subject<void>();
  $disabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  $loading: Subject<boolean> = new Subject<boolean>();
  errorMessage: string;
  memoryCardData: { name: string, path: string }[] = []

  constructor(
    public dialog: MatDialog,
    private ipcService: IpcService,
  ) {

  }

  get hasMemoryCardData(): boolean {
    return this.memoryCardData && this.memoryCardData.length >= 1;
  }

  async ngOnInit() {
    await this.getSDCardPath();
    await this.getDetectSDCard();
    await this.getAllVideoPaths();
    this.ipcService.getDetectSDCardNow();
    this.ipcService.getSDCardPathNow();

    // console.log(this.decryptor('yaaJ'));
  }

  async getSDCardPath() {
    this.sdCardStatus = { hasSDCard: false, isLoading: true };
    this.$disabled.next(true);
    this.ipcService.getSDCardPath().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(result => {
      console.log('result', result);
      if (result.hasPath) {
        this.sdCardPath = result.path;
        this.sdCardStatus = { hasSDCard: true, isLoading: false };
        this.$disabled.next(false);

      } else {
        this.sdCardPath = '';
        this.sdCardStatus = { hasSDCard: false, isLoading: false };
        this.$disabled.next(true);
      }
    });
  }

  async getDetectSDCard() {
    this.ipcService.getDetectSDCard().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(value => {
      this.sdCardStatus = { hasSDCard: false, isLoading: true };
      this.$disabled.next(true);
    });
  }

  // new testing code
  async getAllVideoPaths() {
    if (this.sdCardStatus.hasSDCard) {
      // this.$loading.next(true);
      this.memoryCardData = [];
      this.ipcService.getAllVideoPaths().subscribe(files => {
        if (files && files.length >= 1) {
          for (const file of files) {
            if(file.substring(0,2) !== '._') {
              const path = 'file://' + this.sdCardPath + '/' + file;
              this.memoryCardData.push({ name: file, path });
            }
          }
          this.$loading.next(false);
        }
      })

      this.ipcService.getAllVideoPathsNow(this.sdCardPath)
    } else {
      setTimeout(() => {
        this.getAllVideoPaths();
      }, 1000);
    }
  }

  async openVideoDialog() {
    if (this.hasMemoryCardData) {   
      const encryptedCode = await this.encryptor(this.code.value);
      const video = this.memoryCardData.find(i => i.name.substr(i.name.length - 4) == encryptedCode);
      if (video) {
        this.dialog.open(VideoDialogComponent, {
          data: { videoPath: video.path, videoCode: this.code.value },
        });
      } else {
        this.$loading.next(false);
        this.errorMessage = 'This video code is not on this memory card, please check code. Remember they are case sensitive.'
        setTimeout(() => {
          this.errorMessage = null;
        }, 3500);
      }
    }
  }

  private async encryptor(code: string): Promise<string> {
    let encrypted: string = '';
    const secret: string =
      'BAc3WSY51qfCadJ6mMgiw4LU2KvebFEHypjoVxRQulznh0ZN7kTPOX89tsrIDG';
    const key: string =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (var i = 0; i < code.length; i++) {
      encrypted += secret[key.indexOf(code[i])];
    }
    return encrypted;
  }

  private decryptor(code: string): string {
    let encrypted: string = '';
    const secret: string =
      'BAc3WSY51qfCadJ6mMgiw4LU2KvebFEHypjoVxRQulznh0ZN7kTPOX89tsrIDG';
    const key: string =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (var i = 0; i < code.length; i++) {
      encrypted += key[secret.indexOf(code[i])];
    }
    return encrypted;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
