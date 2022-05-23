import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { List } from '../list';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [SearchService]
})
export class DialogComponent implements OnInit {

  lists: List[] = [];
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.getListsFromServer();
  }

  getListsFromServer(): void {
    this.searchService.getLists()
      .subscribe(lists => (this.lists = lists));
  }

}
