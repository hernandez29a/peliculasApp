import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { PeliculaDetalle, RespuestaCredits, RespuestaMDB, Genre } from '../interfaces/interfaces';

const URL = environment.url
const ApiKey = environment.apiKey;



@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: Genre[] = [];


  constructor(private http: HttpClient) { }

  private ejecutarRuta<T>( ruta: string) {

    ruta = URL + ruta;
    ruta += `&api_key=${ApiKey}&language=es&include_image_language=es`;

    return this.http.get<T>( ruta );

    
  }

  getPopulares() {

    this.popularesPage++;

    const ruta = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage}`;

    return this.ejecutarRuta<RespuestaMDB>(ruta);

  }

  getCartelera() {

    //obtener el dia de hoy
    const hoy = new Date();

    //obtener el dia del mes siguiente
    const ultimoDia  = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0 ).getDate();

    //obtener mes
    const mes = hoy.getMonth() +1;

    let mesString;

    if( mes < 10 ) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    //armar el dia inicial
    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarRuta<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);

  }

  getPeliculaDetalle( id: string) {

    return this.ejecutarRuta<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getPeliculaActores( id: string) {

    return this.ejecutarRuta<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  buscarPeliculas( termino: string ) {


    return this.ejecutarRuta( `/search/movie?query=${ termino }` )

  }

  cargarGeneros(): Promise<Genre[]>{

    return new Promise( resolve => {
      this.ejecutarRuta( '/genre/movie/list?a=1')
        .subscribe( resp => {
          this.generos = resp['genres'];
          console.log(this.generos);
          resolve(this.generos);
        });

    });

  }




}
