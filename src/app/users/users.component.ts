import { TitleCasePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [HttpClientModule, TitleCasePipe, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  users: any[] = []
  headers: string[] = [];
  edituserId: string | null = null;
  
  constructor( private http: HttpClient, private router: Router){}

  ngOnInit(){
    this.getUser()
  }

  getUser(){
    this.http.get('https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json').subscribe((response: any) => {
      this.users = response;

      if(this.users.length > 0){
        this.headers = Object.keys(this.users[0])
      }

    });
  }

  // detailsView(id: string){
  //   this.router.navigate(['/user-details', id]);
  // }

  userEdit(id: string){
    this.edituserId = id;
  }

  saveEdit(){
    this.edituserId = null;
  }

  cancelEdit(){
    this.edituserId = null;
  }

}
