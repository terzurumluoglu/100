import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  path : string = 'https://puzzle-31694870.web.app/assets/sounds/';
  constructor() { }

  playAudio(file : string){
    let audio = new Audio();
    audio.src = this.path + file + '.wav';
    audio.load();
    audio.play();
  }

  playMove(){
    this.playAudio('move');
  }
  
  playWrong(){
    this.playAudio('wrong');
  }

  playSuccess(){
    this.playAudio('success');
  }
}
