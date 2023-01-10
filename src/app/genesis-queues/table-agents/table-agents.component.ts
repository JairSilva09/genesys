import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-agents',
  templateUrl: './table-agents.component.html',
  styleUrls: ['./table-agents.component.scss']
})
export class TableAgentsComponent {

  @Input() selected_agents: any[] = [];  

}
