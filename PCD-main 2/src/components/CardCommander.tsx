import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/react'
import { medkitOutline } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router-dom';

const CardCommander :React.FC =()=>{
    const history=useHistory();
    return(
        <IonCard color="tertiary" routerLink="/commander" onClick={(e) => {
            e.preventDefault();
            history.push('/commander')}}>
            <IonCardHeader>
                <IonCardSubtitle>
                    <IonIcon icon={medkitOutline} size="large"></IonIcon>
                </IonCardSubtitle>
                <IonCardTitle>
                    Commander vos médicaments
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                Recevez vos médicaments chez vous avec un seul click . 
                Appuyez pour savoir plus.
            </IonCardContent>

        </IonCard>
    )
}

export default CardCommander