import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-shoping-options',
  templateUrl: 'shoping-options.html'
})
export class ShopingOptionsPage {

  constructor(private viewCtrl: ViewController) { }

  onAction(action: string) {
    this.viewCtrl.dismiss({ action: action });
  }

}
