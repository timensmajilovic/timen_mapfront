/* global H */
import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
var st=0;
var platform = new H.service.Platform({
  apikey: 'Pep6V5jtOUK2NtpSD6rxCnDmJNxIiabTM1DLAxNBrE8'
});
var defaultLayers = platform.createDefaultLayers();
function App() {
  
  const [kraj, setKraj] = useState('');

  const [showLocations, setShowLocations] = useState([]);
function add()
{
  if(st === 0)
  {
    var st =document.getElementById("myText").value ;
    var re = st.split(", ");
    console.log(re[1]);
    
  document.getElementById("k1").innerHTML =  re[0] ;
  document.getElementById("d1").innerHTML =  re[1] ;
  document.getElementById("l1").innerHTML =  re[2] ;
  document.getElementById("lo1").innerHTML =  re[3] ;
  st++;  
  }
  else if(st === 1)
  {
  
     st =document.getElementById("myText").value ;
     re = st.split(", ");
    console.log(re[1]);
    
  document.getElementById("k2").innerHTML =  re[0] ;
  document.getElementById("d2").innerHTML =  re[1] ;
  document.getElementById("l2").innerHTML =  re[2] ;
  document.getElementById("lo2").innerHTML =  re[3] ;
  st++;
  }
}
  const sendFunction = function(){
    axios({
      "method":"POST",
      "url":"http://localhost:4000",
      "headers":{
        "content-type":"application/api",
      },
      "params": {
       
        "lat1":document.getElementById("l1").innerHTML,
        "lon1": document.getElementById("lo1").innerHTML,
        "lat2":document.getElementById("l2").innerHTML,
        "lon2": document.getElementById("lo2").innerHTML
      }
      })
      .then((response)=>{
        
        if(response.data.data === "Error"){
          document.getElementById("lat").innerHTML =  "ERROR";
        } 
        else
        {
          var map = new H.Map(document.getElementById('map'),
          defaultLayers.vector.normal.map,{
          center: {lat:50, lng:5},
          zoom: 4,
          pixelRatio: window.devicePixelRatio || 1
        });

        window.addEventListener('resize', () => map.getViewPort().resize());

        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        
        
        var ui = H.ui.UI.createDefault(map, defaultLayers);
        
      
        
            var parisMarker = new H.map.Marker({lat:response.data.wearesult[0].lat, lng:response.data.wearesult[0].lon});
            map.addObject(parisMarker);
        
             parisMarker = new H.map.Marker({lat:response.data.wearesult[1].lat, lng:response.data.wearesult[1].lon});
            map.addObject(parisMarker);
        
             parisMarker = new H.map.Marker({lat:response.data.wearesult[2].lat, lng:response.data.wearesult[2].lon});
            map.addObject(parisMarker);
        
             parisMarker = new H.map.Marker({lat:response.data.wearesult[3].lat, lng:response.data.wearesult[3].lon});
            map.addObject(parisMarker);
        
             parisMarker = new H.map.Marker({lat:response.data.wearesult[4].lat, lng:response.data.wearesult[4].lon});
            map.addObject(parisMarker);
      }
      })
      .catch((error)=>{
        console.log(error)
    })
  }
  var unirest = require("unirest");

  var req = unirest("GET", "https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php");
  
  req.query({
    "location": kraj
  });
  
  req.headers({
    "x-rapidapi-host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
    "x-rapidapi-key": 'Pep6V5jtOUK2NtpSD6rxCnDmJNxIiabTM1DLAxNBrE8'
  });
  req.end(function (res) {
    // if (res.error) throw new Error(res.error);
  console.log(res.body);
   
    if (res.body.Results === undefined ) {
      
 }
 else{
   if(res.body.Results[5] === undefined)
   {

   }
   else
   {
   document.getElementById("txt1").value = res.body.Results[0].name + ", " + res.body.Results[0].lat + ", " + res.body.Results[0].lon;
    document.getElementById("txt2").value = res.body.Results[1].name + ", " + res.body.Results[0].lat + ", " + res.body.Results[0].lon;
    document.getElementById("txt3").value = res.body.Results[2].name + ", " + res.body.Results[0].lat + ", " + res.body.Results[0].lon;
    document.getElementById("txt4").value = res.body.Results[3].name + ", " + res.body.Results[0].lat + ", " + res.body.Results[0].lon;
    document.getElementById("txt5").value = res.body.Results[4].name + ", " + res.body.Results[0].lat + ", " + res.body.Results[0].lon;
   }
}
    
  });
  return (
    
    <div className="App">
      
      <div >
      <h1 className="text-center"> Isči pot </h1><br/><br/>
         <div className="input-group input-group-lg">
        <div className="input-group-prepend">
          <span className="input-group-text bg-secondary text-white" id="inputGroup-sizing-lg">Kraj</span>
        </div>
        <input onChange={(e) => setKraj(e.target.value)} list="browsers" name="browser" id="myText" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
        <datalist id="browsers">
        <option  id="txt1" value=" "/>
        <option  id="txt2" value=" "/>
        <option  id="txt3" value=" "/>
        <option id="txt4" value=" "/>
        <option  id="txt5" value=" "/>
        </datalist>
        <div className="input-group-append">
    <button onClick={add} className="btn btn-outline-secondary" type="button" id="button-addon2">ADD</button>
  </div>
      </div>
      <br/>
      <button onClick={sendFunction} className="btn btn-outline-secondary" type="button" id="button-addon2">Generiraj</button>
<br/><br/>
      </div>
     <div id="blabla">

     </div>
     <div id="blabla2">

     </div>
     <table className="table table-hover table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">KRAJ</th>
      <th scope="col">DRŽAVA</th>
      <th scope="col">LAT</th>
      <th scope="col">LON</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td id="k1"></td>
      <td  id="d1"></td>
      <td  id="l1"></td>
      <td  id="lo1"></td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td  id="k2"></td>
      <td  id="d2"></td>
      <td  id="l2"></td>
      <td  id="lo2"></td>
    </tr>
    
  </tbody>
</table>

<div id="map"></div>
    </div>
  );
}
export default App;
