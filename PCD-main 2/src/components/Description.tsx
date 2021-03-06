import React from 'react';
import { IonContent,IonGrid,IonRow,IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';

const Description: React.FC = () => {
    return (
      <IonContent color="Medium">
          <IonGrid >
              <IonRow  > 
                  <IonCol >
                    <IonCard color="primary">
                            <IonCardHeader>
                                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                <IonCardTitle>Card Title</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                Keep close to Nature's heart... and break clear away, once in awhile,
                                and climb a mountain or spend a week in the woods. Wash your spirit clean.
                            </IonCardContent>
                    </IonCard>
                  </IonCol>
              </IonRow>
          </IonGrid>
      </IonContent>
  );
};
export default Description;