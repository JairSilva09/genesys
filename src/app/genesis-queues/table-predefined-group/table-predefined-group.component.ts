import { Component,OnInit} from '@angular/core';
import { GenesysService } from 'src/app/services/genesys.service';

@Component({
  selector: 'app-table-predefined-group',
  templateUrl: './table-predefined-group.component.html',
  styleUrls: ['./table-predefined-group.component.scss']
})
export class TablePredefinedGroupComponent implements OnInit{

  constructor(private genesisService: GenesysService) { }  

  dataSource: any[] = [];  

  ngOnInit(): void{
    
    this.getPredefinedGroup()
    this.getPredefinedNewGroup()
   
  }

  getPredefinedGroup(){
    this.genesisService.getPredefinedGroupAgents().subscribe(
      (data: any) =>{
        this.dataSource = data    
      }      
    )    
  }

  getPredefinedNewGroup(){
    this.genesisService.getPredefinedGroupAgents$().subscribe(
      (data: any) =>{
        this.dataSource = data    
      }      
    )    
  }

}


