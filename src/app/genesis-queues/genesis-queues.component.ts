import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';
import { GenesysService } from '../services/genesys.service';

@Component({
  selector: 'app-genesis-queues',
  templateUrl: './genesis-queues.component.html',
  styleUrls: ['./genesis-queues.component.scss']
})
export class GenesisQueuesComponent implements OnInit{

  @ViewChild('queues') queues!: MatListModule;
  @ViewChild('checkboxName') checkboxName!: MatListModule;
  @ViewChild('searchBar') searchBar!: ElementRef;
  @ViewChild('selectAllItems') selectAllItems!: ElementRef;

  settingItems: any;
  setSelectedItems: any;

  SELECTED_AGENTS: any[] = [];
  data_table_selected_agents: any[] = [];
  
  num_pages: string = "";
  current_page: string = "1";
  ITEMS_PER_PAGE: number[] = [10,20,30,40,50,60,70,80,90,100]
  num_item_page: number = 10;

  constructor(private genesisService: GenesysService) { }

  user = {
    client_id: "45fe7e80-b705-4f0c-bca8-d98d3f70afa5",
    client_secret: "8MF2n5JccmAqRVSZ7NSVJl18z6PZfbZunB5nac-vOaU"
  }

  SKILL_SELECT: any[] =[]

  NAME: any[] =[];
  MANAGER: any[] =[
    "Manager 1","Manager 2","Manager 3","Manager 4","Manager 5","Manager 6"
  ];

  DEPARTMENT: any[] =[
    "AT&T","CenturyLink","Cable","Dish","Frontier","HughesNet"
  ];

  PREDEFINEDGROUP: any[] =[
    "Group 1","Group 2","group 3"
  ];

  QUEUE: any[] = [];

  loadModalQueue:boolean = false;
  loadModalGroups: boolean = false;
  showTableAgents: boolean = true;
  showTableGroupPredenined : boolean = false;

  ngOnInit(): void {

    /*llamamos la funcion para hecer el login*/
    //this.getLogin();
    const token = "KN29zylryyzOUNvv0OQf-HJV7NrwPkfrkZ91ZbKMB8l_wc1YZSHEZWU3_cdOWSXrkva7WNU1qceWFqrvmlppjw"
    localStorage.setItem('token', token);

    //this.getAllAgents();

    this.getAll();
    this.getDirectory(); 

    this.genesisService.getActiveTable$().subscribe((data)=>{
      console.log(data)
      if(data === "predefined group"){
        this.showTableAgents= false;
        this.showTableGroupPredenined = true;        
      }else{
        this.showTableAgents = true;
        this.showTableGroupPredenined= false;
      }
    })


    
    // this.genesisService.getAgent$("1").subscribe(
    //   (data: any)=>{
    //     console.log(data)
    //   }
    // )
  }
  //------------------------------------------------------------//
  /*Hacemos el login nos debe devolver un token */

   getLogin(){

    this.genesisService.getLogin().subscribe((response: any)=>{
      if( response && response.token ){
        localStorage.setItem('token', response.token);
        localStorage.setItem('refresh_token', response.refresh_token);
      }else{
        if( response.error ){
          console.log(response.error);
          return response.error;
        }
      }
    })
    
  }

  getAllAgents(){
    this.genesisService.getAllAgents$("1").subscribe(
      (data: any)=>{
        console.log(data.entities)
      }
    )
  }
//------------------------------------------------------------//
  ngAfterViewInit(){

    fromEvent(this.searchBar.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(800),
        distinctUntilChanged(),
        tap((text: any) => {
          let term = this.searchBar.nativeElement.value;
          this.genesisService.search$(term)

        })
      )
      .subscribe();
  }

  chosenLevel: string = "select menu";
  chosenQueue: string = "select menu";

  nameItem: any;
  levelSelect:boolean = false;
  queueSelectList: boolean = false;

  data: any= [];
  DATA_ALL: any[] = [];
  dataSource: any[] = [];
  observableSubs: any;

  getDirectory(): void{
    this.genesisService.getDirectory$().subscribe(
      (data: any) => {

        this.DATA_ALL = data
        this.DATA_ALL.unshift(
          {
            "total_records": this.DATA_ALL.length,
            "num_pages" : Math.ceil(data.length/this.num_item_page).toString(),
            "current_page": "1"
          }
        )

        this.current_page = this.DATA_ALL[0].current_page;
        this.num_pages = this.DATA_ALL[0].num_pages;
        this.dataSource = data.slice(1,this.num_item_page+1)        
      }
    )
  }

  getAll(): void{    

    this.genesisService.getAllDirectory$(this.current_page).subscribe(
      (data: any)=>{
        console.log(data.entities)
        this.DATA_ALL = data

        this.DATA_ALL.unshift(
          {
            "total_records": this.DATA_ALL.length,
            "num_pages" : Math.ceil(data.length/this.num_item_page).toString(),
            "current_page": "1"
          }
        )
        this.current_page = this.DATA_ALL[0].current_page;
        this.num_pages = this.DATA_ALL[0].num_pages;

        this.DATA_ALL.slice(1,this.num_item_page+1).forEach((element: any)=>{
          element.is_checked = false;
        })
        this.dataSource = this.DATA_ALL.slice(1,this.num_item_page+1)
      }

    )
  }

