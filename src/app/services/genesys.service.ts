import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, of,throwError } from 'rxjs';
import { DATA,DATA_QUEUE } from './mock-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Buffer} from 'buffer';

let clientId = '45fe7e80-b705-4f0c-bca8-d98d3f70afa5';
let clientSecret = '8MF2n5JccmAqRVSZ7NSVJl18z6PZfbZunB5nac-vOaU';

let encodedData = Buffer.from(clientId + ':' + clientSecret).toString('base64');
let authorizationHeaderString = 'Basic ' + encodedData;

const httpOptions = {
  headers:  new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": authorizationHeaderString
  })
};

export interface SetItems {
  name: string,
  active: boolean,
  email: string,
  queues: string,
  skill:  string,
  license: string
}

@Injectable({
  providedIn: 'root'
})

export class GenesysService {

  constructor(private http: HttpClient) {}

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

  // private baseUrl = "https://api.usw2.pure.cloud";
  private baseUrl = "https://isg-br-uat01/isg-gateways/public/index.php/";
  private loginUrl = "https://login.usw2.pure.cloud/oauth/token";
  token =  ''

 /*Hacemos el login */

  getLogin(){

    const formData: FormData = new FormData();
    formData.append('Username', '45fe7e80-b705-4f0c-bca8-d98d3f70afa5');
    formData.append('Password', '8MF2n5JccmAqRVSZ7NSVJl18z6PZfbZunB5nac-vOaU');

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    // myHeaders.append("Accept", "application/json");


    // var clientId = '45fe7e80-b705-4f0c-bca8-d98d3f70afa5';
    // var clientSecret = '8MF2n5JccmAqRVSZ7NSVJl18z6PZfbZunB5nac-vOaU';
    // var encodedData = window.btoa(clientId + ':' + clientSecret);
    // var authorizationHeaderString = 'Authorization: Basic ' + encodedData;

    // myHeaders.append("Authorization", 'Basic '+encodedData);

    // var urlencoded = new URLSearchParams();
    // urlencoded.append("grant_type", "formData");

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: urlencoded
    // };

    // fetch("https://login.usw2.pure.cloud/oauth/token", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));

  //-----------------------------------------------------------------//

    let clientId = '45fe7e80-b705-4f0c-bca8-d98d3f70afa5';
    let clientSecret = '8MF2n5JccmAqRVSZ7NSVJl18z6PZfbZunB5nac-vOaU';
    let encodedData = Buffer.from(clientId + ':' + clientSecret).toString('base64');
    let authorizationHeaderString = 'Authorization: Basic ' + encodedData;

    const header = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": 'Basic ' + encodedData,
      "Accept": "application/json",
    });

    var requestOptions = {
      method: 'POST',
      headers: header,
    };

    return this.http.post(this.loginUrl,formData,requestOptions).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);

        //Handle the error here
        return throwError(err);    //Rethrow it back to component
      })
    )
  }

  /*❤️❤️❤️❤️❤️❤️❤️❤️ ENDPOINTS FOR AGENTS QUEUES AND SKILL ❤️❤️❤️❤️❤️❤️❤️❤️❤️*/

  getAllAgents$(page: string) {

    return this.http.get(this.baseUrl+'api/genesys/v1/users')
  }

  getAgent$(page: string) {
    let id = "221ce8e4-0481-47ea-94eb-605f99a1805c"
    return this.http.get(this.baseUrl+'api/genesys/v1/users/'+id)
  }

  /* get all queues*/

  getAllQueues$(page: string) {
    return this.http.get(this.baseUrl+'api/genesys/v1/routing/queues')
  }

  /* get all skills*/

  getAllSkills$(page: string) {
    return this.http.get(this.baseUrl+'api/genesys/v1/routing/skills')
  }

  /*❤️❤️❤️❤️❤️❤️❤️❤️ END ENDPOINTS FOR AGENTS QUEUES AND SKILL ❤️❤️❤️❤️❤️❤️❤️❤️  */
  //------------------------------------------------------------------------//

  public SELECTED_OBJECTS: any = {
    "predefineGruopName": "No group",
    "data": {}
  };

  //---------------------list predefined group-----------------//

  private listPredefinedGroup$: Subject<any[]> = new Subject()

  //----------------data group predefined----------------------//
  private agentsInGroup$: Subject<any[]> = new Subject()
  private agentsInGroup: any[]= [];
  //--------------------------------------//

  private activetable$: Subject<string> = new Subject()

  private SELECTED_AGENTS_SERVICE: any = []

  private selectedObjects$: Subject<any> = new Subject()

  //private agentsSelected$: Subject<any> = new Subject()

  //-------------observable-----------//
  private shortlist$: Subject<any[]> = new Subject()
  //----------------modal--------------//
  private shortlistqueues$: Subject<any[]> = new Subject()

  //-----------------------predefined group-------------------------------//

  getListPredefinedgroup(): Observable<any[]>{
    const groups =  of(this.PREDEFINED_GROUPS)
    return groups;
  }

  addPredefinedGroup(group: string){

    this.PREDEFINED_GROUPS.push(
      [
        group,[]
      ]
    )
    this.listPredefinedGroup$.next(this.PREDEFINED_GROUPS);
  }

  getListPredefinedgroup$(): Observable<any[]>{
    return this.listPredefinedGroup$.asObservable();
  }

  //------------------active table-------------------------//
  setActiveTable(active: string){
    this.activetable$.next(active);
  }

  getActiveTable$(): Observable<string>{
    return this.activetable$.asObservable();
  }

  //----------------data group with agents predefined------//

  setGroupData(item: any){
    this.agentsInGroup = item
    this.agentsInGroup$.next(this.agentsInGroup);
  }

  getPredefinedGroupAgents$(): Observable<any[]>{
    return this.agentsInGroup$.asObservable();
  }

  getPredefinedGroupAgents(): Observable<any[]>{
    const group =  of(this.agentsInGroup)
    return group;
  }

   //------------- agent selected--------------//

  setAgentSelecteds(item: any){
    let x:any = []

    item.forEach((a: any) => {
      let objeto:any = {}
      for(const key of Object.keys(a)){
        objeto[key] = a[key]
      }
      x.push(objeto)
    })

    this.SELECTED_AGENTS_SERVICE = x

  }

  getAgentSelecteds(): Observable<any[]>{
    const agentsSelected= of(this.SELECTED_AGENTS_SERVICE);
    return agentsSelected;
  }

   //-----------------------------------------//

  addItem(item: any){
    this.SELECTED_OBJECTS = item
    this.selectedObjects$.next(this.SELECTED_OBJECTS);
  }

  getPredefinedGroup$(): Observable<any>{
    return this.selectedObjects$.asObservable();
  }

  getPredefinedGroup(): Observable<any>{
    const predefinedGroup = of(this.SELECTED_OBJECTS)
    return predefinedGroup;
  }

  search$(term: string){

    let list:any[] = [];
    let paginatedList:any[] = DATA.slice(1);

    paginatedList.forEach((item: any) => {

      if(item.name.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.email.toLowerCase().indexOf(term.toLowerCase()) >= 0
        || item.queues.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.license.toLowerCase().indexOf(term.toLowerCase()) >= 0
        || item.skill.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.department.toLowerCase().indexOf(term.toLowerCase()) >= 0
        || item.agent.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.manager.toLowerCase().indexOf(term.toLowerCase()) >= 0
        || item.predefinedgroup.toLowerCase().indexOf(term.toLowerCase()) >= 0){
          list.push(item)
      }

    })

    this.shortlist$.next(list)

  }

  searchBySkill$(terms: string[]){
    let list:any[] = [];
    let paginatedList:any[] = DATA.slice(1);
    terms.forEach((a: any) => {
      paginatedList.forEach((item: any) => {

        if(item.skill.toLowerCase().indexOf(a.toLowerCase()) >= 0){
          list.push(item)
        }

      })
    })
    this.shortlist$.next(list)

  }

  searchByLevelName$(terms: string[],column: string){

    let list:any[] = [];
    let paginatedList:any[] = DATA.slice(1);

    terms.forEach((a: any) => {

      paginatedList.forEach((item: any) => {

        if(item[column.toLowerCase()].toLowerCase().indexOf(a.toLowerCase()) >= 0){
          list.push(item)
        }

      })

    })
    this.shortlist$.next(list)
  }



  getAllDirectory$(page: string): Observable<any[]>{

    this.getAllAgents$(page).subscribe((data: any) => {
      // this.shortlist$.next(data)
    })

    this.getAllQueues$(page).subscribe((data: any) => {
      // this.shortlist$.next(data)
    })

    this.getAllSkills$(page).subscribe((data: any) => {
      // this.shortlist$.next(data)
    })

    // ❤️❤️❤️❤️❤️❤️❤️❤️ NEEDS TO BE DEPRECATED AND REFACTORED WITH THE NEW DATA STRUCTURE ❤️❤️❤️❤️❤️❤️❤️❤️
    const directory =  of(DATA)
    return directory;
  }

  getAllDirectory(): void{
    let list:any[] = [];
    list = list = DATA.slice(1);
    this.shortlist$.next(list)
  }

  getDirectory$(): Observable<any[]>{
    return this.shortlist$.asObservable();
  }

  //------------  modal ------------//

  getAllDataModal$(): Observable<any[]>{
    const data_queue =  of(DATA_QUEUE)
    return data_queue;
  }

  getDataModal$(): Observable<any[]>{
    return this.shortlistqueues$.asObservable();
  }

  getAllDataModal(): void{

    let list:any[] = [];
    list = list = DATA_QUEUE.slice(1);

    this.shortlistqueues$.next(list)
  }

  searchQueues$(term: string){

    let list:any[] = [];
    let paginatedList:any[] = DATA_QUEUE.slice(1);

    paginatedList.forEach((item: any) => {

      if(item.queuename.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.queueid.toLowerCase().indexOf(term.toLowerCase()) >= 0
        || item.calltype.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.language.toLowerCase().indexOf(term.toLowerCase()) >= 0
        || item.provider.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.description.toLowerCase().indexOf(term.toLowerCase()) >= 0){
          list.push(item)
      }

    })

    this.shortlistqueues$.next(list)

  }

  searchByColumnQueue$(terms: string[],column: string){
    console.log(column)
    column = column.toLowerCase()
    let list:any[] = [];
    let paginatedList:any[] = DATA_QUEUE.slice(1);

    terms.forEach((a: any) => {

      paginatedList.forEach((item: any) => {

        if(item[column] != undefined && item[column] != 0){
          if(item[column].toLowerCase().indexOf(a.toLowerCase()) >= 0){
            list.push(item)
          }
        }

      })
    })

    this.shortlistqueues$.next(list)
  }

  //------------ predefined groups data ------------//

  //-------------end observable-----------//
}
