import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyC4_ys90_63jAJocjzkAAIC7fY1JV6jOFA",
    authDomain: "online-shop-b5f30.firebaseapp.com",
    databaseURL: "https://online-shop-b5f30.firebaseio.com",
    projectId: "online-shop-b5f30",
    storageBucket: "online-shop-b5f30.appspot.com",
    messagingSenderId: "38971018598",
    appId: "1:38971018598:web:dff66b8a1ff2812115cca7",
    measurementId: "G-ERM0W5K8ZZ"
};


firebase.initializeApp(firebaseConfig);


//for OAuth :

export const auth = firebase.auth();

//For Google auth: 
export const googleProvider = new firebase.auth.GoogleAuthProvider();

//to get sign in popup when using the provider:
googleProvider.setCustomParameters({ prompt: 'select_account' });


//Getting the current userAuth:
export const getCurrentUser = () => {
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        })
    })
}


//for creating users in firestore db :
export const firestore = firebase.firestore();
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const userSnapshot = await userRef.get();   //returns a document snapshot of the selected user.     
    // console.log('userRef', userRef);
    // console.log('userSnap', userSnapshot);

    if (!userSnapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            })
        }
        catch (error) {
            console.log('Error Creating user profile', error)
        }
    }

    return userRef;
}


export const updateUserCart = async (updatedCart) => {
    try {
        const user = await getCurrentUser();
        const userRef = await firestore.doc(`users/${user.uid}`);
        await userRef.update({ cartItems: updatedCart })
    } catch (error) {
        return (error);
    }
}

//Adding out Items/Collections to firestore: 
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

    //https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#doc
    const collectionRef = firestore.collection(collectionKey);

    //to batch our requests
    const batch = firestore.batch();

    //adding requests to a batched write
    //https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes
    objectsToAdd.forEach(object => {
        const newDocRef = collectionRef.doc();
        console.log(newDocRef)
        batch.set(newDocRef, object);
    });

    //commiting the batch
    return await batch.commit();
}

//Grabbing shop-data from Firestore;
export const convertCollectionsSnapshotToMap = (collectionsSnapshot) => {
    //transformedCollections is an array of Collection Objects;
    const transformedCollections = collectionsSnapshot.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })

    //we convert our array to an object using reduce, then return that object;
    return transformedCollections.reduce((acc, collection) => {
        acc[collection.title.toLowerCase()] = collection;
        return acc;
    }, {});
}