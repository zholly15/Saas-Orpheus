import { Component, OnInit } from '@angular/core';
import { List } from '../models/list';
import { ListService } from '../services/list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})

export class ListsComponent implements OnInit {

  lists: List[] = [];
  newList ?: List;
  selectedList?: List;
  listname: string = '';
  listdesc: string = '';

  constructor(private listService: ListService, private router : Router) { }

  ngOnInit(): void {
    this.getLists();
  }

  onSelect(list : List): void {
    this.selectedList = list;
  }

  getLists(): void {
    this.listService.getLists().subscribe(lists => this.lists = lists)
  }

  addList() : void {
  
    this.newList = {
      collectionId: "",
      ownerId: "random",
      albumIds: [],
      name: this.listname,
      description: this.listdesc
    }
    this.listService.addList(this.newList).subscribe();
    
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/collections']);
  }); 
  }

  removeList(listname : String) : void {
    this.listService.removeList(listname).subscribe();

  }
}