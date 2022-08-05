import * as admin from "firebase-admin";
import serviceAccount from '../../config/firebase-sdk.json';
import { getStorage } from "firebase-admin/storage";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(JSON.stringify(serviceAccount))),
        storageBucket:"pageandpage-dev.appspot.com",
    });    
   
} else {
    admin.app()
}

export default admin.firestore();

export const bucket = getStorage().bucket();

export const storage=admin.storage();