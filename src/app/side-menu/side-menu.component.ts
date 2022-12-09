import { Component, EventEmitter, Output } from '@angular/core';
import { GenesysService, SetItems } from '../services/genesys.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})

export class SideMenuComponent  {

  constructor(private genesisService: GenesysService) { }

  collapse: boolean = false;

  NAME: any[] =[];

  NAME_ITEM: any[] =[];

  AGENT: any[] =[
    "Agent 1","Agent 2","Agent 3","Agent 4","Agent 5","Agent 6"
  ]

  MANAGER: any[] =[
    "Manager 1","Manager 2","Manager 3","Manager 4","Manager 5","Manager 6"
  ];
  DEPARTMENT: any[] =[
    "AT&T","CenturyLink","Cable","Dish","Frontier","HughesNet"
  ];

  PREDEFINEDGROUP: any[] =[
    "ATT P1 Cooper Overflow","ATT P1 Fiber Overflow","Hughes Backup","Example Y","Example Z"
  ];

  LEVEL: any[] =[
    [
      "Agent",["Agent 1","Agent 2","Agent 3","Agent 4","Agent 5","Agent 6"]
    ],
    [
      "Manager",["Manager 1","Manager 2","Manager 3","Manager 4","Manager 5","Manager 6"]
    ],
    [
      "Department",["AT&T","CenturyLink","Cable","Dish","Frontier","HughesNet"]
    ],
    [
      "Predefined Group",["ATT P1 Cooper Overflow","ATT P1 Fiber Overflow","Hughes Backup","Example Y","Example Z"]
    ]
    
  ];

  NAME_LEVEL_SELECT:string[] = [];

  QUEUE: any[] = [
    "Call Types", "Language", "Provider", "Queue Name"
  ]

  QUEUES_LIST: any[] = [
    "Queue 1", "Queue 2", "Queue 3", "Queue 4","Queue 5","Queue 6"
  ]

  SELECTED_OBJECTS = {
    level: "",
    name :  [],
    nameQueue: "",
    queue : []
  }

  chosenLevel: string = "select menu";
  chosenQueue: string = "select menu";
  queueSelectList: boolean = false;  

  current_page: string = "1"

  @Output() collapseExpandMenu = new EventEmitter();

  collapseMenu(){

    this.collapse = !this.collapse
    this.collapseExpandMenu.emit(this.collapse)

  }

  setNameLevel(level: any): void{

    if (this.NAME.indexOf(level) === -1) {
      this.NAME.push(level);
    }
    else {
      this.NAME.splice(this.NAME.indexOf(level), 1);
    } 
  
  }

  selectLevel(event: any){  
    this.setNameLevel(event)   
  } 

  nameItemSelected(event: any, column: string){

    if(column.split(' ').length > 1){
      column =  column.replace(/\s+/g, '')
    }
 
    if (this.NAME_LEVEL_SELECT.indexOf(event.target.value) === -1) {
      this.NAME_LEVEL_SELECT.push(event.target.value);
    }
    else {
      this.NAME_LEVEL_SELECT.splice(this.NAME_LEVEL_SELECT.indexOf(event.target.value), 1);
    }

    if(this.NAME_LEVEL_SELECT.length > 0){
      this.genesisService.searchByLevelName$(this.NAME_LEVEL_SELECT,column,this.current_page)
    }else{
      this.genesisService.getAllDirectory()     
    }
  }

  close_queue_list(){
    this.queueSelectList = false;
  }

}
