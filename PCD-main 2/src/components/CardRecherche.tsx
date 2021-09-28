import { IonCard ,IonCardTitle,IonCardSubtitle,IonCardContent,IonCardHeader,IonIcon} from '@ionic/react'
import { searchCircleOutline } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router-dom'
import '../components/Style.css'
const CardRecherche:React.FC=()=>{
    const history=useHistory();
    return(
        <IonCard routerLink="/taper" onClick={(e) => {
            e.preventDefault();
            history.push('/taper')}}>
            <IonCardHeader>
                <IonCardSubtitle>
                    <IonIcon icon={searchCircleOutline} size="large"></IonIcon>
                </IonCardSubtitle>
                <IonCardTitle>
                    Trouvez vos médicaments
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                Trouvez la pharmacie la plus proche de vous qui dispose des médicaments que vous cherchez
            </IonCardContent>

        </IonCard>
    )
}

export default CardRecherche