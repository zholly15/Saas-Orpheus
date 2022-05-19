import { Component, OnInit } from '@angular/core';
import {List} from '../list'

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  listInfo: List = {
    collectionId: "1",
    ownerId: "Albert",
    albumIds: ['1231', '53224', '12351'],
    name: "Rock",
    description: "My favorite rock artists!"
  }

  constructor() { }

  ngOnInit(): void {
  }


}
