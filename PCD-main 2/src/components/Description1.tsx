import { IonButton, IonCol, IonText,IonAlert, IonContent ,useIonAlert} from '@ionic/react';
import React ,{useState} from 'react';
import './Style.css';
import pres from '../assets/presentation.gif'

const Description1 : React.FC=()=> {
    const [showAlert, setshowAlert] = useState<boolean>(false);
    const [present]=useIonAlert();
    return (
                    <IonCol  class="ion-text-center">
                        <IonText className="desc1" >
                            Bienvenue a votre premiere pharmacie en ligne
                        </IonText>
                        <h3 className="desc2">Nous facilitons votre vie  </h3>
                        <IonButton color="tertiary" >Qui sommes nous ?</IonButton>
                        
                    </IonCol>

                    
              
       
    )
}

export default Description1
