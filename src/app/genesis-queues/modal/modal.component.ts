import { Component, ElementRef, EventEmitter, OnInit, Output,Input, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';
import { GenesysService } from 'src/app/services/genesys.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{

  @ViewChild('searchQueues') searchQueues!: ElementRef;
  @ViewChild('selectAllQueues') selectAllQueues!: ElementRef;

  @Input() selected_agents: any[] = [];
  @Output() savedQueues = new EventEmitter();

  constructor(private genesisService: GenesysService) { }  

  QUEUE: any[] = [];
  QUEUES_LIST: any[] = [];
  DATA_ALL_QUEUES: any[] = [];
  dataSource_queue: any[] = [];
  COLUMN_QUEUE_SELECT:string[] = [];
  spinnerActived: boolean = false;

  SELECTED_FILTER_QUEUES: any[] = [];
  SELECTED_QUEUES: any[] = [];  

  ITEMS_PER_PAGE: number[] = [10,20,30,40,50,60,70,80,90,100]
  num_item_page: number = 10;

  LIST_LANGUAGE: any[] = ["Language",[]]
  LIST_CALL_TYPE: any[] = ["Call Type",[]]
  LIST_PROVIDER: any[] = ["Provider",[]]

  num_pages: number = 0;
  current_page: number = 0
  next_page: number = 1

  panelOpenState = false;

  DATA_PREDEFINED_GROUP: any = {}

  column: string = "";

  teporaryHour: string = "";

  LIST_FALSE: any[] = [
    {
      "name": "Marve Mingardo",
      "active": false,
      "email": "mmingardo4@issuu.com",
      "queues": [],
      "skill": "provider",
      "license": "Cloud CX 3,*",
      "department": "Dish",
      "agent": "Agent 6",
      "manager": "Manager 4",
      "predefinedgroup": "Example Y"
    }, {
      "name": "Lillis Bursnell",
      "active": false,
      "email": "lbursnell5@woothemes.com",
      "queues": [],
      "skill": "provider",
      "license": "Cloud CX 3,*",
      "department": "AT&T",
      "agent": "Agent 5",
      "manager": "Manager 5",
      "predefinedgroup": "Example Y"
    }, {
      "name": "Loutitia Fritche",
      "active": false,
      "email": "lfritche6@ehow.com",
      "queues": [],
      "skill": "provider",
      "license": "Collaborate",
      "department": "CenturyLink",
      "agent": "Agent 1",
      "manager": "Manager 4",
      "predefinedgroup": "ATT P1 Cooper Overflow"
    }, {
      "name": "Reena Nettleship",
      "active": false,
      "email": "rnettleship7@shop-pro.jp",
      "queues": [],
      "skill": "queuename",
      "license": "Cloud CX 3,*",
      "department": "CenturyLink",
      "agent": "Agent 5",
      "manager": "Manager 5",
      "predefinedgroup": "Example Y"
    }, {
      "name": "Rance Exley",
      "skill": "calltypes",
      "license": "Cloud CX 3,*",
      "department": "AT&T",
      "agent": "Agent 1",
      "manager": "Manager 5",
      "predefinedgroup": "Example Y"
    }
  ]
  nameQueueOpen: string = ""

  ngOnInit(): void {
    this.getAllDataQueues(); 
    //this.getDataQueues();
    this.genesisService.getPredefinedGroup().subscribe(
      (data: any) =>{
        this.DATA_PREDEFINED_GROUP = data          
      }      
    )     
  }

  ngAfterViewInit(){
    
    fromEvent(this.searchQueues.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(800),
        distinctUntilChanged(),
        tap((text: any) => {
          let term = this.searchQueues.nativeElement.value;
          this.genesisService.searchQueues$(term)
                  
        })
      )
      .subscribe();
  }

  getAllDataQueues(){
    this.spinnerActived = true
    //setting
    let setting = {
      "pageNumber": this.next_page,
      "pageSize": this.num_item_page,
    }
    this.genesisService.getAllQueues$(setting).subscribe(
      (data: any)=>{
        console.log(data)
        this.dataSource_queue = data.entities
        this.num_pages = data.pageCount;
        this.current_page = data.pageNumber;
        this.spinnerActived = false
      }
      // (data: any)=>{
      //   this.DATA_ALL_QUEUES = data
  
      //   this.DATA_ALL_QUEUES.unshift(
      //     {
      //       "total_records": this.DATA_ALL_QUEUES.length,
      //       "num_pages" : Math.ceil(data.length/this.num_item_page),
      //       "current_page": "1"
      //     }
      //   )
        
      //   this.current_page = this.DATA_ALL_QUEUES[0].current_page;
      //   this.num_pages = this.DATA_ALL_QUEUES[0].num_pages;

      //   this.DATA_ALL_QUEUES.slice(1,this.num_item_page+1).forEach((element: any)=>{
      //     element.is_checked = false;
      //   })

      //   this.dataSource_queue = this.DATA_ALL_QUEUES.slice(1,this.num_item_page+1)

      //   this.DATA_ALL_QUEUES.slice(1).forEach((a:any)=>{

      //     if(a.language != undefined){
            
      //       if(this.LIST_LANGUAGE[1].indexOf(a.language) === -1){
      //         this.LIST_LANGUAGE[1].push(a.language)            
      //       }
      //     }
          
      //     if(this.LIST_CALL_TYPE[1].indexOf(a.calltype) === -1){
      //       this.LIST_CALL_TYPE[1].push(a.calltype)            
      //     }
      //     if(this.LIST_PROVIDER[1].indexOf(a.provider) === -1){
      //       this.LIST_PROVIDER[1].push(a.provider)            
      //     }
          
      //   })
      // }    
    )
    this.QUEUE = [
      this.fillList(this.LIST_LANGUAGE),
      this.fillList(this.LIST_CALL_TYPE),
      this.fillList(this.LIST_PROVIDER)
    ]
  }

  fillList(list: any): any{
    let list_queue: any = ["",[]]
    list_queue[0] = list[0]
    list[1].forEach((a:any)=>{    
      list_queue[1].push(
        {
          "column": list[0],
          "value": a
        }
      )
    })
    return list_queue;    
  }

  // getDataQueues(){
  //   this.genesisService.getDataModal$().subscribe(
  //     (data: any) => {    
  //       this.DATA_ALL_QUEUES = data        
  //       this.DATA_ALL_QUEUES.unshift(
  //         {
  //           "total_records": this.DATA_ALL_QUEUES.length,
  //           "num_pages" : Math.ceil(data.length/this.num_item_page).toString(),
  //           "current_page": "1"
  //         }
  //       )

  //       this.current_page = this.DATA_ALL_QUEUES[0].current_page;
  //       this.num_pages = this.DATA_ALL_QUEUES[0].num_pages;
  //       this.dataSource_queue = data.slice(1,this.num_item_page+1)
  //     }
  //   )
  // }

  setColumnQueue(item: any){    
    this.setQueues(item)
  }

  setQueues(item: any): void{

    if (this.QUEUES_LIST.indexOf(item) === -1) {
      this.QUEUES_LIST.push(item);
    }
    else {
      this.QUEUES_LIST.splice(this.QUEUES_LIST.indexOf(item), 1);
    } 
  }

  columnSelected(event: any,element: any){
    event.column = element.column    

    this.setPredefinedGroup(element.value,element.column);

    if(element.column.split(' ').length > 1){
      this.column =  element.column.replace(/\s+/g, '')
    }else{
      this.column = element.column;
    }

    if (this.COLUMN_QUEUE_SELECT.indexOf(element.value) === -1) {
      
      this.COLUMN_QUEUE_SELECT.push(element.value);
      this.SELECTED_FILTER_QUEUES.push(event)
    }
    else {     
      this.COLUMN_QUEUE_SELECT.splice(this.COLUMN_QUEUE_SELECT.indexOf(element.value), 1);
      this.SELECTED_FILTER_QUEUES.splice(this.SELECTED_FILTER_QUEUES.findIndex((a)=>a.column === element.column && a.target.value === element.value),1)
    }

    if(this.COLUMN_QUEUE_SELECT.length > 0){
      this.genesisService.searchByColumnQueue$(this.COLUMN_QUEUE_SELECT,this.column)
    }else{
      this.genesisService.getAllDataModal()     
    }
  }

  setPredefinedGroup(event: string, column:string){
     
    this.DATA_PREDEFINED_GROUP.data[column] == undefined?this.DATA_PREDEFINED_GROUP.data[column] = [event]:this.DATA_PREDEFINED_GROUP.data[column].indexOf(event)=== -1?this.DATA_PREDEFINED_GROUP.data[column].push(event):this.DATA_PREDEFINED_GROUP.data[column].splice(this.DATA_PREDEFINED_GROUP.data[column].indexOf(event),1)
    this.genesisService.addItem(this.DATA_PREDEFINED_GROUP)
  
  }

  selectQueues(event: any) {  
    this.checkValueAll(event.target.checked);
  }

  checkValueAll(checked: boolean){
    
    this.dataSource_queue.forEach((element: any) => {
      element.is_checked = checked
      if(element.is_checked){
        if(this.SELECTED_QUEUES.indexOf(element) === -1){
          this.SELECTED_QUEUES.push(element)
        }        
      }

    }) 

    /* deseleccionamos los queues en bloque que estan en la tabla de arriba */
    if(checked == false){
      this.dataSource_queue.forEach((element: any) => {
        this.SELECTED_QUEUES.splice(this.SELECTED_QUEUES.indexOf(element), 1)        
      })
    }
    console.log(this.SELECTED_QUEUES)
  }

  queueSelect(event: any,item:any){

    if(this.SELECTED_QUEUES.indexOf(item) === -1){
      this.SELECTED_QUEUES.push(item)
    }else{
      this.SELECTED_QUEUES.splice(this.SELECTED_QUEUES.indexOf(item), 1)
    }
    
    let count= 0;    
    
    if(event.target.checked == false){
      this.selectAllQueues.nativeElement.checked = false
      item.is_checked = false
      
    }else{
      item.is_checked = true
    }

    this.dataSource_queue.forEach((item: any)=>{

      if(item.is_checked == true){
        count++;
      }
      
    })

    if(count == this.num_item_page){
      this.selectAllQueues.nativeElement.checked = true
    }

    console.log(this.SELECTED_QUEUES)

  }
  
  save_Selected_Queues(){
    let text = "Are you sure to save the selected queues?.";
    if (confirm(text) == true) {
      this.saved();     
    } else {
      text = "Canceled!";
    }

    this.SELECTED_QUEUES.forEach((element: any) => {
      element.is_checked = false
    })
    this.selectAllQueues.nativeElement.checked = false;
  }

  saved(){ 
    let members: any = [];
    let memberId = {};
    this.selected_agents.forEach((a)=>{
      memberId = {
        "id": a.id
      } 
      members.push(memberId);     
    })
    
    console.log(this.selected_agents)
    this.SELECTED_QUEUES.forEach((a:any)=>{
      this.genesisService.addUsersToQueue$(a.id,members).subscribe(
        (data: any) =>{        
          console.log(data)
        }      
      )   
    })
    this.genesisService.setSelectedAgents(this.selected_agents);     
  }

  number_of_pages(num: number){
    this.num_item_page = num;
    this.genesisService.getAllDataModal()         
  }

  newPage(event: any){ 
    
    if(event === "next"){
      this.next_page++      
    }else{
      this.next_page--
    }

    let count = 0; 
    this.getAllDataQueues();
    this.dataSource_queue.forEach((item: any)=>{
      if(item.is_checked == true){
        count++;
      }

      if(count == this.num_item_page){
        this.selectAllQueues.nativeElement.checked = true
      }else{
        this.selectAllQueues.nativeElement.checked = false
      }      
    })
  }

  deleteFilter(filter: any){
    this.setPredefinedGroup(filter.target.value,filter.column);
    this.SELECTED_FILTER_QUEUES.splice(this.SELECTED_FILTER_QUEUES.indexOf(filter), 1);    
    this.COLUMN_QUEUE_SELECT.splice(this.COLUMN_QUEUE_SELECT.indexOf(filter.target.value), 1);
    filter.target.checked = false;

    if(this.COLUMN_QUEUE_SELECT.length > 0){
      this.genesisService.searchByColumnQueue$(this.COLUMN_QUEUE_SELECT,"language")
    }else{
      this.genesisService.getAllDataModal()     
    } 
  }

  activeTemporary(event: any,item: any){
    
    item.temporary = event.target.checked;  
  }

  addHour(hour: string,item: any){
    console.log(hour)
    item.hour = hour;
  }

  addDays(days: string,item: any){
    item.days = days;
  }

  onOptionsSelected(event: any) {
    const value = event.target.value;
    // this.selected = value;
    console.log(value);
  }

  removeAgent(item: any){
    let text = "Are you sure to remove the agent from the queue?";
    if (confirm(text) == true) {
      this.LIST_FALSE.splice(this.LIST_FALSE.indexOf(item), 1);    
    } else {
      text = "Canceled!";
    }
  }
}
