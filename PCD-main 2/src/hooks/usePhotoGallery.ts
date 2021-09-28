import { useState} from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import { CameraResultType, CameraSource} from "@capacitor/core";

export interface Photo {
    filepath: string;
    //webviewPath?: string;
    //path?: string;
    baseString?:string;
  }
export function usePhotoGallery() {
    //essai
    const { getPhoto } = useCamera();
    const [photos, setPhotos] = useState<Photo[]>([]);
    const takePhoto = async () => {
        const cameraPhoto = await getPhoto({
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera,
            quality: 100,
            width:640,
            height:640

        });
        const fileName = new Date().getTime() + '.jpeg';
        const newPhotos = [{
            filepath: fileName, 
            //webviewPath: cameraPhoto.webPath,
            //path: cameraPhoto.path,
            baseString:cameraPhoto.dataUrl
            
        }, ...photos];
        setPhotos(newPhotos)
    };
  
    return {
        takePhoto,
        photos

    };
    /*const { getPhoto } = useCamera();
    const [photos, setPhotos] = useState<Photo[]>([]);
    const takePhoto = async () => {
        const cameraPhoto = await getPhoto({
            resultType: CameraResultType.Uri,//CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        });
        const fileName = new Date().getTime() + '.jpeg';
        const newPhotos = [{
            filepath: fileName,
            webviewPath: cameraPhoto.webPath //webpath
            
        }, ...photos];
        setPhotos(newPhotos)
    };
  
    return {
        takePhoto,
        photos

    };*/
  }