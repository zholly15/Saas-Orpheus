import { Injectable } from '@angular/core';
import { List } from './list';
import { LISTS } from './mock-list';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private messageService : MessageService) { }

  getLists(): Observable<List[]> {
    const lists = of(LISTS);
    this.messageService.add('ListService: fetched lists');
    return lists;
  }
}
