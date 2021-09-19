import { Component, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDraw from "@mapbox/mapbox-gl-draw";
import { NgxCaptureService } from 'ngx-capture';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit {
  @ViewChild('screen', { static: true }) screen: any;

  imgBase64 = '';

  constructor(
    private _ngxCaptureService: NgxCaptureService
  ) { }

  ngOnInit() {

    let map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoibmEwNDk1IiwiYSI6ImNrdG92cG9xdzBnbG4ybnF1bGJicmcwODQifQ.KbNPdaryp-KRrNYEPScQvQ',
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      zoom: 8,
      center: [-4.794525, 35.0849336]
    });

    let Draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      },
      defaultMode: 'draw_polygon'
    });

    map.addControl(Draw)
    map.addControl(new mapboxgl.FullscreenControl());
    map.on('load', function() {
      const data = Draw.getAll();

    });



  }
  capture() {
    this._ngxCaptureService.getImage(this.screen.nativeElement, true)
    .pipe(
      tap(img => {
        this.imgBase64 = img;
      })
    ).subscribe();
  }

  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

        return new Blob([ia], { type: mimeString })
  }

  save(){
    const file = this.DataURIToBlob(this.imgBase64)
    const formData = new FormData();
    formData.append('image', file, 'image.png')
    formData.append('name', 'image.png')


    // this.http.post(this.ip+url,formData).subscribe(data=>{


    // })
  }
}
