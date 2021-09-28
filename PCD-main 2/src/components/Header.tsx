import {IonTitle, IonToolbar,IonButton,IonButtons,IonImg, IonText  } from '@ionic/react';
import './Style.css'
const Header: React.FC=()=>{
    return(
        <IonToolbar color="light">
          <IonImg src='https://cdn.pixabay.com/photo/2014/04/03/11/47/pharmacy-312139_960_720.png' alt="5" class="Logo" slot="start"/>
          <IonText className="titre" slot="start">PharmaWin</IonText>
          <IonButtons slot="secondary">
                <IonButton class="button button-clear ">
                  Home
                </IonButton>
                <IonButton class="button button-clear ">
                  About
                </IonButton>
                <IonButton class="button button-clear ">
                  Contact
                </IonButton>
              </IonButtons>

        </IonToolbar>
    
    );
};
export default Header;