import { IonContent, IonFooter, IonHeader, IonPage,IonButton ,IonGrid,IonRow,IonCol,IonItem,IonInput,IonLabel} from '@ionic/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import TaperMed1 from '../components/TaperMed1'

const Taper: React.FC=()=>{
    const history=useHistory();
    const [nomMed, setnomMed] = useState<string>();

    const handleInput=(e:React.ChangeEvent<HTMLIonInputElement>)=>{
        //console.log(e.target.files)
        //console.log(e.target.files[0]
        
        
    }

    return(
        <IonPage>
            <IonHeader>
                <Header></Header>
            </IonHeader>
            <IonContent>
                <TaperMed1></TaperMed1>
                {/*<TaperMed></TaperMed>*/}
                {/*<IonGrid >
                    <IonRow className="ion-align-items-center">
                        <IonCol size="8" className="ion-align-self-center">
                            <IonItem>
                                <IonLabel position="floating">Nom du medicament</IonLabel>
                                <IonInput  name="spec"  ></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonButton routerLink="/map" onClick={(e) => {e.preventDefault();
                history.push('/map')}}>Rechercher</IonButton>*/}
            </IonContent>
            {/*<IonFooter>
                <Footer></Footer>
            </IonFooter>*/}
        </IonPage>
    )
}
export default Taper;