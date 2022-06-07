import { __decorate } from "tslib";
import { Component } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';
import { DialogComponent } from '../dialog/dialog.component';
// will implement a search form
// will query backend for the name of the album typed into the search form
// will query backend for recommended albums
// will allow the user to add albums to lists  
let SearchComponent = class SearchComponent {
    constructor(searchService, dialog) {
        this.searchService = searchService;
        this.dialog = dialog;
        this.albums = [];
        this.newAlbum = {
            _id: "",
            name: "",
            artist: "",
            spotifyId: ""
        };
    }
    ngOnInit() {
        this.getRecommendationsFromServer();
    }
    getRecommendationsFromServer() {
        this.searchService.getRecommendedAlbums()
            .subscribe(albums => (this.albums = albums));
    }
    openMenu(album) {
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
            if (result !== undefined) {
                this.searchService.addAlbum(album, result)
                    .subscribe(added_album => (this.newAlbum = added_album));
            }
        });
    }
    searchForAlbum(albumName) {
        this.searchService.getAlbum(albumName)
            .subscribe(album => (this.newAlbum = album));
    }
};
SearchComponent = __decorate([
    Component({
        selector: 'app-search',
        templateUrl: './search.component.html',
        styleUrls: ['./search.component.css'],
        providers: [SearchService]
    })
], SearchComponent);
export { SearchComponent };
//# sourceMappingURL=search.component.js.map