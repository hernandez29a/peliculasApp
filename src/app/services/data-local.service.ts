import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];
  

  constructor(private storage: Storage,
              private toastCtrl: ToastController) { 
                this.cargarFavoritos();
              }

  async presentToast( message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  guardarPelicula( pelicula: PeliculaDetalle) {

    let existe = false;
    let mensaje = '';

    for ( const peli of this.peliculas) {
      if( peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if(existe) {
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id);
      mensaje = 'Removido de Favoritos';
    } else {
      this.peliculas.push( pelicula );
      mensaje = 'Agregada a favoritos';
    }

    /**
     * se guardar la pelicula en un arreglo y luego se guardar ese arreglo en 
     * el storage del dispositivo
     */
    this.presentToast( mensaje);
    this.storage.set('peliculas', this.peliculas);
    //console.log('guardaod en el storage');

    return !existe;

  }

  async cargarFavoritos() {

    //me traigo lo que este en el storage y lo guardo en la variable de peliculas
    const peliculas = await this.storage.get('peliculas');
    //guardamos lo que esta en el storage en la variable de peliculas global
    //y si no hay nada en el arreglo lo colocamos vacio
    this.peliculas = peliculas || [];
    //retornamos lo que hay en el arreglo este lleno o no pero no null
    return this.peliculas;

  }

  async existePelicula( id) {

    //console.log(id);
    //id = Number(id);
    //console.log(id);

    await this.cargarFavoritos();
    const existe = this.peliculas.find( peli => peli.id === id);

    //si el objeto existe e true de lo contrario es false
    return (existe) ? true : false;



  }

 
}
