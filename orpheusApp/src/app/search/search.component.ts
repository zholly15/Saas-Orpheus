import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';
import { Album } from '../models/album';
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from '../dialog/dialog.component';

// will implement a search form
// will query backend for the name of the album typed into the search form
// will query backend for recommended albums
// will allow the user to add albums to lists  

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {
  albums: Album[] = [];
  newAlbum: Album = {
    _id: "",
    name: "",
    artist_name: "",
    spotifyID: "",
    release_date: "",
    total_tracks: 0,
    image_url: "",
  }
  constructor(
    private searchService: SearchService,
    public dialog: MatDialog){}

  ngOnInit(): void {
    this.getRecommendationsFromServer();
  }

  getRecommendationsFromServer(): void {
    this.searchService.getRecommendedAlbums()
      .subscribe(albums => (this.albums = albums));
  }
  openMenu(album:Album){
    let dialogRef = this.dialog.open(DialogComponent, {
      height: '25%',
      width: '25%',
      panelClass: 'custom-modalbox'
    });
    console.log(album.name);
    dialogRef.afterClosed().subscribe(result => {
      // post the list here using Album object passed as a parameter and the 
      // list object injected via the dialogue popup ]
      console.log(result);
      if(result !== undefined){
        this.searchService.addAlbum(album, result)
          .subscribe(added_album => (this.newAlbum = added_album));
      }
    });
  }

  searchForAlbum(albumName: string){
    this.searchService.getAlbum(albumName)
      .subscribe(album => (this.newAlbum = album));
  }
}