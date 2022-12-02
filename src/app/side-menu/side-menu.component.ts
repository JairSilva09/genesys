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
  levelSelect:boolean = false;
  NAME: any[] =[];

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
    "Agent","Manager","Department","Predefined Groups"
  ];

  QUEUE: any[] = [
    "Call Types", "Language", "Provider", "Queue Name"
  ]

  QUEUES_LIST: any[] = [
    "Queue 1", "Queue 2", "Queue 3", "Queue 4","Queue 5","Queue 6"
  ]

  SELECTED_OBJECTS: SetItems = {
    level: "",
    name :  [],
    nameQueue: "",
    queue : []
  }

  chosenLevel: string = "select menu";
  chosenQueue: string = "select menu";
  queueSelectList: boolean = false;  

  @Output() collapseExpandMenu = new EventEmitter();

  collapseMenu(){

    this.collapse = !this.collapse
    this.collapseExpandMenu.emit(this.collapse)

  }

  setNameLevel(level: string): void{
    if(level == "Agent"){
      this.NAME = this.AGENT;
    }

    if(level == "Manager"){
      this.NAME = this.MANAGER;
    }

    if(level == "Predefined Groups"){      
      this.NAME = this.PREDEFINEDGROUP;
    }

    if(level == "Department"){      
      this.NAME = this.DEPARTMENT;
    }
  }

  selectLevel(event: string){

    this.setNameLevel(event)
    this.levelSelect = true;
    this.SELECTED_OBJECTS.level = event
    this.genesisService.addItem(this.SELECTED_OBJECTS); 
    
  }

  chequedBoxName(item: any){
    if(this.SELECTED_OBJECTS.name.indexOf(item) === -1){
      return false      
    }else{
      return true
    }   
  }

  nameItemSelected(event: any){  

    if (this.SELECTED_OBJECTS.name.indexOf(event.target.value) === -1) {
      this.SELECTED_OBJECTS.name.push(event.target.value);
    }
    else {
      this.SELECTED_OBJECTS.name.splice(this.SELECTED_OBJECTS.name.indexOf(event.target.value), 1);
    }
  
    this.genesisService.addItem(this.SELECTED_OBJECTS)
  }

  selectQueue(event: any){    
    this.queueSelectList = true;
    this.SELECTED_OBJECTS.nameQueue = event;
    this.genesisService.addItem(this.SELECTED_OBJECTS)
  }

  close_queue_list(){
    this.queueSelectList = false;
  }

  chequedBoxQueue(item: any){
    if(this.SELECTED_OBJECTS.queue.indexOf(item) === -1){
      return false      
    }else{
      return true
    }
  }

  selectedQueue(event: any,item: any){    

    if (this.SELECTED_OBJECTS.queue.indexOf(item) === -1) {
      this.SELECTED_OBJECTS.queue.push(item);
    }
    else {
      this.SELECTED_OBJECTS.queue.splice(this.SELECTED_OBJECTS.queue.indexOf(item), 1);
    } 
    
    this.genesisService.addItem(this.SELECTED_OBJECTS)

  }  
}
