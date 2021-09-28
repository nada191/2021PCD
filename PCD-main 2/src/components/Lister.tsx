import { IonButton, IonCheckbox, IonItem, IonLabel} from '@ionic/react'
import axios from 'axios';
import React, { useState } from 'react'
import Show from './Show';

const Lister:React.FC <{liste:string[],res:string[][]}> =({liste,res})=>{

    const [visible, setvisible] = useState(false)
    const [checked,setchecked]=useState<number[]>([])
    const[medicaments,setmedicaments]=useState<string[][]>([])
    const [ showmap,setshowmap]=useState(false)
    const [pharmacies,setpharmacies]=useState([{'':[["","","","","","",""]]}])
    function handleCHeck(e:number){
        console.log(e)
        checked.push(e)
        console.log(checked)
       }

    async function appelApi() {
        checked.forEach((element,i) => {
            console.log(res[element])
            medicaments.push(res[element])
        });
        let formData=new FormData();
        console.log(JSON.stringify(medicaments))
        formData.append('med',JSON.stringify(medicaments))
        const response = await axios.post('http://127.0.0.1:8080/pharmacieconcernee', formData);
        console.log(response.data);
        let liste :[]= response.data
        pharmacies.pop();
        await setpharmacies(response.data)
        setshowmap(true)


    }
    
    return(
        <>
            {liste.map((element,index) => (
                <IonItem key={index} >
                    <IonLabel class="ion-text-wrap">{element}</IonLabel>
                    <IonCheckbox  slot="end" value={index.toString()} onIonChange={(e)=>{handleCHeck(e.detail.value);setvisible(true)}} />
                </IonItem>
                
            ))}
            {visible &&  <IonButton onClick={()=>appelApi()}>Submit</IonButton>}
            {showmap  && <Show props={pharmacies}></Show>}
        </>
    )
}
export default Lister;