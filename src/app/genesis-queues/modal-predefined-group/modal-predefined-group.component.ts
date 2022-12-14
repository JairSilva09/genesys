import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-predefined-group',
  templateUrl: './modal-predefined-group.component.html',
  styleUrls: ['./modal-predefined-group.component.scss']
})
export class ModalPredefinedGroupComponent implements OnInit {

  @Input() GROUPS: string[]=[];  

  ngOnInit(): void {
    this.loadGroups()      
  }

  loadGroups(){    

  }

}
