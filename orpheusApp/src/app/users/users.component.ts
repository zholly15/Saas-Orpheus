import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/userModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { 

  }
  
  users: User[] = [];

  ngOnInit(): void {  
    this.userService.getUsers().subscribe(users => this.users = users);
  }

}
