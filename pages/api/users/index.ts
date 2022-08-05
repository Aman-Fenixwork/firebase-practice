import db from "../admin-config";

const updateUsersViaUID = async (uid:string, dataToUpdate:any) => {
    const querySnapshot = await db.collection("users").where("user_uid", "==", uid).get();
    querySnapshot.docs.forEach(doc => {
        updateUsersViaDocID(doc.id, dataToUpdate)
    })
}

const updateUsersViaDocID = async (docID:string, dataToUpdate:any) => {
    await db.collection("users").doc(docID).update({
        ...dataToUpdate
    })
}

export default async function updateUserByUID(req: any, res: any) {
    
    const { method, body, query } = req;
    try {
        switch(method){
            case 'GET':
                const { uid:userUID } = query; let docID;
                const getQuerySnapshot = await db.collection("users").where("user_uid", "==", userUID).get();
                const data = getQuerySnapshot.docs.map(doc => {
                    docID = doc.id;
                    return doc.data()
                });
                if(docID && data[0]){
                    res.status(200).json({ message: 'Success', response: { id: docID, data: data[0] }, status: 200 });
                }else{
                    res.status(200).json({ message: 'Success', response: {}, status: 404 });
                }
                break;
            case 'POST':
                const requestBody = JSON.parse(body);
                switch (requestBody?.action) {
                    case 'add':
                        const { user } = requestBody;
                        const docRef = await db.collection('users').add({...user});
                        res.status(200).json({ message: 'Success', response: { id: docRef.id }, status: 200 });
                        break;
                    case 'update_via_uid':
                       
                        const { uid, fieldsToUpdate } = requestBody;
                        updateUsersViaUID(uid, fieldsToUpdate);
                        res.status(200).json({ message: 'Success', status: 200 });
                        break;
                    case 'update_via_docID':
                        
                        const { docID, fieldsToUpdate:dataToUpdate } = requestBody;
                        updateUsersViaDocID(docID, dataToUpdate);
                        res.status(200).json({ message: 'Success', status: 200 });
                        break;
                    default:
                        break;
                }
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).json({ message: `${method} Method Not Allowed`, response: [], status: 405 });
                break;
        }
    } catch (error) {
        res.status(500).json({ message: "Failed", response: null });        
    }
}