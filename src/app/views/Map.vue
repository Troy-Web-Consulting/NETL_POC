<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import axios from 'axios';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import { Vector as VectorLayer } from 'ol/layer';
import { Style, Stroke, Circle, Fill } from 'ol/style';
import {useFileDialog} from '@vueuse/core';
import Papa from 'papaparse';

// const center = ref(fromLonLat([-75.6107, 42.9377])); // Coordinates for New York
// const zoom = ref(7);
let vectorSource;
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/map');
    const pointsObject = response.data;

    // Convert the points object back to an array
    const points = Object.values(pointsObject).map(
      (coord) =>
        new Feature({
          geometry: new Point(fromLonLat(coord)),
        })
    );

    // Create a vector source and add your points to it
    vectorSource = new VectorSource({
      features: points,
    });

    // Create a vector layer with your vector source
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Circle({
          radius: 7,
          fill: new Fill({ color: 'blue' }),
          stroke: new Stroke({
            color: 'white',
            width: 2,
          }),
        }),
      }),
    });

    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([-75.935242, 42.73061]), // Center on New York City
        zoom: 7,
      }),
    });
  } catch (error) {
    console.error('Failed to fetch map data:', error);
  }
});

const { files, open, reset, onChange } = useFileDialog({
  accept: '.csv', // Set to accept only image files
  directory: false, // Select directories instead of files if set true
})

const parseFile = async (file) => {
  console.log(file);
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: async (results) => {
      try {
        const response = await axios.post('http://localhost:3000/api/map', results.data);
        if(response) {
          const points = Object.values(response.data).map(
            (coord) =>
              new Feature({
                geometry: new Point(fromLonLat(coord)),
              })
          );

          // Clear the existing points from the vector source
          vectorSource.clear();

          // Add the new points to the vector source
          vectorSource.addFeatures(points);
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
}

onChange(async (files) => {
  parseFile(files[0]);
});
</script>

<template>
  <div style="text-align: center">
    <h1 style="background-color: lightblue; color: white; padding: 10px">
      Map View
    </h1>
    <div
      id="map"
      style="height: 600px; width: 800px; margin: 0 auto; margin-top: 15px"
    ></div>
    <div stlye="display: flex; justify-content: center; margin-top: 15px">
      <button type="button" @click="open">
        Choose a CSV
      </button>

      <button type="button" @click="reset">
        Reset
      </button>
    </div>
  </div>
</template>
