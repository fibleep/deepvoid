import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import BadWordsFilter from 'bad-words';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, limitToFirst, onChildAdded, onValue, orderByKey, query, ref, set } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { Message } from 'src/message/message';
import { v4 as uuidv4 } from 'uuid';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-deep-view',
  templateUrl: './deep-view.component.html',
  styleUrls: ['./deep-view.component.css']
})
export class DeepViewComponent implements OnInit {
  title = 'deepvoid';
  app: FirebaseApp;
  db: Database;
  form: FormGroup;
  filter = new BadWordsFilter();
  formSubmitted = false;

  constructor(private formBuilder: FormBuilder, public messageService: MessageService) {
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
    this.form = this.formBuilder.group({
      content: [''],
    });
  }

ngOnInit(): void {
  const messagesRef = ref(this.db, 'messages');
  const queryResult = query(messagesRef, orderByKey(), limitToFirst(20));

  let lastKey: string | null = null;

  onValue(queryResult, (snapshot) => {
    const data = snapshot.val();
    const messages: Message[] = [];
    for (const id in data) {
      const message = data[id];
      messages.push(message);
      lastKey = id; // store the last key
    }
    this.messageService.setMessages(messages);

    onChildAdded(messagesRef, (newSnapshot, prevChildKey) => {
      if (prevChildKey && newSnapshot.key && newSnapshot.key > lastKey!) {
        const newMessage = newSnapshot.val();
        const delay = this.getRandomDelay();
        const position = this.getRandomPosition();
        newMessage.delay = delay;
        newMessage.position = position;
        this.messageService.addMessage(newMessage);
      }
    });
  });
}


onMessageSubmit(event: Event, form: { content: string }): void {
  event.preventDefault();
  this.formSubmitted = true;
  const position = this.getRandomPosition();
  const message: Message = {
    id: uuidv4(),
    content: form.content ? this.filter.clean(form.content) : '',
    createdAt: new Date(),
    position: position,  
    delay: this.getRandomDelay()
  };
  set(ref(this.db, `messages/${message.id}`), message);
  this.messageService.addMessage(message);
}

  getRandomDelay(): number {
    return Math.random() * 100;
  }

  trackByFn(index: number, message: Message): string {
    return message.id!;
  }

  getRandomPosition(): number {
    return Math.random() * 60;
  }
}
