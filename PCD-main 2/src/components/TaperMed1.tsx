import { IonItem,IonList,IonLabel,IonSearchbar, IonRow, IonCol, IonPage, IonHeader, IonContent, IonFooter, IonButton, IonCard, IonCardHeader, IonCardTitle, IonText, IonAlert, IonInput} from '@ionic/react';
import React,{useEffect, useState} from 'react';
import '../components/Style.css';
import axios from 'axios';
import Lister from './Lister';

const TaperMed1 : React.FC =()=>{

    const [showAlert, setShowAlert] = useState(false);
    const [nomMed, setnomMed] = useState('');
    const [test,settest]=useState<boolean>(false)
    const [medicaments,setmedicaments]=useState<string[][]>([])
    const [chaines , setchaine]=useState<string[]>([])


    async function handleInput() {
        
        settest(false)
        console.log(nomMed)
        let formData = new FormData()
        if (nomMed!=undefined){
            formData.append('spec',nomMed)
        }
        const resp = await axios.post('http://127.0.0.1:8080/med/',formData)
        console.log(resp.data)
        if(resp.data.length <1){
            setShowAlert(true)
            settest(true)
        }
        else{
            let liste : string[][]=resp.data
            //console.log(liste)
            liste.forEach(element => {
            medicaments.push(element)
            //console.log(element)
            });
            //console.log(medicaments)
            liste.forEach(elm => {
                let chaine:string=""
                for (let index = 0; index < elm.length; index++) {
                    if (elm[index]!=null){
                        chaine = chaine + " "+elm[index]
                    }
                    
                }
            //console.log(chaine)
                chaines.push(chaine)
            });
            //console.log(chaines)
            settest(true)
        }
        

    }

    return(
        <>
            <IonRow>
            <IonItem >
                <IonLabel position="floating">Nom du medicament</IonLabel>
                {/*onChange={(e)=>handleInput(e)}*/}
                <IonInput  name="spec" value={nomMed} onIonChange={e=>setnomMed(e.detail.value!)} clearInput ></IonInput>
                
            </IonItem>
            <IonButton  onClick={()=>handleInput()}>confirmer</IonButton>

            </IonRow>
  
            <IonCol>
                { showAlert && <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => {setShowAlert(false);}}
                cssClass='alerte'
                header={'Alert'}
                subHeader={'Subtitle'}
                message={'Medicament introuvable'}
                buttons={['OK']}
                /> }
                {test &&<Lister liste={chaines} res={medicaments}></Lister>}
            </IonCol>        
        </>


        /*<IonCol>
            <IonSearchbar class="search"   onIonChange={(e)=>{handleInput(e)}}  showCancelButton="focus">
            </IonSearchbar>
            
                {test &&<Lister liste={drugs} res={resultat}></Lister>}
                
        </IonCol>*/
        

        )
}


export default TaperMed1;