import { CommonModule } from '@angular/common';
import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact, ContactService } from '../../services/contact';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-contact-add',
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './contact-add.html',
  styleUrl: './contact-add.css'
})
export class ContactAdd implements OnChanges {
  // Recibe el contacto desde el componente padre y lo muestra en el formulario
  @Input() editContact?: Contact;

  // Eventos que se emiten cuando crea, actualiza o cancela el formulario
  @Output() create = new EventEmitter<void>();
  @Output() update = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  // Definimos el formulario reactivo con sus campos y validaciones
  form = new FormGroup({
    id: new FormControl<Number | null>(null),
    name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    phone: new FormControl<string>('', Validators.required)
  });

  // Inyectamos el servicio que maneja las llamadas http
  constructor( private svc: ContactService ) { }

  // Método que se ejecuta cuando los inputs cambian
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editContact'] && this.editContact) {
      this.form.patchValue({
        id: this.editContact.id,
        name: this.editContact.name,
        email: this.editContact.email,
        phone: this.editContact.phone
      });
    }
  }

  // Metodo que se ejecuta al enviar el formulario
  onSubmit() {
    if (this.form.invalid) return;
    // Obtenemos los valores del formulario
    const id = this.form.get('id')?.value as number | null;
    const name = this.form.get('name')?.value as string;
    const email = this.form.get('email')?.value as string;
    const phone = this.form.get('phone')?.value as string;
    // Si hay id, actualizamos el contacto
    if (id) {
      this.svc.update({ id, name, email, phone }).subscribe(() => {
        this.resetAndEmitUpdate();
      });
    } else {
      // Si no hay id, creamos un nuevo contacto
      this.svc.create({ name, email, phone }).subscribe(() => {
        this.resetAndEmitCreate();
      });
    }
  }

  // Resetea el formulario y emite evento de creacion
  private resetAndEmitCreate() {
    this.form.reset({ id: null , name: '', email: '', phone: '' });
    this.create.emit(); // Notifica al componente
  }

  // Resetea el formulario y emite evento de actualizacion
  private resetAndEmitUpdate() {
    this.form.reset({ id: null , name: '', email: '', phone: '' });
    this.update.emit();
  }

  // Resetea el formulario y emite evento de cancelacion al cancelar el formulario
  onCancel() {
    this.form.reset({ id: null , name: '', email: '', phone: '' });
    this.cancel.emit();
  }
}
