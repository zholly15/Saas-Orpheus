import { Component, OnInit } from '@angular/core';
import {List} from '../list'
import { LISTS } from '../mock-list';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists = LISTS;

  selectedList?: List;
  onSelect(list : List): void {
    this.selectedList = list;
  }

  constructor() { }

  ngOnInit(): void {
  }
}