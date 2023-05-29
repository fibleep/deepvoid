import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, limitToFirst, onValue, orderByKey, query, ref, set } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { Message } from 'src/message/message';
import { v4 as uuidv4 } from 'uuid';

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
  messages: Message[] = [];
  formSubmitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
    this.form = this.formBuilder.group({
      content: [''],
    });
  }

  ngOnInit(): void {
  const messagesRef = ref(this.db, 'messages');
  const queryResult = query(messagesRef, orderByKey(), limitToFirst(50));

  onValue(queryResult, (snapshot) => {
    const data = snapshot.val();
    this.messages = [];

    for (const id in data) {
      const delay = this.getRandomDelay();
      const position = this.getRandomPosition();
      data[id].delay = delay;
      data[id].position = position;
      this.messages.push(data[id]);
    }
  });
}


  onMessageSubmit(form: {content:string}): void {
    this.formSubmitted = true;
    const message: Message = {
      id: uuidv4(),
      content: form.content,
      createdAt: new Date(),
    };
    set(ref(this.db, `messages/${message.id}`), message);
  }

  getRandomDelay(): number {
    return Math.random() * 100 + this.messages.length * 10;
  }

  getRandomPosition(): number {
    return Math.random() * 90;
  }
}
