import { Component, OnInit } from '@angular/core';
import { Pelicula, RespuestaMDB } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];

  constructor(private movieService: MoviesService) { }
  
  
  ngOnInit(): void {
    
    this.cargarPeliculas();
    this.cargarPopulares();
  }

  cargarPeliculas() {
    this.movieService.getCartelera()
      .subscribe( resp => {
        
        //console.log(resp);
        this.peliculasRecientes = resp.results;
      });
  }

  cargarPopulares() {
    this.movieService.getPopulares()
      .subscribe( resp => {
        //console.log(resp);
        //this.populares = resp.results;

        const arrTemp = [ ... this.populares, ...resp.results];

        this.populares = arrTemp;
      });
    
  }

  cargarMas( event) {
    this.cargarPopulares();
  }
  
  

}
