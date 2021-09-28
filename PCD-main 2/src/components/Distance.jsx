import React from "react";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import {useState,useEffect,useRef} from "react";
import { IonButton } from "@ionic/react";
import 'leaflet-routing-machine';  //npm i --save-dev @types/leaflet-routing-machine 
//import 'leaflet-control-geocoder'; //npm i --save-dev @types/leaflet-control-geocoder  declare module 'leaflet-control-geocoder



const Distance=()=>{
    const [Location, setLocation] = useState([0,0])
    const [Map, setMap] = useState()
    const ref=useRef(null)

    

  /*  setTimeout(()=>{
       //if(Map) Map.invalidateSize();
       window.dispatchEvent(new Event('resize'));

    },0)*/

    const locateUser=()=>{
        
       // window.dispatchEvent(new Event('resize'));
       //Map!.invalidateSize()
        Map.locate({setView: true, maxZoom: 16}) .on('locationfound', function(e){ 
            console.log(e.latlng)
            setLocation(e.latlng)
            var marker = L.marker(e.latlng,{icon:myIcon}).bindPopup('Your are here :)').openPopup();
            var circle = L.circle(e.latlng,e.accuracy, {
                weight: 1,
                color: 'blue',
                fillColor: '#cacaca',
                fillOpacity: 0.2
            }).addTo(Map).bindPopup('Your are here :)').openPopup();
            Map.invalidateSize();
           
            //Map.addLayer(marker);
            //Map.addLayer(circle);
        })
       .on('locationerror', function(e){
            console.log(e);
            alert("Location access denied.");
        });
        
        Map.stopLocate()
        var routeControl= L.Routing.control({autoRoute:true,
            waypoints: [
              L.latLng(36.8181248,10.1679104),
              L.latLng(36.80843568093678,10.11452965477464,71610884)
            ],show:true, units: 'imperial',
           router: L.Routing.mapbox('pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'),
            createMarker: function(i, wp, nWps) {
              if (i === 0 || i === nWps + 1) {
                // here change the starting and ending icons
                return L.marker(wp.latLng, {
                  icon: myIcon
                });
              } else {
                return L.marker(wp.latLng, {
                  icon: myIcon
                }); 
              }
            }
          }).addTo(Map);

          routeControl.on('routesfound', function(e) {
            var routes = e.routes;
            var summary = routes[0].summary;
            // alert distance and time in km and minutes
            alert('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
         });
         
      
       
        
    }
    
    const myIcon = L.icon({
        iconUrl: markerIconPng,
        iconSize: [15,25],
        iconAnchor: [2, 2],
        popupAnchor: [5,5]
     });
     const startMap = ()=> {
        if (!Map) {
            defaultMapStart();
        }
    };
    useEffect(startMap, [Map]);
    const defaultMapStart = () => {
        const defaultAddress= [36.842375712902836,10.040028624107437]
        initMap(11, defaultAddress);
    };

    const initMap = (zoomLevel, address)=> {
        //window.dispatchEvent(new Event('resize'));
        if (ref.current) {


       var mymap=L.map(ref.current).setView([36.842375712902836,10.040028624107437], 12);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
    }).addTo(mymap);
            setMap(
             mymap);  
    
        
            
        }
    //window.dispatchEvent(new Event('resize'));
       
    };
    

return(
    <>
    <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />
<script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>
    <IonButton onClick={()=>locateUser()}>Get my Location</IonButton>
    <div id="map" ref={ref}
   // style={{width:"100%",height:"100vh" , display:"flex",justifyContent:"center"}}
    style={{ height: '100vh', width: '100wh' }}
    
  
    ></div>
    </>
);

}
export default Distance;