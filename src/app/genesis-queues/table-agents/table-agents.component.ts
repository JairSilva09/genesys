import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-agents',
  templateUrl: './table-agents.component.html',
  styleUrls: ['./table-agents.component.scss']
})
export class TableAgentsComponent {
  
  queue: any;
  agent: any;
  nameQueue: string = "";

  @Input() selected_agents: any[] = [];
  
  activeRemoveQueue(agent: any, queue: any){
    this.queue = queue;
    this.agent = agent;
    this.nameQueue = queue.queuename
    console.log(agent.queues)
    console.log(queue)
  }

  activateQueue(){
    this.queue.active = true
  }

  removeQueue(){
    this.agent.queues.splice(this.agent.queues.indexOf(this.queue), 1);
  }

}
