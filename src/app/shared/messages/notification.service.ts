import { EventEmitter } from "@angular/core";

export class NotificationService {
    notifier = new EventEmitter<string>();
    
    notifiy(message: string){
        this.notifier.emit(message);
    }
}