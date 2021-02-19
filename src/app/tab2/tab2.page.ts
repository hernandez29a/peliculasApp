import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  peliculas: Pelicula[] = [];
  cargar: boolean = false;

  constructor(private movieService: MoviesService,
              private modalCtrl: ModalController) {}

  buscar( event) {
    this.cargar = true;
    //console.log(event.detail.value);
    const valor: string = event.detail.value;

    if( valor.length === 0 ) {
      this.cargar = false;
      this.peliculas = [];
      return;
    }
    
    this.movieService.buscarPeliculas( valor )
    .subscribe( resp => {
      console.log(resp);
      //se colocan en corchetes para no crear la interfaz
      this.peliculas = resp['results'];  
      this.cargar = false;
    });
    
    
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
