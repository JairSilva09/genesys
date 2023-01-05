import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GenesysService, SetItems } from '../../services/genesys.service';

@Component({
  selector: 'app-modal-predefined-group',
  templateUrl: './modal-predefined-group.component.html',
  styleUrls: ['./modal-predefined-group.component.scss']
})
export class ModalPredefinedGroupComponent implements OnInit {

  constructor(private genesisService: GenesysService) {}

  GROUPS: any[] = []
  predefinedGroup = "no group"

  ngOnInit(): void {
    this.genesisService.getPredefinedGroup$().subscribe(
      (data: any) =>{
        this.GROUPS = []
        this.predefinedGroup = data.predefineGruopName;
        Object.keys(data.data).forEach((key: any)=>{
          this.GROUPS.push(
            data.data[key].length > 0?[key,[data.data[key]]]:[]
          )
        })
      }  
    ) 
       
  }

  loadGroups(){    

  }

}
