import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-agents',
  templateUrl: './table-agents.component.html',
  styleUrls: ['./table-agents.component.scss']
})
export class TableAgentsComponent {
  
 loadModalQueue:boolean = false;

  @Input() selected_agents: any[] = [];
 

  removeQueue(list: any,queue: any){

    if (confirm("Are you sure you want to remove this queue from the agent list?") == true) {
      list.splice(list.indexOf(queue), 1);
    } else {
      console.log("Cancel")
    }

  }

}
