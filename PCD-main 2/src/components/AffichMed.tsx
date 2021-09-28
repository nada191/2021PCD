import { IonCard, IonCardHeader, IonCardTitle, IonGrid, IonPage, IonRow, IonText } from "@ionic/react";
import React from "react";
export interface prop{
    med:string[]

}
const AffichMed:React.FC<{med :string [][]}>=({med})=>{
    //const {med}=props
return(
 <IonGrid>
    {med.map((medecine,i)=>(<IonRow  key={i}>
     <IonCard>
         <IonCardHeader>
             <IonCardTitle>{medecine}</IonCardTitle>
         </IonCardHeader>
     </IonCard>
    </IonRow>
    ))}

 </IonGrid>

)
}
export default AffichMed;