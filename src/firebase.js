import { useState, useEffect } from "react";
import { generateMomentId } from "./assets/js/utils";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const coupleObj = {
  User1: {
    email: "faiz@gmail.com",
    name: "faiz"
  }
};
const coupleObj2 = {
  User2: {
    email: "ndud@gmail.com",
    name: "ndud"
  }
};

const momentObj = {
  author: 1,
  body: "tessss",
  title: "first one",
  date: "10 January 2012"
};

export const createUser = ({ id, data }) => {
  firebase
    .firestore()
    .collection("couple")
    .doc(id)
    .set(data, { merge: true })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
};

export const createMoment = ({ id, data, images }, callback) => {
  const momentId = generateMomentId(id);

  function doExecute() {
    firebase
      .firestore()
      .collection("couple")
      .doc(id)
      .collection("moment")
      .doc(momentId)
      .set({
        ...data,

        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function() {
        callback({ success: true });
      })
      .catch(function(error) {
        callback({ success: false, error });
      });
  }

  if (images.length !== 0) {
    uploadImg({ id, momentId, images }, res => {
      const { finish } = res;
      if (finish) {
        console.log("is upload images finish:", finish);
        doExecute();
      }
    });
  } else {
    console.log("upload without images");
    doExecute();
  }
};

export const uploadImg = ({ id, momentId, images }, callback) => {
  images.forEach((data, index) => {
    //create storage ref
    const ref = firebase
      .storage()
      .ref(`momentsPhoto/${id}/${momentId}/${data.name}`);
    //upload file
    const handleProgress = ref.put(data);
    console.log("uploading image no:", index);
    if (index === images.length - 1) {
      console.log("monitoring last image upload");
      handleProgress.on(
        "state_changed",
        function(snapshot) {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        function(error) {
          // Handle unsuccessful uploads
          console.log(error);
        },
        function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          callback({ finish: true });
        }
      );
    }
  });
};

//todo: handle images newly posted moment, it should automatically shown. as per now, it loads to finish uploading first

export function getImagesByMoment(
  { coupleId, momentId = "WJuHJGTg1dzerU1jkzew" },
  callback
) {
  const storageRef = firebase
    .storage()
    .ref("momentsPhoto")
    .child(`${coupleId}/${momentId}`);

  storageRef
    .listAll()
    .then(function(res) {
      // res.prefixes.forEach(function(folderRef) {
      //   console.log("prefixes", folderRef);
      // });
      // res.items[0].getDownloadURL(function(url) {
      //   callback(url);
      // });
      res.items.forEach(function(itemRef) {
        itemRef.getDownloadURL().then(url => callback(url));
      });
      console.log(
        "searching images for " + momentId + " and ",
        res.items.length,
        " found"
      );
    })
    .catch(err => console.log(err));
}

export const getMoment = (id, cb = () => {}) => {
  firebase
    .firestore()
    .collection("couple")
    .doc(id)
    .collection("moment")
    //    .onSnapshot(data => cb(data));
    .get()
    .then(function(querySnapshot) {
      const moments = [];
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        moments.push({ ...doc.data(), id: doc.id });
      });
      cb(moments);
    })
    .catch(e => console.log(e));
};

//custom hooks for collecting moments from firebase
export function useMoments(id) {
  const [moments, setMoment] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("couple")
      .doc(id)
      .collection("moment")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        const newMoments = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMoment(newMoments);
      });
    return () => {
      unsubscribe();
      console.log("unsubscribe");
    };
  }, []);

  return moments;
}

//testing create user
//createUser({ id: "1111", data: coupleObj });
//createMoment({ id: "1111", data: momentObj });

export const signInGoogle = cb => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      const email = result.user.email;
      const name = result.user.displayName;
      console.log(result);
      isUserExist({ email, name }, res => {
        const { exist, id, coupleInfo } = res;
        console.log(res);
        if (exist) {
          cb({ success: true, exist, authUser: result, coupleInfo, id });
        } else cb({ success: false, exist, authUser: result });
      });
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const signupEmailPassword = (data, cb) => {
  const { email, password } = data;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => cb(res))
    .catch(function(error) {
      cb(error);
    });
};

export const getAuthState = cb => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    } else {
    }
    cb(user);
  });
};

export const signOut = (cb = () => {}) => {
  firebase
    .auth()
    .signOut()
    .then(function(res) {
      cb(res);
    })
    .catch(function(error) {
      cb(error);
    });
};

