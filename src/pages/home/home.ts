import { Component,  } from '@angular/core';
import  {ANIMALES} from '../../data/data.animales';
import {  Animal} from "../../interface/animal.interface";
import { Refresher, reorderArray } from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


animales:Animal[]=[];
audio = new Audio();
audioTiempo: any;
ordenando:boolean = false;

  constructor() {
   this.animales = ANIMALES.slice(0);

  
  }

  reproducir(animal:Animal){
  
    this.pausar_audio(animal);
    if(animal.reproduciendo){
      animal.reproduciendo=false;
      return;
    }
    console.log(animal);

    this.audio = new Audio();
    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();


    animal.reproduciendo = true;

  this.audioTiempo =  setTimeout(()=> animal.reproduciendo = false, animal.duracion * 1000 )
  }


  private pausar_audio(animalSelec:Animal){

            clearTimeout( this.audioTiempo);

            this.audio.pause();
            this.audio.currentTime = 0;

            for( let animal of this.animales){
              if(animal.nombre != animalSelec.nombre){
                animal.reproduciendo = false;
              }
            }
  }

   borrarAnimal(index:number){
      this.animales.splice(index, 1);
  }

  recargarAnimales( val:Refresher) {
   

    setTimeout(() => {
      this.animales = ANIMALES.slice(0);
      val.complete();
    }, 2000);
  
  }

  reordenar_animales(indice:any){
        console.log(indice);

        this.animales = reorderArray(this.animales, indice);
  }


}
