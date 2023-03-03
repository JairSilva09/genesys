import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';
import { GenesysService } from '../services/genesys.service';
import {Sort} from '@angular/material/sort';

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
  data_table_selected_agents: any[] = [
    {
      "id": "c17254c4-4f9b-47c2-b1f7-a58b1a894bf4",
      "name": "Armani Ahmed",
      "department": "HughesNet",
    },
    {
      "id": "18c615ba-798e-454f-a87c-50ee1cbe8fed",
      "name": "Adrian Lara Perez",
      "department": "AT&T",
    }
  ];
  
  num_pages: number = 0;
  current_page: number = 0;
  next_page: number = 1;
  ITEMS_PER_PAGE: number[] = [10,20,30,40,50,60,70,80,90,100]
  num_item_page: number = 10;

  layout: string = "Horizontal"

  sortedData: any[] = [];
  spinnerActived: boolean = false;
  
  chosenLevel: string = "select menu";
  chosenQueue: string = "select menu";

  nameItem: any;
  levelSelect:boolean = false;
  queueSelectList: boolean = false;

  data: any= [];
  DATA_ALL: any[] = [];
  dataSource: any[] = [];
  observableSubs: any;

  constructor(private genesisService: GenesysService) {}

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

  showTableAgents: boolean = true;
  showTableGroupPredenined : boolean = false;

  ngOnInit(): void {

    /*we call the method to do the login*/
    //this.getLogin();
    const token = "KN29zylryyzOUNvv0OQf-HJV7NrwPkfrkZ91ZbKMB8l_wc1YZSHEZWU3_cdOWSXrkva7WNU1qceWFqrvmlppjw"
    localStorage.setItem('token', token);

    this.getAllAgents();

    this.genesisService.getActiveTable$().subscribe((data)=>{
      if(data === "predefined group"){
        this.showTableAgents= false;
        this.showTableGroupPredenined = true;        
      }else{
        this.showTableAgents = true;
        this.showTableGroupPredenined= false;
      }
    })
   
    this.genesisService.setSelectedAgents(this.data_table_selected_agents); 
  }
  //------------------------------------------------------------//
  /*We do the login, it must return a token*/

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

  /*We call the getAllAgents$ endpoint in the service
   that will bring us the agebts depending
    on the configuration */

  getAllAgents(){
    this.spinnerActived = true
    //setting
    // let setting = {
    //   "pageNumber": this.next_page,
    //   "pageSize": this.num_item_page,
    //   "keyword": "Burke"
    // }

    let setting = {
      "pageNumber": "",
      "pageSize": 0,
      "keyword": "Burke"
    }
    
    this.genesisService.getAllAgents$(setting).subscribe(
      (data: any)=>{
        this.sortedData = data.data.entities;        
        this.num_pages = data.data.pageCount;
        this.current_page = data.data.pageNumber;
        this.spinnerActived = false
        console.log(data)
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

  /*This method is called when clicking on any of the pager buttons*/
  newPage(page: string){

    if(page === "next"){
      this.next_page++      
    }else{
      this.next_page--
    }

    /*we initialize the counter of selected agents in the new page */
    let count = 0;

    this.getAllAgents()
  
    this.dataSource.forEach((item: any)=>{

      if(item.is_checked == true){
        count++;
      }

      //checkbox
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
    this.showTableAgents = true;
    this.showTableGroupPredenined= false;    
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
    console.log(this.SELECTED_AGENTS)
    this.showTableAgents = true;
    this.showTableGroupPredenined= false;
  }

  number_of_pages(num: number){
    this.num_item_page = num;
    this.getAllAgents();    
  }

  addQueues(event: any){
    
    let AgentQueues: any[] = []
    this.genesisService.getAgentSelecteds().subscribe((data)=>{

      if(data.length > 0){

        let b = {}
        let newObject; 
        
        //selected agent data        
        data.forEach((element: any) => {

          AgentQueues = [];

          if(element.queues.length > 0){
            element.queues.forEach((a: any) =>{
              newObject = Object.assign(b,a)
              AgentQueues.push(newObject)            
            })
          }
          
                   
          event.forEach((a:any)=>{
            b = {}
            Object.assign(b,a)            
            AgentQueues.push(b)
          })
          element.queues = AgentQueues
        })
        
        this.data_table_selected_agents = data
        this.SELECTED_AGENTS.forEach((a)=>{
          a.is_checked = false
        })
        this.SELECTED_AGENTS = []      
      }else{
        console.log("no agents selected")
      }      
    })
  }

  /*We configure the layout of the page: horizontal or vertical */

  setLayout(value: string){

    if(value == "Vertical"){
      this.layout = "Horizontal"
    }else{
      this.layout = "Vertical"
    }
  }

  sortData(sort: Sort){
    const data = this.dataSource.slice();

    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'department':
          return this.compare(a.department, b.department, isAsc);
        case 'agent':
          return this.compare(a.agent, b.agent, isAsc);
        case 'manager':
          return this.compare(a.manager, b.manager, isAsc);
        case 'predefinedgroup':
          return this.compare(a.predefinedgroup, b.predefinedgroup, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
