import { Component } from '@angular/core';

@Component({
  selector: 'app-beach-view',
  templateUrl: './beach-view.component.html',
  styleUrls: ['./beach-view.component.css']
})
export class BeachViewComponent {
    isNight = false ;

    constructor() {
            this.isNight = this.checkIsNight();
    }

    checkIsNight(): boolean {
        const date = new Date();
        const hour = date.getHours();
        return hour < 6 || hour > 18;
    }
    
    scrollToForm(): void {
        const form = document.getElementById('form');
        form?.scrollIntoView({ behavior: 'smooth' });
    }
}
