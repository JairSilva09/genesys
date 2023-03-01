import { Component, Input, OnInit } from '@angular/core';
import { GenesysService } from 'src/app/services/genesys.service';

@Component({
  selector: 'app-table-agents',
  templateUrl: './table-agents.component.html',
  styleUrls: ['./table-agents.component.scss']
})
export class TableAgentsComponent implements OnInit {
  loadModalQueue:boolean = false;
  loadModalGroups: boolean = false;
  spinnerActived: boolean = false;

  @Input() selected_agents: any[] = [];

  constructor(private genesisService: GenesysService) { } 

  ngOnInit(): void {
    this.selected_agents.forEach((a)=>{
      this.getQueuesAgent(a);
    })    
    console.log(this.selected_agents)
    this.genesisService.getSelectedAgents$().subscribe(
      (data: any) =>{
        console.log(data)
        data.forEach((a: any)=>{
          this.getQueuesAgent(a);
        })         
      }
    )   
    
  }
  
  getQueuesAgent(user: any){
    
    this.genesisService.getQueueToUser$(user.id).subscribe(
      (data: any) =>{
        user.queues = data.entities         
      }      
    )
    
  }

  activeDesactive(queue: any,idUser: string){
    this.genesisService.activeDesactiveQueue$(queue,idUser).subscribe(
      (data: any) =>{
        console.log(data)
        if ('message' in data) {
          console.log(data.message)
        }else{
          queue.joined = !data.joined
        }            
      }      
    )
  }
 
  removeQueue(idQueue: string,user: any){

    if (confirm("Are you sure you want to remove this queue from the agent list?") == true) {
      this.genesisService.removeQueue$(idQueue,user.id).subscribe(
        (data: any) =>{
          console.log(data)
          this.genesisService.getQueueToUser$(user.id).subscribe(
            (data: any) =>{
              console.log(data)
              user.queues = data.entities         
            }      
          )                     
        }  
      )
    } else {
      console.log("Cancel")
    }

  }

}
