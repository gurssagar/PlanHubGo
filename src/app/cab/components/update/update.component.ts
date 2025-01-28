import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Feature from 'ol/Feature';
import {Style, Circle as CircleStyle, Fill, Stroke, Icon,} from 'ol/style';
import {defaults as defaultControls, ScaleLine, FullScreen, ZoomToExtent} from 'ol/control';
import {transform, fromLonLat, toLonLat} from 'ol/proj';
import Overlay from 'ol/Overlay';
import LayerGroup from 'ol/layer/Group';
import Draw from 'ol/interaction/Draw';
import Geolocation from 'ol/Geolocation';
import { FormsModule } from '@angular/forms';
import { Geometry } from 'ol/geom';
import { RouteService } from '../../services/routing.service';
@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements AfterViewInit, OnDestroy {
  //map
  private map?: Map;
  //layers
  private vectorLayer: VectorLayer<VectorSource>;
  private routeSource: VectorSource;
  private routeLayer: VectorLayer<VectorSource>;
  //draw
  private drawInteraction?: Draw;
  //routing
  private startPoint?: Feature<Geometry>;
  private endPoint?: Feature<Geometry>;
  //popup
  private popup?: Overlay;
  //geolocation
  private geolocation?: Geolocation;
  private positionFeature?: Feature;

  searchQuery: string = '';
  routeInstructions: string[] = [];
  routeDistance: string = '';
  routeTime: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private routeService: RouteService) {
    this.routeSource = new VectorSource();
    this.routeLayer = new VectorLayer({
      source: this.routeSource,
      style: new Style({
        stroke: new Stroke({
          color: '#0066cc',
          width: 4
        })
      })
    });
    
    this.vectorLayer = new VectorLayer({
      source: new VectorSource(),
      style: this.createDefaultStyle()
    });
  }
  
  async searchLocation(): Promise<void> {
    if (!this.searchQuery) return;
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.searchQuery)}`
      );
      const results = await response.json();
      
      if (results.length > 0) {
        const [lon, lat] = [parseFloat(results[0].lon), parseFloat(results[0].lat)];
        const coordinates = fromLonLat([lon, lat]);
        
        this.map?.getView().animate({
          center: coordinates,
          zoom: 15,
          duration: 1000
        });

        const searchFeature = new Feature({
          geometry: new Point(coordinates)
        });
        this.vectorLayer.getSource()?.addFeature(searchFeature);
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  }
  

  private async calculateRoute(start: [number, number], end: [number, number]): Promise<void> {
    try {
      const response = await this.routeService.getRoute(start, end);
      const routeCoords = response.features[0].geometry.coordinates.map((coord: [number, number]) => 
        fromLonLat(coord)
      );
         
      const routeFeature = new Feature({
        geometry: new LineString(routeCoords)
      });
         
      this.routeSource.clear();
      this.routeSource.addFeature(routeFeature);
         
      const route = response.features[0].properties;
      this.routeDistance = `${(route.distance / 1000).toFixed(1)} km`;
      this.routeTime = `${Math.round(route.duration / 60)} minutes`;
         
      this.routeInstructions = response.features[0].properties.segments
        .flatMap((segment: any) => segment.steps)
        .map((step: any) => step.instruction);
    } catch (error) {
      console.error('Error calculating route:', error);
    }
}

  startRouting(): void {
    if (this.drawInteraction) {
      this.map?.removeInteraction(this.drawInteraction);
    }
    
    this.drawInteraction = new Draw({
      source: this.vectorLayer.getSource()!,
      type: 'Point',
      style: new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({ color: '#0066cc' }),
          stroke: new Stroke({ color: '#fff', width: 2 })
        })
      })
    });

    if (this.drawInteraction) {
      this.map?.addInteraction(this.drawInteraction);

      this.drawInteraction.on('drawend', (event) => {
        const feature = event.feature;
        const geometry = feature.getGeometry();
        
        if (geometry instanceof Point) {
          const coords = toLonLat(geometry.getCoordinates()) as [number, number];
          
          if (!this.startPoint) {
            this.startPoint = feature;
          } else if (!this.endPoint) {
            this.endPoint = feature;
            const startGeometry = this.startPoint.getGeometry();
            if (startGeometry instanceof Point) {
              const startCoords = toLonLat(startGeometry.getCoordinates()) as [number,number];
              this.calculateRoute(startCoords, coords);
              if (this.drawInteraction) {
                this.map?.removeInteraction(this.drawInteraction);
              }
            }
          }
        }
      });
    }
  }

  clearRoute(): void {
    this.routeSource.clear();
    this.vectorLayer.getSource()?.clear();
    this.startPoint = undefined;
    this.endPoint = undefined;
    this.routeInstructions = [];
    this.routeDistance = '';
    this.routeTime = '';
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initMap();
      this.setupMapLayers();
      this.initPopup();
      this.initGeolocation(); // Add this line
    }
  }

  private initMap(): void {
    this.map = new Map({
      target: 'map',
      controls: defaultControls().extend([
        new ScaleLine(),
        new FullScreen(),
        new ZoomToExtent({
          extent: transform([-123, 37, -122, 38], 'EPSG:4326', 'EPSG:3857')
        })
      ]),
      layers: [],
      view: new View({
        center: fromLonLat([78.9629, 20.5937]), // India center coordinates
        zoom: 5,
        maxZoom: 19
      })
    });
  }

  private initPopup(): void {
    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');

    if (container && content && closer) {
      this.popup = new Overlay({
        element: container,
        autoPan: {
          animation: {
            duration: 400
          }
        }
      });

      this.map?.addOverlay(this.popup);

      closer.onclick = () => {
        this.popup?.setPosition(undefined);
        closer.blur();
        return false;
      };

      this.map?.on('click', (evt) => {
        const feature = this.map?.forEachFeatureAtPixel(evt.pixel, 
          (feature) => feature as Feature<Geometry>);
        
        if (feature && content) {
          const geometry = feature.getGeometry();
          if (geometry instanceof Point) {
            const coordinates = geometry.getCoordinates();
            content.innerHTML = this.getFeatureInfo(coordinates);
            this.popup?.setPosition(coordinates);
          }
        }
      });
    }
  }

  private getFeatureInfo(coordinates: number[]): string {
    const [lon, lat] = toLonLat(coordinates);
    return `
      <h3>Location Info</h3>
      <p>Longitude: ${lon.toFixed(4)}</p>
      <p>Latitude: ${lat.toFixed(4)}</p>
    `;
  }

  private setupMapLayers(): void {
    const osmLayer = new LayerGroup({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ]
    });

    const satelliteLayer = new LayerGroup({
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            maxZoom: 19
          })
        })
      ],
      visible: false
    });

    const topoLayer = new LayerGroup({
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            maxZoom: 19
          })
        })
      ],
      visible: false
    });

    this.map?.addLayer(osmLayer);
    this.map?.addLayer(satelliteLayer);
    this.map?.addLayer(topoLayer);
    this.map?.addLayer(this.vectorLayer);
    this.map?.addLayer(this.routeLayer);
  }

  switchLayer(layerKey: string): void {
    const layers = this.map?.getLayers().getArray();
    layers?.forEach((layer, index) => {
      if (index < 3) { // Only toggle the base layers (osm, satellite, topo)
        layer.setVisible(index === (layerKey === 'osm' ? 0 : layerKey === 'satellite' ? 1 : 2));
      }
    });
  }

  private initGeolocation(): void {
    this.geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true
      },
      projection: this.map?.getView().getProjection()
    });
  
    // Create a feature to show user's location
    this.positionFeature = new Feature();
    this.positionFeature.setStyle(new Style({
      image: new CircleStyle({
        radius: 8,
        fill: new Fill({
          color: '#4CAF50'
        }),
        stroke: new Stroke({
          color: '#000',
          width: 2
        })
      })
    }));
  
    const positionLayer = new VectorLayer({
      source: new VectorSource({
        features: [this.positionFeature]
      })
    });
  
    this.map?.addLayer(positionLayer);
  }
  
  getCurrentLocation(): void {
    if (!this.geolocation) {
      this.initGeolocation();
    }
  
    if (this.geolocation) {
      this.geolocation.setTracking(true);
  
      // Handle position change
      this.geolocation.on('change:position', () => {
        const coordinates = this.geolocation?.getPosition();
        if (coordinates) {
          this.positionFeature?.setGeometry(coordinates ? new Point(coordinates) : undefined);
          
          // Center map on user's location and zoom in
          this.map?.getView().animate({
            center: coordinates,
            zoom: 15,
            duration: 1000
          });
        }
      });
  
      // Handle error
      this.geolocation.on('error', (error) => {
        console.error('Geolocation error:', error);
      });
    }
  }

  private createDefaultStyle(): Style {
    return new Style({
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({ color: '#0066cc' }),
        stroke: new Stroke({ color: '#000', width: 2})
      })
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.dispose();
    }
    if (this.geolocation) {
      this.geolocation.setTracking(false);
    }
  }
}