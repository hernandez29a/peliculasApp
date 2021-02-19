import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-posts',
  templateUrl: './slideshow-posts.component.html',
  styleUrls: ['./slideshow-posts.component.scss'],
})
export class SlideshowPostsComponent implements OnInit {

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true
  };

  @Input() peliculas: Pelicula[] = [];
  @Output() refrescaLista = new EventEmitter();
  

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async mostrarDetalle( id: string ) {

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    
    modal.onDidDismiss().then( (data) => {
      this.refrescaLista.emit();
    });

    modal.present();

  }

}
