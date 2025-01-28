
// import { Feature } from "./Features";
export interface RouteRequest {
        origin: [number, number];
        destination: [number, number];
      }

      
 // src/app/cab/services/routing.service.ts

export interface RouteResponse {
        type: string; // e.g., 'FeatureCollection'
        features: { 
          type: string; // e.g., 'Feature'
          properties: {
            segments: {
              steps: {
                instruction: string;
                distance: number;
                duration: number;
                type: number;
                way_points: [number, number];
              }[];
            }[];
            summary: {
              distance: number;
              duration: number;
            };
            distance: number;
            duration: number;
            // ... other properties ... 
          };
          geometry: {
            type: string; // e.g., 'LineString'
            coordinates: [number, number][];
          };
          // ... other properties ...
        }[];
        bbox: [number, number, number, number]; // Bounding box of the route
        metadata: {
          attribution: string;
          service: string;
          timestamp: number;
          query: RouteRequest; // The original query parameters
          engine: {
            version: string;
            build_date: string;
          };
        };
}
      
      
      