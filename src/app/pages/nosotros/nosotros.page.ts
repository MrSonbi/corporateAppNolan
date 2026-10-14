import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular';
import { GeolocationService } from '../../services/geolocation';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, CommonModule, FormsModule]
})
export class NosotrosPage implements OnInit {

  distancia: number | string = 0;
  
  private oficinaLat = 40.4452;
  private oficinaLon = -3.6115;

  // Inyectamos ChangeDetectorRef en el constructor
  constructor(
    private geolocationService: GeolocationService,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    try {
      const coords = await this.geolocationService.getCurrentPosition();
      
      const distanciaCalculada = this.geolocationService.calcularDistancia(
        coords.latitude,
        coords.longitude,
        this.oficinaLat,
        this.oficinaLon
      );

      this.distancia = distanciaCalculada ? distanciaCalculada.toFixed(2) : '0.00';
      
      // Forzamos a Angular a actualizar la vista con el nuevo valor de la distancia
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      this.distancia = 'No disponible';
      this.cdr.detectChanges();
    }
  }
}
