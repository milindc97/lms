import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  constructor(private socket: Socket) {
    // this.getMessage();
    // console.log(this.socket.ioSocket);
  }

  sendMessage(userId: string) {
    this.socket.emit('online', userId);
  }
}
