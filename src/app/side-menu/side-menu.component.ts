import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GenesysService, SetItems } from '../services/genesys.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})

export class SideMenuComponent implements OnInit {

  constructor(private genesisService: GenesysService) {}

  ngOnInit(): void {

    this.genesisService.getPredefinedGroup().subscribe(
      (data: any) =>{
        this.DATA_PREDEFINED_GROUP = data
        console.log(data)     
      }      
    )       
  }

  collapse: boolean = false;

  NAME: any[] =[];

  NAME_ITEM: any[] =[]; 

  LEVEL: any[] =[    
    [
      "Manager",["Manager 1","Manager 2","Manager 3","Manager 4","Manager 5","Manager 6"]
    ],
    [
      "Department",["AT&T","CenturyLink","Cable","Dish","Frontier","HughesNet"]
    ]
    
  ];

  PREDEFINED_GROUPS: any[]=[
    [
      "Group 1",[]
    ],
    [
      "Group 2",[]
    ],
    [
      "Group 3",[]
    ]
  ]

  predefinedGroup: any;
  eventChecked: any;

  NAME_LEVEL_SELECT:string[] = [];

  QUEUE: any[] = [
    "Call Types", "Language", "Provider", "Queue Name"
  ]

  QUEUES_LIST: any[] = [
    "Queue 1", "Queue 2", "Queue 3", "Queue 4","Queue 5","Queue 6"
  ]

  SELECTED_FILTERS: any[] = [];
  DATA_PREDEFINED_GROUP: any = {}

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
  
    let elm  = {
      "column": column,
      "event": event
    }

    this.setPredefinedGroup(event.target.value,column);

    if(column.split(' ').length > 1){
      column =  column.replace(/\s+/g, '')
    }
 
    if (this.NAME_LEVEL_SELECT.indexOf(event.target.value) === -1) {
      
      this.NAME_LEVEL_SELECT.push(event.target.value);
      this.SELECTED_FILTERS.push(elm)
    }
    else {

      if(this.SELECTED_FILTERS.indexOf(elm) == -1){
        console.log("no existe")
      }
  
      this.NAME_LEVEL_SELECT.splice(this.NAME_LEVEL_SELECT.indexOf(event.target.value), 1);
      this.SELECTED_FILTERS.splice(this.SELECTED_FILTERS.indexOf(elm),1)
    }

    if(this.NAME_LEVEL_SELECT.length > 0){
      this.genesisService.searchByLevelName$(this.NAME_LEVEL_SELECT,column)
    }else{
      this.genesisService.getAllDirectory()     
    }
  
  }

  selectedPredefinedGroup(event: any,item: any){
    this.eventChecked = event
    this.predefinedGroup = item;
  }

  addToPredefinedGroup(){
    let x:any[] = []
    this.genesisService.getAgentSelecteds().subscribe((data)=>{

      data.forEach((element) => {
        x.push(element)
      })

      this.eventChecked.target.checked = false;
      alert("agents added to predefined group "+this.predefinedGroup[0])  
      
    })
    this.predefinedGroup[1].push(x)
  }

  lowPredefinedGroup(group: any){
    console.log(group)
    this.genesisService.setGroupData(group)
    this.genesisService.setActiveTable("predefined group")
  }

  setPredefinedGroup(event: string, column:string){
    if(column == "Predefined Group"){
      this.DATA_PREDEFINED_GROUP.predefineGruopName = event;
    }else{
      this.DATA_PREDEFINED_GROUP.data[column] == undefined?this.DATA_PREDEFINED_GROUP.data[column] = [event]:this.DATA_PREDEFINED_GROUP.data[column].indexOf(event)=== -1?this.DATA_PREDEFINED_GROUP.data[column].push(event):this.DATA_PREDEFINED_GROUP.data[column].splice(this.DATA_PREDEFINED_GROUP.data[column].indexOf(event),1)
    }

    this.genesisService.addItem(this.DATA_PREDEFINED_GROUP)   
  }

  deleteFilter(filter: any){
   
    this.setPredefinedGroup(filter.event.target.value,filter.column);
    this.SELECTED_FILTERS.splice(this.SELECTED_FILTERS.indexOf(filter), 1);    
    this.NAME_LEVEL_SELECT.splice(this.NAME_LEVEL_SELECT.indexOf(filter.event.target.value), 1);
    filter.event.target.checked = false;

    if(this.NAME_LEVEL_SELECT.length > 0){
      this.genesisService.searchByLevelName$(this.NAME_LEVEL_SELECT,"department")
    }else{
      this.genesisService.getAllDirectory()     
    }
  }

  close_queue_list(){
    this.queueSelectList = false;
  }

}
