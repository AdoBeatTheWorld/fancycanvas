import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('content') content:ElementRef;
  constructor(public navCtrl: NavController) {
    console.log(window.innerWidth,window.innerHeight);
  }

  ionViewDidLoad(){
    var type = "WEBGL";
    if(!PIXI.utils.isWebGLSupported){
      type = "canvas";
    }
    PIXI.utils.sayHello(type);
    
    var app = new PIXI.Application(window.innerWidth, window.innerHeight,{backgroundColor:0x1099bb});
    this.content.nativeElement.appendChild(app.view);

    let bg = new PIXI.Graphics();
    bg.beginFill(0xcccccc,0.6);
    bg.drawRect(0,0,window.innerWidth, window.innerHeight);
    bg.endFill();

    bg.interactive = true;
    app.stage.addChild(bg);
    bg.on('pointerdown',onClick);
    bg.on('pointermove',onMove);
    bg.on('pointerup', onUp);
    function onClick(evt){
      let pos = evt.data.getLocalPosition(this.parent);
      bg.beginFill(Math.random()*0xffffff,1);
      bg.drawCircle(pos.x, pos.y,5);
      bg.endFill();
      lastPos = pos;
    }
    var lastPos = null;
    function onMove(evt){
      let pos = evt.data.getLocalPosition(this.parent);
      bg.lineStyle(2,Math.random()*0xffffff,1);
      bg.moveTo(lastPos.x,lastPos.y);
      bg.lineTo(pos.x, pos.y);
      lastPos = pos;
    }

    function onUp(evt){
      let pos = evt.data.getLocalPosition(this.parent);
      bg.lineStyle(2,Math.random()*0xffffff,1);
      bg.moveTo(lastPos.x,lastPos.y);
      bg.lineTo(pos.x, pos.y);
      lastPos = null;
      bg.beginFill(Math.random()*0xffffff,1);
      bg.drawCircle(pos.x, pos.y,5);
      bg.endFill();
    }
  }
}
