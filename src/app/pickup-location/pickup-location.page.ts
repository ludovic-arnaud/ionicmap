import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-pickup-location',
  templateUrl: './pickup-location.page.html',
  styleUrls: ['./pickup-location.page.scss'],
})
export class PickupLocationPage implements OnInit {
  map: Leaflet.Map;
  newMarker: any;

  height : string;

  constructor(private router: Router, private geolocation: Geolocation) {
    this.height = (document.documentElement.clientHeight-150)+"px";
   }

  ngOnInit(): void { }

  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {
    this.map = Leaflet.map('mapId').setView([43.6043, 1.4437], 12);

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Angular LeafLet',
    }).addTo(this.map);
  }

  goBack() {
    this.router.navigate(["home"]);
  }

  locatePosition() {

    const myIcon = Leaflet.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });

    this.geolocation.getCurrentPosition().then((resp) => {
      this.newMarker = Leaflet.marker([resp.coords.latitude, resp.coords.longitude], { icon: myIcon }).addTo(this.map);
      this.newMarker.bindPopup("Vous êtes ici !").openPopup();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}