import React from 'react';
import {IonHeader, IonContent, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon} from '@ionic/react';

type MyModalProps = {
  closeAction: Function;
  text: string;
  title:string;
}

class MyModal extends React.Component<MyModalProps> {
  render() {
    return <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>{this.props.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => this.props.closeAction()}>
              <IonIcon name="close" slot="icon-only"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding my-custom-class">
        <pre>{this.props.text}</pre>
      </IonContent>
    </>
  };
}

export default MyModal/* ({closeAction, text}: { closeAction: Function, text: string }) => (
  <MyModal closeAction={closeAction} text={text}>
  </MyModal>
)*/