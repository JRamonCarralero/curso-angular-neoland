import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ContactList } from './contacts/components/contact-list/contact-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, ContactList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'my-app';
}
