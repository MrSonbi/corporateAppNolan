import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { IonItem, IonInput, IonTextarea, IonButton } from '@ionic/angular';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: true, // <-- Asegúrate de incluir esto para componentes standalone
  imports: [IonItem, IonInput, IonTextarea, IonButton, CommonModule, FormsModule]
})
export class ContactoPage implements OnInit {

  correo = '';
  mensaje = '';
  enviado = false;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() { }

  async enviar() {
    // Guarda el mensaje en el almacenamiento local de Capacitor
    await Preferences.set({
      key: 'ultimoMensaje',
      value: JSON.stringify({
        correo: this.correo,
        mensaje: this.mensaje
      })
    });

    this.enviado = true;
    console.log('Mensaje guardado correctamente en las preferencias');
    this.cdr.detectChanges();
    // Opcional: limpiar los campos tras enviar si lo deseas
    // this.correo = '';
    // this.mensaje = '';
  }

}