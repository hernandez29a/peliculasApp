import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10
  };

  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}


  onClick() {
    //console.log('cargar mas');
    //disparamos el evento hacia el padre
    this.cargarMas.emit();

  }

  async mostrarDetalle( id: string ) {

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }


}
