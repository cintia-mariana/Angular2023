// import { TrackService } from '@modules/tracks/services/track.service';
import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit {

  tracksTrending: Array<TrackModel> = []
  tracksRandom: Array<TrackModel> = []
   listObservers$: Array<Subscription> = []

  constructor(private trackService: TrackService ) { }

  ngOnInit(): void {
    this.loadDataAll()
    this.loadDataRandom()
    // this.trackService.getAllTracks$()
    // .subscribe((response: TrackModel[]) => {
    //   console.log('la respuesta --->', response);
    //   this.tracksTrending = response;
    // })
    // // // this.loadDataAll() //TODO 📌📌
    // // // // this.loadDataRandom() //TODO 📌📌

    // this.trackService.getAllTracks$()
    // .subscribe((response: TrackModel[]) => {
    //   console.log('la respuesta --->', response);
    //   this.tracksRandom = response;
    // })
  }

 async loadDataAll(): Promise<any>{
   this.tracksTrending= await this.trackService.getAllTracks$().toPromise()
   
     


  }

  loadDataRandom():void {
    this.trackService.getAllRandom$()
    .subscribe((response: TrackModel[]) => {
      this.tracksRandom = response;
    }, err => {
      alert('0000000 error de conexion');
      console.log('0000000 error de conexion');
    });
  

  }
  ngOnDestroy(): void {

    // this.listObservers$.forEach(u => u.unsubscribe())

  }

}