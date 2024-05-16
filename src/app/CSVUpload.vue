<script setup lang="ts">
import {useFileDialog} from '@vueuse/core';
import Papa from 'papaparse';
import { ref } from "vue";

const center = ref([-75.8777, 42.9061]);
const projection = ref("EPSG:4326");
const zoom = ref(7.5);
const rotation = ref(0);

const currentCenter = ref(center.value);
const currentZoom = ref(zoom.value);
const currentRotation = ref(rotation.value);
const currentResolution = ref(0);

const strokeWidth = 1000;
const strokeColor = "red";

const coordinates = [
  [-73.935242, 40.730610], // New York City
  [-73.7562313, 42.6525793], // Albany
  [-76.1474244, 43.0481221], // Syracuse
  [-73.984016, 40.754931], // Times Square, NYC
  [-75.977985, 42.807766], // Hamilton
  [-73.7860, 42.8494], // East Greenbush
  [-76.2007, 43.1014], // Fulton
  [-78.8784, 42.8864], // Buffalo
  [-73.7949, 41.9270], // Wappingers Falls
  [-73.9727, 40.7648], // Central Park, NYC
  [-73.7781, 42.7433], // Rensselaer
  [-73.4083, 41.4020], // Brewster
  [-77.6109, 43.1610], // Rochester
  [-73.4830, 44.5062], // Swanton
  [-73.4230, 42.1676], // Sheffield
  [-77.2934, 43.0462], // Canandaigua
  [-74.1418, 41.6804], // Highland
  [-73.2510, 41.6459], // Amenia
  [-73.4582, 41.7468], // La Grange
  [-76.5307, 42.4406], // Ithaca
];

function resolutionChanged(event) {
  currentResolution.value = event.target.getResolution();
  currentZoom.value = event.target.getZoom();
}
function centerChanged(event) {
  currentCenter.value = event.target.getCenter();
}
function rotationChanged(event) {
  currentRotation.value = event.target.getRotation();
}

const { files, open, reset, onChange } = useFileDialog({
  accept: '.csv', // Set to accept only image files
  directory: false, // Select directories instead of files if set true
})

const parseFile = (file) => {
  console.log(file);
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      console.log(results);
    }
  });
}

onChange((files) => {
  parseFile(files[0]);
});
</script>

<template>
  <div class="container">
    <KButton type="button" @click="open">
      Choose a CSV
    </KButton>

    <KButton type="button" @click="reset">
      Reset
    </KButton>

    <ol-map style="height: 700px">
      <ol-view
        ref="view"
        :center="center"
        :rotation="rotation"
        :zoom="zoom"
        :projection="projection"
        @change:center="centerChanged"
        @change:resolution="resolutionChanged"
        @change:rotation="rotationChanged"
      />

      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>


      <ol-vector-layer>
        <ol-source-vector>
          <ol-feature>
            <ol-geom-multi-polygon
              :coordinates="coordinates"
            ></ol-geom-multi-polygon>
            <ol-style>
              <ol-style-stroke
                :color="strokeColor"
                :width="strokeWidth"
              ></ol-style-stroke>
            </ol-style>
          </ol-feature>
        </ol-source-vector>
      </ol-vector-layer>
    </ol-map>

    <ul>
      <li>center : {{ currentCenter }}</li>
      <li>resolution : {{ currentResolution }}</li>
      <li>zoom : {{ currentZoom }}</li>
      <li>rotation : {{ currentRotation }}</li>
    </ul>
  </div>

</template>

<style scoped>
.ol-map {
  position: relative;
}
.ol-map-loading:after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  margin-top: -40px;
  margin-left: -40px;
  border-radius: 50%;
  border: 5px solid rgba(180, 180, 180, 0.6);
  animation: spinner 0.6s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>