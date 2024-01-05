import { Injectable } from '@angular/core';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor() { }

  playAudio(file : string){
    let audio = new Audio();
    audio.src = `${environment.assets}sounds/${file}.wav`;
    audio.load();
    audio.play();
  }

  move(){
    this.playAudio('move');
  }
  
  wrong(){
    this.playAudio('wrong');
  }

  success(){
    this.playAudio('success');
  }
}
