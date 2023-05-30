import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../../message/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$: Observable<Message[]> = this.messagesSubject.asObservable();

  constructor() {}

  // Add a new message to the current value of the messages array
  addMessage(message: Message): void {
    this.messagesSubject.next([...this.messagesSubject.getValue(), message]);
  }

  // Replace the current value of the messages array
  setMessages(messages: Message[]): void {
    this.messagesSubject.next(messages);
  }
}
