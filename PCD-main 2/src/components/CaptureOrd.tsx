import {IonFabButton,IonIcon,IonGrid,IonCol,IonImg,IonRow, IonButton} from '@ionic/react'
import React,{useState} from 'react'
import { camera} from 'ionicons/icons';
import { usePhotoGallery , Photo} from '../hooks/usePhotoGallery'
import axios from "axios";
import Lister from './Lister';


const CaptureOrd : React.FC=() =>{
    const [drugs,setDrugs]=useState<string[]>([])
    const [medicaments,setmedicaments]=useState<string[][]>([])
    const [visible,setvisible]=useState(false)
    const [chaines,setchaines]=useState<string[]>([])

    async function med_names(photo:Photo){
      //console.log("photo information")
     //console.log(photo)
     setvisible(false)
     let formData=new FormData()
     let formData1=new FormData()
     let ph=photo.baseString
     let name=photo.filepath
     if (ph!=undefined){
        formData.append('photo',ph)
        formData.append('filename',name)
     }
      const response = await axios.post('http://127.0.0.1:5000/medecines',formData)
      console.log(response.data)
      let liste : string[] = response.data
      liste.forEach(element => {
        drugs.push(element.trimEnd())
      });
      formData1.append('med',JSON.stringify(drugs))
      const response1 = await axios.post('http://127.0.0.1:8080//medicaments',formData1)
      console.log(response1.data)
      let liste1 :string[][]=response1.data
      //setmedicaments(liste1)
      console.log(liste1)
      
          liste1.forEach(element => {
            let ch:string=""
            for (let index = 0; index < element.length; index++) {
              if (element[index]!=null){
                ch = ch +" "+element[index]
              }
              
            }
            chaines.push(ch)
            console.log(ch)
            medicaments.push(element)
          });
          console.log(medicaments)
      console.log(chaines)
      setvisible(true)

    
    }

    const {takePhoto,photos } = usePhotoGallery();
    
    const handlePhoto=()=>{
      photos.map((photo,index)=>{med_names(photo)});
      //setLoaded(true)
    }
    return ( 
        <>   
               
                <IonFabButton onClick={() => takePhoto()}>
                    <IonIcon icon={camera}></IonIcon>
                </IonFabButton>
                
                {<IonGrid>
                  <IonRow>
                    {photos.map((photo, index) => (
                      <IonCol size="6" key={index}>
                        <IonImg src={photo.baseString} />
                      </IonCol>
                    ))}
                  </IonRow>
                    </IonGrid>}
                <IonButton onClick={()=>handlePhoto()}>Result</IonButton>
                {/*isLoaded?
                   <Redirect to='/Medecines'/>:<p></p>*/}
                {visible && <Lister liste={chaines} res={medicaments}></Lister>}
        </>
    )
}

export default CaptureOrd
