import React from 'react';
import { mail, call } from 'ionicons/icons';
import { IonContent, IonFooter, IonToolbar,IonTitle,IonButton,IonButtons,IonIcon, IonText } from '@ionic/react';
import './Style.css'
const Footer: React.FC = () => {
    return (
        <IonToolbar class="footer" color="light" >
          <IonIcon icon={mail} slot="primary"></IonIcon>
          <IonText slot="primary">&nbsp;PCD@ensi-uma.tn&nbsp;&nbsp;&nbsp;&nbsp;</IonText>
          <IonIcon icon={call} slot="primary"></IonIcon>
          <IonText slot="primary">&nbsp;25268745&nbsp;&nbsp;&nbsp;&nbsp;</IonText>
        </IonToolbar>
          
    );
};
export default Footer;
