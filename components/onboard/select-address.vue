<template>
  <div id="select-address" class="flex flex-col h-screen pt-3 p-2">
    <h4 class="text-2xl font-semibold ml-4 mb-3">Salon Location</h4>

    <div id="mymap" class="w-full h-full rounded-lg flex-grow"></div>
    <BottomSheet ref="sheet" v-model="sheetState" :minHeight="180">
      <div class="px-6 py-4">
        <input
          type="text"
          placeholder="search location"
          class="bg-gray-100 w-full text-center p-3 rounded"
          id="searchinput"
          :value="query"
          @focus="sheetState = true"
          @input="(e) => (query = e.target.value)"
        />

        <div class="w-100 h-0.5 bg-primary m-auto mt-4"></div>

        <div class="w-full mt-4" v-if="shimmer">
          <div class="w-3/5 h-2 shine"></div>
          <div class="w-full h-6 shine"></div>
        </div>

        <div
          class="selected bg-primary rounded p-4 flex-grow"
          v-if="selectedLocation"
        >
          <p class="text-xs text-center">Confirm Selection</p>
          <h4 class="font-semibold mt-4">{{ selectedLocation.name }}</h4>
          <p>{{ selectedLocation.formatted_address }}</p>
          <UButton
            class="bg-accent mt-4 text-black shadow-none"
            @click.native="$emit('next', selectedLocation)"
            :loading="btnLoading"
            >Confirm</UButton
          >
          <button
            class="w-full text-sm mt-4 text-center p-3 rounded-full"
            @click="selectedLocation = false"
          >
            Cancel
          </button>
        </div>

        <div
          class="bg-primary p-2 rounded-lg mt-4"
          v-for="result in results"
          :key="result.name"
          @click="selectLocation(result)"
          v-else
        >
          <p>{{ result.name }}</p>
          <p class="text-xs text-gray-500">{{ result.formatted_address }}</p>
        </div>
      </div>
    </BottomSheet>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'
import BottomSheet from '../U/BottomSheet.vue'
let google, map, service
export default {
  name: 'AddressSelect',
  components: { BottomSheet },
  data() {
    return {
      map: false,
      query: '',
      results: [],
      debounce: null,
      shimmer: false,
      selectedLocation: false,
      marker: false,
      btnLoading: false,
      sheetState: false,
    }
  },
  async mounted() {
    const loader = new Loader({
      apiKey: 'AIzaSyBIypSom9sElFIsujOWKqhjOq7_awFkkIE',
      version: 'weekly',
      libraries: ['places'],
    })
    const element = document.getElementById('mymap')

    google = await loader.load()
    map = new google.maps.Map(element, {
      center: { lat: 16.597, lng: 73.644 },
      zoom: 13,
    })
    service = new google.maps.places.PlacesService(map)

    this.getLocation()
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.onLocationGranted,
          this.onLocationRejected
        )
      } else {
        alert('Gelocation is not supported by this browser')
      }
    },
    onLocationGranted(pos) {
      this.setMarker({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      })
    },
    onLocationRejected(err) {
      if (err.PERMISSION_DENIED) {
        this.$root.$Toast.danger('Permission Denied. ')
      }
    },
    setMarker(loc) {
      this.marker = new google.maps.Marker({
        position: loc,
        map,
      })
      map.panTo(this.marker.getPosition())
    },
    async searchLocation() {
      if (!this.query.length) {
        this.results = []
        return
      }
      this.shimmer = true

      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.findPlaceWithQuery()
      }, 600)
    },

    findPlaceWithQuery() {
      service.findPlaceFromQuery(
        {
          query: this.query,
          fields: ['name', 'geometry.location', 'formatted_address'],
        },
        (res) => {
          this.results = res
          this.shimmer = false
        }
      )
    },

    selectLocation(res) {
      this.selectedLocation = res
      if (!this.$refs.sheet.expanded) {
        this.$refs.sheet.expanded = true
      }
      if (this.marker) {
        this.marker.setMap(null)
      }
      this.setMarker({
        lat: res.geometry.location.lat(),
        lng: res.geometry.location.lng(),
      })
      this.query = ''
    },
  },

  watch: {
    query() {
      this.searchLocation()
    },
  },
}
</script>

<style></style>
