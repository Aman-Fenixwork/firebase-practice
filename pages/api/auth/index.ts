// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as admin from "firebase-admin";
import serviceAccount from '../../../config/firebase-sdk.json'

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(JSON.stringify(serviceAccount)))
    });
} else {
    admin.app()
}

type TokenData = {
    token: string
}

export default function getCustomToken(req: any, res: any) {
    if (req.method === 'POST'){
        const body = JSON.parse(req.body);
        // console.log(body);
        
        admin.auth().createCustomToken(body.uid)
        .then((customToken: string) => {
            // Send token back to client
            res.status(200).json({ token: customToken })
        })
        .catch((error: any) => {
            // console.log('Error creating custom token:', error);
            res.status(500).json({ message: 'Error creating custom token!' })
        });
    } else {        
        res.status(200).json({ token: 'John Doe' })
    }
}