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
    let stationBlock = `                         
    <div class="stationBlock" style="width: 18rem">
    <div class="stationtext">
      <h5>站名:<b>${data[k].sna}</b></h5>
      <p class="card-text">可借車輛:<b>${data[k].sbi}</b></p>
      <p class="card-text">可還車輛:<b>${data[k].bemp}</b></p>
      <p class="card-text">車站位址:${data[k].sarea} ${data[k].ar}</p>
    </div>`
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
    } else if (snonumber !== '') {
      console.log('two')
      let sarea = data[k].sarea.search(snonumber)
      let sna = data[k].sna.search(snonumber)
      let ar = data[k].ar.search(snonumber)
      if (sarea !== -1 || ar !== -1 || sna !== -1) {
        stationBlock
        $('#searchResultBlock').append(stationBlock)
      }
    } else if (region !== '') {
      let region = document.querySelector('#region').value
      const regionData = data[k]
      if (data[k].sarea === region) {
        console.log('three')
        stationBlock
        $('#searchResultBlock').append(stationBlock)
      }
    }
  }
}
// let region =document.querySelector('#region').value
