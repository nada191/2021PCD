import { IonContent, IonHeader, IonPage, IonFooter, IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardContent, IonText  } from '@ionic/react';
import Header from '../components/Header';
import './Home.css';
import Footer from '../components/Footer';
import Description1 from '../components/Description1';
import CardRecherche from '../components/CardRecherche';
import CardCommander from '../components/CardCommander';
import TaperMed1 from '../components/TaperMed1';
import React from 'react';
import CaptureOrd from '../components/CaptureOrd';
import { useHistory } from 'react-router-dom';
const Home: React.FC = () => {

  const history=useHistory();

  return (
    <IonPage>
      <IonHeader >
        <Header></Header>
      </IonHeader>
      <IonContent fullscreen  >
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonCard>
                <IonCardContent >
                    <IonText className="desc1">Maintenant c'est facile de trouver le médicament que vous cherchez en un seul click !!</IonText>
                  <IonRow>
                    <IonText className="desc2">Il suffit de taper le nom du médicament ou predre une photo de votre ordonnance médicale </IonText>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            <IonButton routerLink="/commander" onClick={(e) => {
            e.preventDefault();
            history.push('/capturer')}}>Capturer Ordonnance</IonButton>
            <IonButton routerLink="/capturer" onClick={(e) => {
            e.preventDefault();
            history.push('/taper')}}>Saisir nom</IonButton>
            </IonCol>
          </IonRow>
          
        </IonGrid>               
 

        {/*<IonGrid>
        <IonRow >
            <Description1></Description1>
        </IonRow>
        <IonRow>
          <TaperMed1></TaperMed1>         
        </IonRow>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <IonRow  >
          <IonCol size="6">
            <CardRecherche ></CardRecherche>
          </IonCol>
          <IonCol size="6">
            <CardCommander ></CardCommander>            
          </IonCol>

        </IonRow>
        </IonGrid>*/}
      </IonContent>
      {/*<IonFooter class="ion-no-border">
        <Footer></Footer>
      </IonFooter>*/}
    </IonPage>
  );
};

export default Home;
