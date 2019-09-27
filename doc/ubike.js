//抓到json資料
var url = 'https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json'
var data
fetch(url)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
    data = response.retVal
  })

//按下搜尋

const SearchClick = () => {
  $('#searchResultBlock').empty()
  console.log(data)
  let snonumber = document.querySelector('#number').value
  const fonunddata = data[snonumber]
  let region = document.querySelector('#region').value
  const regionData = data[k]
  var k

  for (k in data) {
    //create dom
    let stationBlock = `                         
    <div class="stationBlock" style="width: 100% ">
    <div class="stationtext">
      <h5>站名:<b>${data[k].sna}</b></h5>
      <p class="card-text">可借車輛:<b>${data[k].sbi}</b></p>
      <p class="card-text">可還車輛:<b>${data[k].bemp}</b></p>
      <p class="card-text">車站位址:${data[k].sarea} ${data[k].ar}</p>
      <button 
      onclick="pan(${data[k].lng},${data[k].lat})"
      class=" btn btn-primary" id="pan">前往</button>
    </div>`
    //search both
    if (region !== '' && snonumber !== '') {
      let sarea = data[k].sarea.search(snonumber)
      let sna = data[k].sna.search(snonumber)
      let ar = data[k].ar.search(snonumber)
      const regionData = data[k]
      let region = document.querySelector('#region').value
      if (data[k].sarea === region && (ar !== -1 || sna !== -1)) {
        console.log('one')
        stationBlock

        $('#searchResultBlock').append(stationBlock)
      }
      //saearch region
    } else if (snonumber !== '') {
      console.log('two')
      let sarea = data[k].sarea.search(snonumber)
      let sna = data[k].sna.search(snonumber)
      let ar = data[k].ar.search(snonumber)
      if (sarea !== -1 || ar !== -1 || sna !== -1) {
        stationBlock
        $('#searchResultBlock').append(stationBlock)
        console.log(data[k].lng, data[k].lat)
      }
      //saearch keyword
    } else if (region !== '') {
      let region = document.querySelector('#region').value
      const regionData = data[k]
      let lng = data[k].lng
      let lat = data[k].lat

      if (data[k].sarea === region) {
        console.log('three')
        stationBlock
        $('#searchResultBlock').append(stationBlock)
      }
    }
  }
}
const mark = () => {
  let mark = []
  for (let k in data) {
    let lng = parseFloat(data[k].lng)
    let lat = parseFloat(data[k].lat)

    var marker = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([lng, lat])), // Cordinates of New York's Town Hall
    })
    let tempObj = { features: mark }
    marker.setStyle(
      new ol.style.Style({
        image: new ol.style.Icon({
          color: '#ffcd46',
          crossOrigin: 'anonymous',
          src: 'dot.png',
          scale: 0.5,
        }),
      })
    )
    mark.push(marker)
    let vectorSource = new ol.source.Vector(tempObj)
    // var vectorSource = new ol.source.Vector({
    //   features: [marker],
    // })
    var markerVectorLayer = new ol.layer.Vector({
      source: vectorSource,
    })
  }
  map.addLayer(markerVectorLayer)
}
let mapCenterLng = 121.544028
let mapCenterLat =25.060632
// Show map on page
let baseMapLayer = new ol.layer.Tile({ source: new ol.source.OSM() })
let view = new ol.View({
  center: ol.proj.fromLonLat([mapCenterLng, mapCenterLat]),
  // 以松山機場為中心點
  zoom: 13,
})
let map = new ol.Map({
  target: 'map',
  layers: [baseMapLayer],
  view: view,
})





// var baseMapLayer = new ol.layer.Tile({
//   source: new ol.source.OSM(),
// })
// var map = new ol.Map({
//   target: 'map',
//   layers: [baseMapLayer],
//   view: new ol.View({
//     center: ol.proj.fromLonLat([121.544028, 25.060632]),
//     zoom: 13, //Initial Zoom Level
//   }),
// })
const pan = (lng,lat) => {
  let location = ol.proj.fromLonLat([lng,lat])
  let duration = 2000

  view.animate({ center: location, duration: duration,zoom:18 })
}
setTimeout(() => mark(), 800)