export const getCurrentUser = cb => {
  var user = firebase.auth().currentUser;
  cb(user);
};

var citiesRef = firebase.firestore().collection("cities");
// citiesRef.doc("SF").set({
//   name: "San Francisco",
//   state: "CA",
//   country: "USA",
//   capital: false,
//   population: 860000,
//   regions: ["west_coast", "norcal"]
// });
// citiesRef.doc("LA").set({
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA",
//   capital: false,
//   population: 3900000,
//   regions: ["west_coast", "socal"]
// });
// citiesRef.doc("DC").set({
//   name: "Washington, D.C.",
//   state: null,
//   country: "USA",
//   capital: true,
//   population: 680000,
//   regions: ["east_coast"]
// });
// citiesRef.doc("TOK").set({
//   name: "Tokyo",
//   state: null,
//   country: "Japan",
//   capital: true,
//   population: 9000000,
//   regions: ["kanto", "honshu"]
// });
// citiesRef.doc("BJ").set({
//   name: "Beijing",
//   state: null,
//   country: "China",
//   capital: true,
//   population: 21500000,
//   regions: ["jingjinji", "hebei"]
// });

// var docRef = firebase
//   .firestore()
//   .collection("cities")
//   .doc("SF");

// docRef
//   .get()
//   .then(function(doc) {
//     if (doc.exists) {
//       console.log("Document data:", doc.data());
//     } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//     }
//   })
//   .catch(function(error) {
//     console.log("Error getting document:", error);
//   });

// firebase
//   .firestore()
//   .collection("couple")
//   .get()
//   .then(querySnapshot => {
//     querySnapshot.forEach(doc => {
//       console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
//     });
//   });

export const getAuthCouple = (email, cb) => {
  firebase
    .firestore()
    .collection("couple")
    .where("email1", "==", email)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        //get document id
        cb({ id: doc.id, exist: doc.exists, data: doc.data() });
      });
    })
    .catch(e => console.log(e));
};

//check if user has properly signedup
export const isUserExist = ({ email, name }, cb) => {
  const refCouple = firebase.firestore().collection("couple");
  refCouple
    .where("coupleInfo", "array-contains", { email, name })
    .get()
    .then(querySnapshot => {
      const exist = !querySnapshot.empty;

      if (exist) {
        const { coupleInfo } = querySnapshot.docs[0].data();
        const id = querySnapshot.docs[0].id;
        cb({ exist, id, coupleInfo });
      } else {
        cb({ exist });
      }
      // if (!querySnapshot.empty) {
      //   console.log("user1", querySnapshot.empty);
      // }
      // if (!querySnapshot.empty) {
      //   querySnapshot.forEach(function(doc) {
      //     cb(doc.exists);
      //   });
      // }
    });
};

//testing
// isUserExist({ email: "faiz@checknow.org", name: "Faiz" }, res =>
//   console.log(res)
// );

//todo: create fucntion to check if the user is alone
export const getCoupleStatus = ({ email, name }, cb) => {
  firebase
    .firestore()
    .collection("couple")
    .where("coupleInfo", "array-contains", { email, name })
    .get()
    .then(querySnapshot => {});
};

//function to check if the inv code valid, can also to check if the current user is having partner or not
export const isInvCodeValid = (code, cb) => {
  let response = false;
  firebase
    .firestore()
    .collection("couple")
    .doc(code)
    .get()
    .then(querySnapshot => {
      const res = querySnapshot.data();

      if (res !== undefined) {
        cb({
          valid: res.coupleInfo.length === 1,
          onlyEmail: res.coupleInfo[0].email,
          onlyName: res.coupleInfo[0].name
        });
      } else cb({ valid: false });
    });
};

//testing
//isInvCodeValid("111a", res => console.log(res));

//todo: create function to merge exisiting user email in couple collection
export const mergeCouple = ({ code, email, name }, cb) => {
  firebase
    .firestore()
    .collection("couple")
    .doc(code)
    .update({
      coupleInfo: firebase.firestore.FieldValue.arrayUnion({ email, name })
    })
    .then(function() {
      cb({ success: true });
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
};

//testing
// mergeCouple({ code: "1112", email: "faw@gmail.com", name: "Faw" }, res =>
//   console.log(res)
// );

//todo: create function to merge userDB and userAuth on login
