import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor() { }

  playAudio(file : string){
    let audio = new Audio();
    audio.src = '../../../assets/sounds/' + file + '.wav';
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
