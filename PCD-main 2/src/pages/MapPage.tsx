import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import React from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header';
import Map from '../components/Map';
import '../components/Style.css'
const MapPage: React.FC=()=>{
    return(
        <IonPage>
            <IonHeader>
                <Header></Header>
            </IonHeader>
            <IonContent fullscreen>
                <Map></Map>
            </IonContent>
            <IonFooter>
                <Footer></Footer>
            </IonFooter>
        </IonPage>

    )
}
export default MapPage;