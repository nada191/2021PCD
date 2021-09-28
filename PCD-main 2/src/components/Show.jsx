import { IonButton ,IonModal} from "@ionic/react";
import React,{useRef,useState,useEffect} from "react";
import axios from "axios";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerIcon from "../assets/img/marker-icon-2x-gold.png";
import {Icon} from 'leaflet'
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'
import './Style.css'
import MyModal from "./MyModal";
import { Geolocation } from '@ionic-native/geolocation';


const Show=( {props })=>{
  const Result = props
    const ref=useRef(null)
    //const [pharLoc, setpharLoc] = useState()
    const [Map, setMap] = useState()
    const [Info,setInfo]=useState("")
    const [med, setmed] = useState([])
    const [title, setTitle] = useState("")
    const [position, setPosition] = useState();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState({ showError: false });

   const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false)
   const myIcon = L.icon({
    iconUrl:markerIconPng,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  
 });
   const goldIcon = L.icon({
  iconUrl:markerIcon,
  iconSize:[25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
    });

   async function closeModal() {
    await setShowModal(false);
   }

  /* const Inter=[{"FOSTER 2mg gélule":[['Pharmacie Kahia La Manouba','Avenue Habib Bourguiba La Manouba TN 2010, Ave Habib Bourguiba, Manouba',36.824239593951404, 10.093586977888561,70615041,3],
   ['Pharmacie de nuit','Oued Ellil 2100',36.842375712902836,10.040028624107437,71536566,1]],
   "SOLACY 10Ml Sirop":[['Pharmacie Kahia La Manouba','Avenue Habib Bourguiba La Manouba TN 2010, Ave Habib Bourguiba, Manouba',36.824239593951404, 10.093586977888561,70615041,3],
   ['Pharmacie de nuit','P5, Den Den',36.80843568093678,10.11452965477464,71610884,2]],
   "Doliprane 1000 gélule":[['Pharmacie Kahia La Manouba','Avenue Habib Bourguiba La Manouba TN 2010, Ave Habib Bourguiba, Manouba',36.824239593951404, 10.093586977888561,70615041,31]]
}
  ]*/
  /*const Inter=[{"FOSTER 2mg gélule":[['Pharmacie Kahia La Manouba','Avenue Habib Bourguiba La Manouba TN 2010, Ave Habib Bourguiba, Manouba',36.824239593951404, 10.093586977888561,70615041,3]]}]*/
  async function calcul(lat_1,lon_1,lat_2,lon_2){
      const response=await axios.get(`http://router.project-osrm.org/route/v1/car/${lon_1},${lat_1};${lon_2},${lat_2}?overview=false`)
      return response.data["routes"][0]["legs"][0]["distance"]
    }
  
    const verify_marker=(map,location)=>{
      let l=new L.latLng(location[0],location[1])
      let res=false
      map.eachLayer(function(layer) {
       
        if (layer instanceof L.Marker && JSON.stringify(layer.getLatLng()) === JSON.stringify(l)) {
              res=true 
  }

      })
      return res 
  }
    const add_markers=(map,location, text,modal)=>{
      if (!verify_marker(map,location))
         {let marker=L.marker(location,{icon:myIcon}).addTo(map).bindPopup(text);
           
        marker.on('click', function (e) {
          setShowModal(true)
          setTitle(marker.getPopup().getContent())
          setInfo(modal)
         

        });
    }
    
     
    }
    const verify_exist=(arr,elt)=>{
          let res=false
         for(let i=0;i<arr.length;i++){
               if(JSON.stringify(arr[i]) === JSON.stringify(elt))
                   {
                     res=true;
                     break
                   }
                      
         }
       return res;
    }
    const drawClosest=async (map,Inter,loc)=>{
      let d;
      for(let i=0;i<Inter.length;i++){
        let p=Inter[i];
        d=await calcul(loc[0],loc[1],p[2],p[3])
        p.push(d)

      }
      Inter.sort(function(a, b){return a[a.length-1]-b[a.length-1]});
      console.log("inter")
      console.log(Inter)
      let destination=new L.latLng(Inter[0][2],Inter[0][3]);
      let pts=[loc,destination];
      L.Routing.control({
        show: true,
            waypoints:pts, 
            router: L.Routing.mapbox('pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw')
        ,createMarker: function(i, wp, nWps){
          if (i === 0 || i === nWps + 1) {
            // here change the starting and ending icons
           
            return ;
            
          
          } else {
           let marker=L.marker(wp.latLng, {
            icon: goldIcon
          }).bindPopup(Inter[0][0]);
           
        marker.on('click', function (e) {
          setShowModal(true)
          setTitle(marker.getPopup().getContent())
          let modal="Addresse : "+Inter[0][1]+"\n"+"Tél : "+Inter[0][4]+"\n"+
          "Vous trouvez ici tous les médicaments cherchés"
          setInfo(modal)
         

        });
            return marker; 
          }
            
            }
        
        
        }).addTo(map);
    return Inter[0].slice(0,5);

    }
    const FindPharma=async(map,Result,loc)=>{
    let pharma=Result[0];
    let inter=Result[1];
    let closestInter;
    if (inter.length>0)
         closestInter=drawClosest(map,inter,loc);
    console.log(closestInter+"close");
    console.log(pharma)
    let d;
    //pharma=pharma[0]
    let meds=Object.keys(pharma)
    let pharmacies=Object.values(pharma)
    
    for (let i=0;i<meds.length;i++)
    {  let med=meds[i]
      let phar=pharma[med]
    
      for(let j=0;j<phar.length;j++)
      { let p=phar[j]
        d=await calcul(loc[0],loc[1],p[2],p[3])
        p.push(d)
      }


    }
    for (let i=0;i<meds.length;i++)
    { 
      let med=meds[i]
      let phar=pharma[med]
      if (phar.length!=0)
         phar.sort(function(a, b){return a[a.length-1]-b[a.length-1]});
       
   }
   console.log(pharma)
   let unfound=[]
   let closest_phar=[]
   for (let i=0;i<meds.length;i++)
    { 
      let med=meds[i]
      let phar=pharma[med]
      if (phar.length!=0)
       { let p=phar[0].slice(0,5)
         
        if(!verify_exist(closest_phar,p)) 
            closest_phar.push(p)
       }
      else 
      unfound.push(med)
       
   }
   console.log("unfound med")
   console.log(unfound)
   console.log(closest_phar)
   for (let i=0;i<closest_phar.length;i++){
    let pharmacie=closest_phar[i]

    for (let j=0;j<meds.length;j++)
    { let med=meds[j]
     
      let phar=pharma[med]
      if (phar.length!=0)
         {
            if (JSON.stringify(phar[0].slice(0,5)) === JSON.stringify(pharmacie.slice(0,5)))
                 
               {
                 pharmacie.push(med)
                pharmacie.push(phar[0][5])
              }
             
          }
     
   }



}
console.log("closest")
console.log(closest_phar)
for (let i=0;i<closest_phar.length;i++){
  let p=closest_phar[i]
  console.log(p)
  let text="Addresse : "+p[1]+"\n"
  text+="Tél : "+p[4]+"\n"
  for (let j=5;j<p.length-1;j+=2)
      {text+=p[j]
       if (p[j+1]<5)
          text+=" QTE "+p[j+1].toString()+"\n"
       else 
       text+="\n"+"Vous pouvez acheter au plus 4 unités."}
       
 console.log(text)

  add_markers(map,[p[2],p[3]],p[0],text)



}
    
    }

    
    const getLocation = async () => {
        setLoading(true);

        try {
            const pos = await Geolocation.getCurrentPosition();
            var location=[pos["coords"]["latitude"] ,pos["coords"]["longitude"]]
            //var location=[36.8181248,10.1679104]
            console.log(location)
            setPosition(location);
            setLoading(false);
            setError({ showError: false });
            await setShowMap(true);
            const map=initMap(12,location)
            FindPharma(map,Result,location)
           
            
            

        } catch (e) {
            setError({ showError: true, message: e.message });
            setLoading(false);
        }
        
    }


  const initMap = (zoomLevel, address)=> {
      if (ref.current) {


     var mymap=L.map(ref.current).setView(address,zoomLevel);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
  }).addTo(mymap);
  var marker = L.marker(address,{icon:myIcon}).addTo(mymap).bindPopup('Your are here :)').openPopup();
          setMap(
           mymap)
           
          
   return mymap
           
          
      }}

    
   
   
   //npx cap open android 
return(
    <>
    <IonButton onClick={()=>{getLocation()}}>
          Get My location
    </IonButton>
     {showMap&&<div id="map" ref={ref}
     className="leaflet-container"
      ></div>}
       <IonModal isOpen={showModal}/*cssClass='my-custom-class'*/>
        <MyModal closeAction={closeModal} 
                 text={Info}  title={title}>
        </MyModal>
      </IonModal>
     
      
      </>
)


}
export default Show;