import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, catchError, map, mergeMap, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTRlM2FmMjlkZWNkNDRkZDhlMGZlNTMiLCJpYXQiOjE2OTk4OTgxMjYsImV4cCI6MTY5OTk0MTMyNn0.5JPHcMb_P5PkStbSzN95STI_mJLLeq-PllwLwiUkQ5o';


  dataTracksTrending$:Observable<TrackModel[]> = of ([])

  dataTracksRandom$:Observable<any> = of ([])

  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) { 
  }

  private skipByid(listTracks:TrackModel[], id: number):Promise<TrackModel[]>{
    return new Promise((resolve, reject)=>{
      const listTmp = listTracks.filter(a => a._id !== id)

      resolve (listTmp)
    })
  }

  getAllTracks$(): Observable<any> {
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };

    // return this.httpClient.get(`${this.URL}/tracks`)
    return this.httpClient.get(`${this.URL}/tracks`, { headers: headers })
    .pipe(
      map(({data}: any) => {
      return data;
    }))

    
  }

  getAllRandom$(): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };

    // return this.httpClient.get(`${this.URL}/tracks`)
    return this.httpClient.get(`${this.URL}/tracks`, { headers: headers })
    .pipe(
      mergeMap(({data}: any) => this.skipByid(data,2)),

    
    // map((dataRevertida) => {
    //   return dataRevertida.filter((track:TrackModel)=> track._id !== 1);
    // }),
    tap(data => console.log('okokokok',data)),
    catchError((err) =>{
      const {status, statusText }=err;
      console.log('Algo paso revisame OKOKOK', [err.status, statusText]);
      return of([])
    })
    
    )

    
  }
}


