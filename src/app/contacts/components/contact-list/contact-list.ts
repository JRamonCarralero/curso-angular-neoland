import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ContactAdd } from '../contact-add/contact-add';
import { Contact, ContactService } from '../../services/contact';

@Component({
  selector: 'app-contact-list',
  imports: [CommonModule, TableModule, ButtonModule, ContactAdd],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})
export class ContactList implements OnInit {
  // signal almacena la lista de coontactos
  contacts = signal<Contact[]>([]);
  // signal que indica si estamos editando un contacto (o creando uno nuevo)
  editing = signal<Contact | undefined>(undefined);

  // constructor: se ejecuta cuando se carga el componente
  constructor( private svc: ContactService ) { }

  // ngOnInit: se ejecuta cuando se carga el componente
  ngOnInit(): void {
    this.load();  // Cargamos la lista de contactos
  }

  // Metodo que se llama cuando se carga el componente
  load(): void {
    this.svc.getAll().subscribe(list => this.contacts.set(list)); // Cargamos la lista de contactos
  }

  // Metodo que se llama cuando para editar un contacto
  onEdit(contact: Contact): void {
    this.editing.set(contact);  // Establecemos el contacto a editar
  }

  // Metodo que se llama para crear un nuevo contacto
  onNewContact(): void {
    this.editing.set({id: undefined!, name: '', email: '', phone: ''});  // Limpiamos el contacto a editar
  }

  // Método que se llama tras crear, modificar o cancelar el formulario
  onSaved(): void {
    this.editing.set(undefined);
    this.load();
  }

  // Metodo para eliminar un contacto
  onDelete(id: number | null): void {
    if (!id) {
      console.warn('[DEBUG] onDelete aborted: no id');
      return;
    }
    if (confirm('Estas seguro de borrar el contacto?')) {
      this.svc.delete(id).subscribe({
        next: () => this.load(),
        error: (err) => console.error(err)
      });
    }
  }
}
