import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

  collapse: boolean = false;

  @Output() collapseExpandMenu = new EventEmitter();

  collapseMenu(){
    this.collapse = !this.collapse

    this.collapseExpandMenu.emit(this.collapse)
    console.log(this.collapse)   

  }

}
