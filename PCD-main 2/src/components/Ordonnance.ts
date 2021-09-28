import axios from 'axios';
import { expandOutline } from 'ionicons/icons';
import React, { useState } from 'react'
import { Photo } from '../hooks/usePhotoGallery';



export async function Ordonnance(photo:Photo) {
    const [drugs,setDrugs]=useState<string[]>([])
const [medicaments,setmedicaments]=useState<string[][]>([])
const [chaines,setchaines]=useState<string[]>([])

    //setvisible(false)
     let formData=new FormData()
     let formData1=new FormData()
     let ph=photo.baseString
     let name=photo.filepath
     if (ph!=undefined){
        formData.append('photo',ph)
        formData.append('filename',name)
     }
      const response = await axios.post('http://127.0.0.1:5000/medecines',formData)
      console.log(response.data)
      let liste : string[] = response.data
      liste.forEach(element => {
        drugs.push(element.trimEnd())
      });
      formData1.append('med',JSON.stringify(drugs))
      const response1 = await axios.post('http://127.0.0.1:8080//medicaments',formData1)
      console.log(response1.data)
      let liste1 :string[][]=response1.data
      //setmedicaments(liste1)
      console.log(liste1)
      
          liste1.forEach(element => {
            let ch:string=""
            for (let index = 0; index < element.length; index++) {
              if (element[index]!=null){
                ch = ch +" "+element[index]
              }
              
            }
            chaines.push(ch)
            console.log(ch)
            medicaments.push(element)
          });
          console.log(medicaments)
      console.log(chaines)

    
}

