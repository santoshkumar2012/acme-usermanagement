import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  [key: string]: any;
  id: string;
  name: string;
  bio: string;
  language: string;
  version: string;
  isEditing?: boolean;
  viewUser?: boolean
  form?: FormGroup;
}

@Component({
  selector: 'app-user-data',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent {

  users!: User[]

  tableData: {title: string, field: string} [] = [
    {
      title: 'Id',
      field: 'id'
    },
    {
      title: 'Name',
      field: 'name'
    },
    {
      title: 'Bio',
      field: 'bio'
    },
    {
      title: 'Language',
      field: 'language'
    },
    {
      title: 'Version',
      field: 'version'
    },
    {
      title: 'Action',
      field: 'action'
    }
  ]
  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.getUser()
  }

  getUser() {
    this.http.get('https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json').subscribe((response: any) => {
      this.users = response;
    });
  }

  userEdit(user: User) {
    user.isEditing = true;
    user.form = this.fb.group({
      id      : [user.id, [Validators.required]],
      name    : [user.name, [Validators.required, Validators.minLength(3)]],
      bio     : [user.bio, [Validators.required]],
      language: [user.language, [Validators.required]],
      version : [user.version, [Validators.required]]
    });
  }


  save(user: User) {
    if (user.form?.valid) {
      const updated   = user.form.value;
      user.name       = updated.name;
      user.bio        = updated.bio;
      user.language   = updated.language;
      user.version    = updated.version
      user.isEditing  = false;
    }
  }

  view(user: User) {
    user.viewUser = !user.viewUser
  }

  cancel(user: User) {
    user.isEditing = false;
  }

}
