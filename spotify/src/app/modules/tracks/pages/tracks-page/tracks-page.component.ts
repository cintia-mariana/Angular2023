// import { TrackService } from '@modules/tracks/services/track.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Subscription } from 'rxjs';
import * as dataRaw from '../../../../data/trucks.json'

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {

  tracksTrending: Array<TrackModel> = []
  tracksRandom: Array<TrackModel> = []
  listObservers$: Array<Subscription> = []

  constructor(/* private trackService: TrackService */) { }

  ngOnInit(): void {
    this.loadDataAll() //TODO 📌📌
    // this.loadDataRandom() //TODO 📌📌
  }

  async loadDataAll(): Promise<any> {
    // this.tracksTrending = await this.trackService.getAllTracks$().toPromise()
    const { data } : any = (dataRaw as any).default;
    this.tracksTrending = data;

  }

  // loadDataRandom(): void {
  //   this.trackService.getAllRandom$()
  //     .subscribe((response: TrackModel[]) => {
  //       this.tracksRandom = response
  //     })
  // }

  ngOnDestroy(): void {

  }

}