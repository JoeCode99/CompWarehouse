    
    //Initialise Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyC4UZh7En4OQdXSB_4ttY7foqlY6m-n6pM",
        authDomain: "ses1database.firebaseapp.com",
        databaseURL: "https://ses1database.firebaseio.com",
        projectId: "ses1database",
        storageBucket: "ses1database.appspot.com",
        messagingSenderId: "685925628486",
        appId: "1:685925628486:web:a275e836fa2cc0c4"
      };
      firebase.initializeApp(firebaseConfig);

      // TEST
      // Get elements
      const preObject = document.getElementById('product');

      // Create references
      const dbRefObject = firebase.database().ref().child('product');

      // Sync object changes
      dbRefObject.on('value', snap => {
        preObject.innerText = JSON.stringify(snap.val(), null, 3);
      });
    