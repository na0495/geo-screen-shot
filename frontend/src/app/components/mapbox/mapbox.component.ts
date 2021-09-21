import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDraw from "@mapbox/mapbox-gl-draw";
import { NgxCaptureService } from 'ngx-capture';
import { map, tap } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit {
  @ViewChild('screen', { static: true }) screen: any;
  @Output() refresh = new EventEmitter<Event>();

  imgBase64 = '';
  mapData: any;
  coordinates: any;
  geo: any;

  constructor(
    private _postService: PostService
  ) { }

  ngOnInit() {

    let map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoibmEwNDk1IiwiYSI6ImNrdG92cG9xdzBnbG4ybnF1bGJicmcwODQifQ.KbNPdaryp-KRrNYEPScQvQ',
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      zoom: 8,
      center: [-4.794525, 35.0849336]
    });

    var drawFeatureID = '';
    var newDrawFeature = false;

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
    map.on('load', () => {
      this.mapData = map.getCanvas().toDataURL()
    });
    map.on('draw.create', () => {
      newDrawFeature = true;
      const data = Draw.getAll();
      this.geo = data.features[0].geometry;
      this.coordinates = this.geo.coordinates;
      this.mapData = map.getCanvas().toDataURL()
    });
    map.on('click', function(e) {
      if (!newDrawFeature) {
        var drawFeatureAtPoint = Draw.getFeatureIdsAt(e.point);
        //if another drawFeature is not found - reset drawFeatureID
        drawFeatureID = drawFeatureAtPoint.length ? drawFeatureAtPoint[0] : '';
    }

    newDrawFeature = false;

  });
  }
  capture(event: Event) {
    this.imgBase64 = this.mapData;
    // this.save(event);
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

  save(event: Event){
    const file = this.DataURIToBlob(this.imgBase64)
    const formData = new FormData();
    formData.append('image', file, 'image.png')
    formData.append('name', 'plot')
    formData.append('coordinates', JSON.stringify(this.coordinates))
    this._postService.create(formData).subscribe(
      data => {
        console.log(data)
        this.refresh.emit(event);
      },
      error => {
        console.log(error)
      }
    )
  }
}
