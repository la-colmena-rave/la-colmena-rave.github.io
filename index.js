




var _0x1edd=["\x41\x49\x7A\x61\x53\x79\x43\x69\x41\x4E\x74\x55\x4F\x35\x6E\x42\x68\x56\x4A\x74\x38\x34\x31\x78\x31\x33\x6A\x63\x5F\x76\x70\x47\x72\x58\x56\x6C\x4D\x64\x73","\x63\x6F\x6C\x6D\x65\x6E\x61\x2D\x63\x65\x35\x33\x32\x2E\x66\x69\x72\x65\x62\x61\x73\x65\x61\x70\x70\x2E\x63\x6F\x6D","\x63\x6F\x6C\x6D\x65\x6E\x61\x2D\x63\x65\x35\x33\x32","\x63\x6F\x6C\x6D\x65\x6E\x61\x2D\x63\x65\x35\x33\x32\x2E\x61\x70\x70\x73\x70\x6F\x74\x2E\x63\x6F\x6D","\x37\x37\x34\x30\x30\x30\x35\x36\x39\x37\x35\x30","\x31\x3A\x37\x37\x34\x30\x30\x30\x35\x36\x39\x37\x35\x30\x3A\x77\x65\x62\x3A\x36\x31\x37\x62\x63\x38\x64\x32\x64\x61\x37\x39\x36\x36\x32\x34\x64\x30\x63\x31\x62\x37"];var firebaseConfig={apiKey:_0x1edd[0],authDomain:_0x1edd[1],projectId:_0x1edd[2],storageBucket:_0x1edd[3],messagingSenderId:_0x1edd[4],appId:_0x1edd[5]}
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to form elements
var registrationForm = document.getElementById("registration-form");
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var photoInput = document.getElementById("photo");

// Register user on form submission
registrationForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var name = nameInput.value;
  var email = emailInput.value;
  var password = passwordInput.value;
  var photo = photoInput.files[0];

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      // Upload user's photo to Firebase Storage
      var user = userCredential.user;
      var storageRef = firebase.storage().ref('users/' + user.uid + '/photo/' + photo.name);
      var uploadTask = storageRef.put(photo);

      // Handle successful user registration
      registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();
      
        var name = nameInput.value;
        var email = emailInput.value;
        var password = passwordInput.value;
        var photo = photoInput.files[0];
      
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(function(userCredential) {
            var user = userCredential.user;
      
            var storageRef = firebase.storage().ref('users/' + user.uid + '/photo/' + photo.name);
            var uploadTask = storageRef.put(photo);
      
            uploadTask.on('state_changed', null, null, function() {
              uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                user.updateProfile({
                  displayName: name,
                  photoURL: downloadURL
                }).then(function() {
                  // Success function called after all tasks are complete
                  alert("Registro exitoso");
                  window.location.href = "./success.html";
                });
              });
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      });
} )} )        




  