  getTextSetting(obj: any){
    let text = "";
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            text += obj[key]+" ";
        }
      }
    text += "\n"
    this.settingItems = text;
  }

  setNameLevel(level: string): void{

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

  // selectLevel(event: string){

  //   this.setNameLevel(event)
  //   this.levelSelect = true;
  //   this.SELECTED_OBJECTS.level = event
  //   this.genesisService.addItem(this.SELECTED_OBJECTS);

  // }

  // selectQueue(event: any){
  //   this.queueSelectList = true;
  //   this.SELECTED_OBJECTS.nameQueue = event;
  //   this.genesisService.addItem(this.SELECTED_OBJECTS)
  // }

  // nameItemSelected(event: any){

  //   if (this.SELECTED_OBJECTS.name.indexOf(event.target.value) === -1) {
  //     this.SELECTED_OBJECTS.name.push(event.target.value);
  //   }
  //   else {
  //     this.SELECTED_OBJECTS.name.splice(this.SELECTED_OBJECTS.name.indexOf(event.target.value), 1);
  //   }

  //   this.genesisService.addItem(this.SELECTED_OBJECTS)
  // }

  // remove_name_selected(item: any){
  //   this.SELECTED_OBJECTS.name.splice(this.SELECTED_OBJECTS.name.indexOf(item), 1);
  //   this.genesisService.addItem(this.SELECTED_OBJECTS)
  // }

  // chequedBoxName(item: any){
  //   if(this.SELECTED_OBJECTS.name.indexOf(item) === -1){
  //     return false
  //   }else{
  //     return true
  //   }
  // }

  // selectedQueue(event: any,item: any){

  //   if (this.SELECTED_OBJECTS.queue.indexOf(item) === -1) {
  //     this.SELECTED_OBJECTS.queue.push(item);
  //   }
  //   else {
  //     this.SELECTED_OBJECTS.queue.splice(this.SELECTED_OBJECTS.queue.indexOf(item), 1);
  //   }

  //   this.genesisService.addItem(this.SELECTED_OBJECTS)

  // }

  // removeQueue(item: any){
  //   this.SELECTED_OBJECTS.queue.splice(this.SELECTED_OBJECTS.queue.indexOf(item), 1);
  //   this.genesisService.addItem(this.SELECTED_OBJECTS)
  // }

  // chequedBoxQueue(item: any){
  //   if(this.SELECTED_OBJECTS.queue.indexOf(item) === -1){
  //     return false
  //   }else{
  //     return true
  //   }
  // }

  close_queue_list(){
    this.queueSelectList = false;
  }

  skillSelect(event: any){
    if (this.SKILL_SELECT.indexOf(event.target.value) === -1) {
      this.SKILL_SELECT.push(event.target.value);
    }
    else {
        this.SKILL_SELECT.splice(this.SKILL_SELECT.indexOf(event.target.value), 1);
    }

    if(this.SKILL_SELECT.length > 0){
      this.genesisService.searchBySkill$(this.SKILL_SELECT)
    }else{
      this.genesisService.getAllDirectory();
    }
  }

  newPage(event: any){
    let count = 0;
    this.dataSource = event.slice(1);
    this.current_page = event[0].current_page;
    this.dataSource.forEach((item: any)=>{

      if(item.is_checked == true){
        count++;
      }

      if(count == this.num_item_page){
        this.selectAllItems.nativeElement.checked = true
      }else{
        this.selectAllItems.nativeElement.checked = false
      }

    })    
  }

  alertCheckbox(event: any) {
    this.checkValueAll(event.target.checked);
  }

  checkValueAll(checked: boolean){
    this.dataSource.forEach((element: any) => {

      element.is_checked = checked

      if(element.is_checked){
        if(this.SELECTED_AGENTS.indexOf(element) === -1){
          this.SELECTED_AGENTS.push(element)
        }        
      }

    })
    
    /* deseleccionamos los agentes en bloque que estan en la tabla de arriba */
    if(checked == false){
      this.dataSource.forEach((element: any) => {
        this.SELECTED_AGENTS.splice(this.SELECTED_AGENTS.indexOf(element), 1)        
      })
    }

    this.genesisService.setAgentSelecteds(this.SELECTED_AGENTS)
    this.data_table_selected_agents = this.SELECTED_AGENTS    
  }

  itemSelect(event: any,item:any){
   
    if(this.SELECTED_AGENTS.indexOf(item) === -1){
      this.SELECTED_AGENTS.push(item)
    }else{
      this.SELECTED_AGENTS.splice(this.SELECTED_AGENTS.indexOf(item), 1)
    }

    let count= 0;

    if(event.target.checked == false){
      this.selectAllItems.nativeElement.checked = false
      item.is_checked = false

    }else{
      item.is_checked = true
      this.dataSource.forEach((item: any)=>{

        if(item.is_checked == true){
          count++;
        }
      })

      if(count == this.num_item_page){
        this.selectAllItems.nativeElement.checked = true
      }
    }
    this.genesisService.setAgentSelecteds(this.SELECTED_AGENTS)
    this.data_table_selected_agents = this.SELECTED_AGENTS
  }

  number_of_pages(num: number){
    this.num_item_page = num;
    this.genesisService.getAllDirectory();
  }

  addQueues(event: any){
    console.log(event)
    let x:any[] = []
    let AgentQueues: any[] = []
    this.genesisService.getAgentSelecteds().subscribe((data)=>{

      if(data.length > 0){

        let b = {}
        let newObject;       

        data.forEach((element: any) => {
          AgentQueues = [];

          element.queues.forEach((a: any) =>{
            newObject = Object.assign(b,a)
            AgentQueues.push(newObject)            
          })
          
          event.forEach((a:any)=>{
            AgentQueues.push(a)
          })

          element.queues = AgentQueues
        
        })
        
        this.data_table_selected_agents = data
        console.log(this.SELECTED_AGENTS)
      
      }else{
        console.log("no agents selected")
      }      
    })

  }

}
