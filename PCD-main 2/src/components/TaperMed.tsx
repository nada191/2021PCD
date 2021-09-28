import { IonItem,IonList,IonLabel,IonSearchbar, IonRow, IonCol, IonPage, IonHeader, IonContent, IonFooter, IonButton, IonCard, IonCardHeader, IonCardTitle, IonText} from '@ionic/react';
import React,{useEffect, useState} from 'react';
import '../components/Style.css'
import axios from 'axios'
import Lister from './Lister';
import { render } from '@testing-library/react';

const TaperMed : React.FC =()=>{

    const [drugs,setDrugs]=useState<string[]>([])
    const [nomMed, setnomMed] = useState('');
    const [test,settest]=useState<boolean>(false)

    /*function afficher(drugs: string[]) {
        while (test && drugs !=[]) {
            <Lister liste={drugs}></Lister>;
            setDrugs([])
            settest(false)
        }
    }*/

   async function AppelApi() {
    let formData=new FormData();
    if (nomMed != undefined){
        formData.append('spec',nomMed); 
    }

    const response = await axios.post('http://127.0.0.1:8080/med/', formData);
    console.log(response.data);
    let list : string [] = response.data;
        Object.entries(list).forEach(element => {
            let chaine : string = ""
            for (let index = 0; index < element[1].length; index++) {
                console.log(element[1][index]);
                if (chaine != "null"){
                                    chaine =chaine + " "+element[1][index];
                }
            }
            console.log(chaine);
            drugs.push(chaine);
            console.log(drugs);}
                );
        settest(true)
            }
    return(
        <IonCol>
            <IonSearchbar className="spec" class="search" onIonChange={e => {setnomMed(e.detail.value!); console.log(nomMed)}} showCancelButton="focus">
                <IonButton onClick={()=>AppelApi()}>
                    Rechercher
                </IonButton>
            </IonSearchbar>
            {
             // test &&<Lister liste={drugs}></Lister>
            }   
            
        </IonCol>

        )
}


export default TaperMed;