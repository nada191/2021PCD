import { IonCol, IonContent, IonFooter, IonHeader, IonPage, IonRow, IonText,IonFabButton,IonIcon, IonButton, IonCard, IonImg, IonCardContent} from '@ionic/react'
import React, { useState } from 'react'
import CaptureOrd from '../components/CaptureOrd'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../components/Style.css'
import { camera, clipboardOutline } from 'ionicons/icons';
import { Photo, usePhotoGallery } from '../hooks/usePhotoGallery'
import axios from 'axios'
import Lister from '../components/Lister'

const Capturer : React.FC=()=>{
    const [visibleSubmit,setvisibleSubmit]=useState(false);
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
        setvisibleSubmit(false);
  
      
      }
  
      const {takePhoto,photos } = usePhotoGallery();
      
      const handlePhoto=()=>{
        photos.map((photo,index)=>{med_names(photo)});
        //setLoaded(true)
      }

      async function tout() {
        await takePhoto();
        handlePhoto();
        setvisible(true);
      }

    return(
        <IonPage>
            <IonHeader>
                <Header></Header>
            </IonHeader>
            <IonContent fullscreen>
                <IonRow class="ion-text-center" >
                  <IonCol>
                  <IonText class="desc1 milieutext">Veuillez prendre une photo claire et lisible de votre ordonnace. </IonText>

                  </IonCol>
                  <IonCol>
                    <IonFabButton onClick={() => {takePhoto();setvisibleSubmit(true)}} class="cam">
                            <IonIcon icon={camera}></IonIcon>
                        </IonFabButton>
                  </IonCol>
                
        
                          
                 </IonRow>
   
                    

                    
                    
                    {/*<CaptureOrd></CaptureOrd>*/}

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {/*<IonRow>
                    {photos.map((photo, index) => (
                      <IonCol key={index} >
                        <IonImg className="image" src={photo.baseString} />          
                      </IonCol>
                    )) }


                    </IonRow>*/}     
                <IonRow>
                    {visibleSubmit && <IonButton onClick={()=>handlePhoto()} class="res">Result</IonButton>}

                        {/*<IonRow >
                            <IonFabButton >
                                <IonIcon icon={clipboardOutline}></IonIcon>
                            </IonFabButton>
                        </IonRow>*/}
                </IonRow>
                {visible && <Lister liste={chaines} res={medicaments}></Lister>}
            </IonContent>
            {/*<IonFooter>
                <Footer></Footer>
            </IonFooter>*/}
        </IonPage>
    )
}
export default Capturer;