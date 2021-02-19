import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): string {

    if( !img) {

      return './assets/no-image-banner.jpg';
    }

    //Armamos el url que va a mostrar la imagen
    const imgUrl = `${url}/${size}${img}`
    //console.log(imgUrl);

    return imgUrl;
  }

}
