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
        console.log(img);
      })
    ).subscribe();
  }
}
