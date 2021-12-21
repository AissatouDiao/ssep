import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';
import { loadModules } from 'esri-loader'
import MapView from '@arcgis/core/views/MapView';

import Map from "@arcgis/core/Map";
import esriConfig from "@arcgis/core/config";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Polyline from '@arcgis/core/geometry/Polyline';
import Sketch from "@arcgis/core/widgets/Sketch";

@Component({
  selector: 'app-gestionpistes',
  templateUrl: './gestionpistes.component.html',
  styleUrls: ['./gestionpistes.component.scss']
})
export class GestionpistesComponent implements OnInit {

  regions: any; idregion: any; pistes: any;
  communes: any;

  @Input() page: any = 1;
  @Input() pageSize: any = 5;
  searchText: any; searchFilter: any = '';

  region = {
    libelle: null
  };

  piste = {
    nom: null,
    commune_id: null,
    kilometrage: null
  }

  @ViewChild('regionForm')
  regionForm!: any;
  la_region: any;

  @ViewChild('viewDiv') viewDivElement!: ElementRef;

  constructor(
    private jarwisService: JarwisService,
    private notify: SnotifyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getPistes();
    this.getRegions();
    this.getCommunes();


  }
  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.arcgismap();
  }


  arcgismap() {

    esriConfig.apiKey = "AAPK6a57f90dec384ae2ae2bf683265c5d68Jk_oTEsvriU92IrmYm3m7NBNO5o2GxB8JzmBWtLKH8Vu5YoVCLPYCkQikezzqNDh";
    const map = new Map({
      basemap: "arcgis-topographic" // Basemap layer service
    });

    const view = new MapView({
      map: map,
      center: [-14.452362, 14.497401], // Longitude, latitude
      zoom: 7.5, // Zoom level
      container: this.viewDivElement.nativeElement// Div element
    });

    //couche graphique pour ajouter des points et figures géométrique
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);


    const point = { //Create a point
      type: "point",
      longitude: -118.80657463861,
      latitude: 34.0005930608889
    };
    const simpleMarkerSymbol = {
      type: "simple-marker",
      color: [226, 119, 40],  // Orange
      outline: {
        color: [255, 255, 255], // White
        width: 1
      }
    };

    /*const pointGraphic = new Graphic({
      geometry: new Point({
        type: "point",
        longitude: -118.80657463861,
        latitude: 34.0005930608889
      }),
      symbol: simpleMarkerSymbol
    });*/
    const pointGraphic = new Graphic({
      geometry: new Point({
        //  type : 'point' ,   // autocasts as new Point()
        longitude: -16.85196,
        latitude: 14.87284
      }),
      symbol: new SimpleMarkerSymbol({
        //  type : 'simple-line',
        size: '12px',
        color: 'blue',
        outline: {
          color: '#efefef',
          width: '1.5px'
        }
      })
    });

    graphicsLayer.add(pointGraphic);

    const polyline = {

      paths: [
        [-118.821527826096, 34.0139576938577], //Longitude, latitude
        [-118.814893761649, 34.0080602407843], //Longitude, latitude
        [-118.808878330345, 34.0016642996246]  //Longitude, latitude
      ]
    };
    const simpleLineSymbol = {
      type: "simple-line",
      color: [226, 119, 40], // Orange
      width: 2
    };
    const popupTemplate = {
      title: "{Name}",
      content: "{Description}"
    }
    const attributes = {
      Name: "Graphic",
      Description: "je suis une ligne"
    }
    const polylineGraphic = new Graphic({
      geometry: new Polyline({
        // type: "polyline",
        paths: [[[-15.45567, 12.6539576938577], [-15.454893761649, 12.6580602407843], [-15.458878330145, 12.6596642996246]]]
      }),
      symbol: simpleLineSymbol,
      attributes: attributes,
      popupTemplate: popupTemplate
    });
    graphicsLayer.add(polylineGraphic);

    view.when(() => {
      const sketch = new Sketch({
        layer: graphicsLayer,
        view: view,
        // graphic will be selected as soon as it is created
        creationMode: "update"
      });
      sketch.on("create", function (event) {
        if (event.state === "complete") {
          console.log(event.graphic.geometry.toJSON());
        }
      });

      view.ui.add(sketch, "top-right");
    });

  }


  //Recupérer toutes les regions.
  getPistes(): void {
    this.jarwisService.getPistes().subscribe(
      (data: any) => { console.log(data); this.pistes = data },
      (error: any) => console.log(error)
    );
  }

  //Recupérer toutes les regions.
  getRegions() {
    this.jarwisService.getRegions().subscribe(
      (data: any) => { console.log(data); this.regions = data },
      (error: any) => console.log(error)
    );
  }

  getCommunes() {
    this.jarwisService.getCommunes().subscribe(
      (data: any) => { console.log(data); this.communes = data },
      (error: any) => console.log(error)
    );
  }

  gotopiste(id: any) {
    this.router.navigate(['/gestion-pistes-bavardes/travaux/region', id]);
  }
  //Ajouter une regione
  add() {
    this.jarwisService.addPiste(this.piste).subscribe(
      (data: any) => {
        console.log(data); this.notify.success(data.message); this.getPistes();
        this.regionForm.reset();
      },
      (error: any) => { console.log(error); this.notify.error('Veuillez revoir les données renseignées.') }
    );
  }

  //Supprimer de region.
  delete(id: any) {

    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer cette piste ?', 'Attention !Suppression de piste ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deletePiste(id).subscribe(
              (data: any) => { console.log(data); this.getPistes(); this.notify.success("La piste a été supprimé !"); },
              (error: any) => console.log(error)
            );

          }, bold: false
        },
        {
          text: 'Non',
          action: () =>
            this.notify.info('Suppression annulée !')
        },
      ]
    });
  }

  update(z: any) {
    this.jarwisService.updatePiste(z).subscribe(
      (data: any) => { console.log(data); this.notify.success(data.message); },
      (error: any) => { console.log(error); this.notify.error('Veuillez revoir les données renseignées.') }
    );
  }

  getRegionById(id: any) {
    this.jarwisService.getRegionById(id).subscribe(
      (data: any) => { console.log(data); this.la_region = data },
      (error: any) => { console.log(error) }
    );

  }

  getID() {
    this.idregion = this.route.snapshot.paramMap.get('id');
    this.getRegionById(this.idregion);

  }
}
