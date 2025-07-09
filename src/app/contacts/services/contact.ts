// Injectable, marca a esta clase como un servicio, es decir, puede ser inyectado en otros componentes o servicios
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definimos la estructura que debe tener un contacto
export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

// Decorador que indica que este servivio se provee a toda la aplicación (singleton)
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // URL base del API donde se gestionan los contactos
  private API = 'http://localhost:3000/contacts';

  // Inyectamos HttpClient para poder hacer peticiones HTTP
  constructor( private http: HttpClient ) { }

  /*
    Método para obtener la lista completa de contactos
    Nos devuelve un Observable que nos emite un array de contactos
    Observable nos permite verificar si hemos recibido una respuesta
  */
  getAll() : Observable<Contact[]> {
    return this.http.get<Contact[]>(this.API);
  }

  /*
    Método para obtener un contacto por su id
    Nos devuelve un Observable que nos emite el contacto
  */
  getById(id: number) : Observable<Contact> {
    return this.http.get<Contact>(`${this.API}/${id}`);
  }

  /*
    Método para crear un nuevo contacto.
    El método recibe un contacto sin id (por lo general lo asigna el backend) y devuelve un observable que emitirá el contacto creado
  */
  create(contact: Omit<Contact, 'id'>) : Observable<Contact> {
    return this.http.post<Contact>(this.API, contact);
  }

  /*
    Método para actualizar un contacto.
    El método recibe un contacto con id y devuelve un observable que emitirá el contacto actualizado
  */
  update(contact: Contact) : Observable<Contact> {
    return this.http.put<Contact>(`${this.API}/${contact.id}`, contact);
  }

  /*
    Método para borrar un contacto.
    El método recibe un id y borra el contacto
  */
  delete(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
