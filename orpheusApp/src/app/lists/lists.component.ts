import { Component, OnInit } from '@angular/core';
import { List } from '../list'
import { ListService } from '../list.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})

export class ListsComponent implements OnInit {

  lists: List[] = [];

  selectedList?: List;

  constructor(private listService: ListService, private messageService : MessageService) { }

  ngOnInit(): void {
    this.getLists();
  }

  onSelect(list : List): void {
    this.selectedList = list;
    this.messageService.add("ListComponent: Selected list id = " + list.collectionId)
  }

  getLists(): void {
    this.listService.getLists().subscribe(lists => this.lists = lists)
  }
}