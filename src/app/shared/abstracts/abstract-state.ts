import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConnectionService, ConnectionServiceOptions, ConnectionState } from '@app/_session/lib/connection-service.service';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { States } from '../models/state-enum';


export abstract class AbstractStateComponent {
    public state;
    public errors: any;
    public isOnline: boolean = false;
    connectionService: ConnectionService;

    private DEFAULT_OPTIONS: ConnectionServiceOptions = {
        enableHeartbeat: false,
        heartbeatUrl: 'dev/ping',
        heartbeatInterval: 10000,
        heartbeatRetryInterval: 2000,
        requestMethod: 'get'
    };

    get onlineHeartBeat(): Observable<ConnectionState> {
        return this.connectionService.monitor();
    }

    get isOfflineMode(): boolean {
        const obj = sessionStorage.getItem('isOfflineMode');
        if (obj && obj === 'true') {
            return true;
        } else {
            return false;
        }
    }

    constructor(
        http?: HttpClient,
        initState?: States) {
        this.state = initState ? initState : States.isLoading;
        // this.connectionService = this.connectionService ? this.connectionService : http ? new ConnectionService(http, this.DEFAULT_OPTIONS) : null;
        // if (this.connectionService) {
        //     this.connectionService.monitor().subscribe(isConnected => {
        //         this.isOnline = isConnected.hasInternetAccess;
        //     });
        // }
    }

    get isNotInit(): boolean { return this.state === States.uninitialized; }
    set isNotInit(value: boolean) {
        if (value) {
            this.state = States.uninitialized;
        }
    }

    get hasData(): boolean { return !this.isNotInit && !this.isLoading && this.state !== States.noData; }
    set hasData(value: boolean) {
        if (!value) {
            this.state = States.noData;
        }
    }


    get hasErrors(): boolean { return this.state === States.hasError; }
    set hasErrors(value: boolean) {
        if (value) {
            this.state = States.hasError;
        }
    }

    get showContent(): boolean { return this.hasData && !this.hasErrors; }
    set showContent(value: boolean) {
        if (value) {
            this.state = States.showContent;
        }
    }

    get isLoading(): boolean { return this.state === States.isLoading; }
    set isLoading(value: boolean) {
        if (value) {
            this.state = States.isLoading;
        }
    }

    get currentState(): States { return this.state; }

    public setCurrentState(state: States): void {
        this.state = state;
    }
}

