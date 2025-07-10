import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ContactAdd } from "./contacts/components/contact-add/contact-add";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, ContactAdd],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'my-app';
}
