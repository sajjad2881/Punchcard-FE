//const poolData = {
//    UserPoolId: 'us-east-1_ViBGmruWb',
//    ClientId: '5v1l1dgami6h8qufckv96p5vrj',
 // };
//const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var apigClient = apigClientFactory.newClient();
  
const poolDataCustomer = {
    UserPoolId: 'us-east-1_ViBGmruWb',
    ClientId: '5v1l1dgami6h8qufckv96p5vrj',
  };
  
  const poolDataBusiness = {
    UserPoolId: 'us-east-1_ztoLLvLv4',
    ClientId: '3umbif497oieqmdl493cv9tr6g',
  };
  
  const userPoolCustomer = new AmazonCognitoIdentity.CognitoUserPool(poolDataCustomer);
  const userPoolBusiness = new AmazonCognitoIdentity.CognitoUserPool(poolDataBusiness);
  console.log("user business", userPoolBusiness);
  

  function signUp() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const name = document.getElementById('signup-name').value;
    const birthdate = document.getElementById('signup-birthdate').value;
  
    const dataName = {
      Name: 'name',
      Value: name,
    };
    const dataBirthdate = {
      Name: 'birthdate',
      Value: birthdate,
    };
    const attributeList = [
      new AmazonCognitoIdentity.CognitoUserAttribute(dataName),
      new AmazonCognitoIdentity.CognitoUserAttribute(dataBirthdate),
    ];
  
    userPoolCustomer.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        localStorage.setItem('signupUsername', username); // Store the username
        alert('User registered successfully. Please check your email for the verification code.');
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('verification-form').style.display = 'block';
      });
    }

    function signIn() {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
      
        const authenticationData = {
          Username: username,
          Password: password,
        };
      
        const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
      
        const userData = {
          Username: username,
          Pool: userPoolCustomer,
        };
      
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (result) => {
            // Access the ID token
            const idToken = result.getIdToken().getJwtToken();
            // Store the ID token in local storage
            localStorage.setItem('idToken', idToken);
            
            cognitoUser.getUserAttributes((err, attributes) => {
              if (err) {
                alert(err.message || JSON.stringify(err));
                return;
              }
              const name = attributes.find(attr => attr.Name === 'name').Value;
              const birthdate = attributes.find(attr => attr.Name === 'birthdate').Value;
      
              localStorage.setItem('userName', name);
              localStorage.setItem('userBirthdate', birthdate);
              localStorage.setItem('userEmail', username);
      
              window.location.href = '/static/customer-dashboard.html';
            });
          },
          onFailure: (err) => {
            alert(err.message || JSON.stringify(err));
          },
        });
      }
      
  function verify() {
    const storedUsername = localStorage.getItem('signupUsername');
    if (!storedUsername) {
      alert('No username found. Please sign up first.');
      return;
    }
  
    const verificationCode = document.getElementById('verification-code').value;
  
    const userData = {
      Username: storedUsername,
      Pool: userPoolCustomer,
    };
  
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);  
  
    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      alert('Email verified successfully. You can now log in.');
      document.getElementById('verification-form').style.display = 'none';
      document.getElementById('login-form').style.display = 'block';
    });
  }
  
  function showCustomer() {
    document.getElementById('selection-form').style.display = 'none';
    document.getElementById('customer-form').style.display = 'block';
  }
  
  function showBusiness() {
    document.getElementById('selection-form').style.display = 'none';
    document.getElementById('business-form').style.display = 'block';
  }


  function signUpBusiness() {
    const username = document.getElementById('business-signup-username').value;
    const password = document.getElementById('business-signup-password').value;
    const name = document.getElementById('business-signup-name').value;
    const address = document.getElementById('business-signup-address').value;
    const email = document.getElementById('business-signup-email').value;
    const phone_number = document.getElementById('business-signup-phone').value;
    const website = document.getElementById('business-signup-website').value;
    const adminName = document.getElementById('business-signup-adminName').value;
    const cuisines = document.getElementById('business-signup-cuisines').value;
    const descriptionText = document.getElementById('business-signup-descriptionText').value;
    const descriptors = document.getElementById('business-signup-descriptors').value;
    const locationTags = document.getElementById('business-signup-locationTags').value;
    const pictureInput = document.getElementById('business-signup-picture');
    const apiGatewayUrl = 'https://sbfye9qq29.execute-api.us-east-1.amazonaws.com/beta/image'; // Replace with your API Gateway URL
  
    // Convert the image file to FormData and upload it to the API Gateway
    const formData = new FormData();
    formData.append('image', pictureInput.files[0]);
    formData.append('username', username);
  
    axios.post(apiGatewayUrl, formData)
      .then(response => {
        const image_url = response.data.image_url; // Get the image URL from the response
  
        // Update the attributeList to include the image URL and other attributes
        const attributeList = [
          new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'name', Value: name }),
          new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'address', Value: address }),
          new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: email }),
          new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'phone_number', Value: phone_number }),
          new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'website', Value: website }),
          new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'custom:adminName', Value: adminName }),
          new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'custom:cuisines', Value: cuisines }),
          new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'custom:descriptionText', Value: descriptionText }),
          new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'custom:descriptors', Value: descriptors }),
          new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'custom:locationTags', Value: locationTags }),
          new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'picture', Value: image_url }),
        ];
  
        // Continue with the sign-up process
        userPoolBusiness.signUp(username, password, attributeList, null, (err, result) => {
          if (err) {
            alert(err.message || JSON.stringify(err));
            return;
          }
          localStorage.setItem('businessSignupUsername', username); // Store the username
          alert('Business registered successfully. Please check your email for the verification code.');
          document.getElementById('business-login-form').style.display = 'none';
          document.getElementById('business-signup-form').style.display = 'none';
          document.getElementById('business-verification-form').style.display = 'block';
        });
      })
      .catch(error => {
        alert(error.message || JSON.stringify(error));
});
  }
  

  function signInBusiness() {
    const username = document.getElementById('business-login-username').value;
    const password = document.getElementById('business-login-password').value;
  
    const authenticationData = {
      Username: username,
      Password: password,
    };
  
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
  
    const userData = {
      Username: username,
      Pool: userPoolBusiness,
    };
  
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        // Access the ID token
        const idToken = result.getIdToken().getJwtToken();
        // Store the ID token in local storage
        localStorage.setItem('idToken', idToken);
  
        cognitoUser.getUserAttributes((err, attributes) => {
          if (err) {
            alert(err.message || JSON.stringify(err));
            return;
          }
          
          localStorage.setItem('adminName', attributes.find(attr => attr.Name === 'custom:adminName').Value);
          localStorage.setItem('userEmail', attributes.find(attr => attr.Name === 'email').Value);
          localStorage.setItem('address', attributes.find(attr => attr.Name === 'address').Value);
          localStorage.setItem('name', attributes.find(attr => attr.Name === 'name').Value);
          localStorage.setItem('phoneNumber', attributes.find(attr => attr.Name === 'phone_number').Value);
          localStorage.setItem('website', attributes.find(attr => attr.Name === 'website').Value);
          localStorage.setItem('cuisines', attributes.find(attr => attr.Name === 'custom:cuisines').Value);
          localStorage.setItem('descriptionText', attributes.find(attr => attr.Name === 'custom:descriptionText').Value);
          localStorage.setItem('descriptors', attributes.find(attr => attr.Name === 'custom:descriptors').Value);
          localStorage.setItem('locationTags', attributes.find(attr => attr.Name === 'custom:locationTags').Value);
          localStorage.setItem('picture', attributes.find(attr => attr.Name === 'picture').Value); // Added 'picture' attribute
          localStorage.setItem('profileImageUrl', attributes.find(attr => attr.Name === 'picture').Value);

          window.location.href = '/static/business-dashboard.html';
        });
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      },
    });
  }
  
  
  
  
  /*function signInBusiness() {
    const username = document.getElementById('business-login-username').value;
    const password = document.getElementById('business-login-password').value;
  
    const authenticationData = {
      Username: username,
      Password: password,
    };
  
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
  
    const userData = {
      Username: username,
      Pool: userPoolBusiness,
    };
  
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        // Access the ID token
        const idToken = result.getIdToken().getJwtToken();
        // Store the ID token in local storage
        localStorage.setItem('idToken', idToken);

        console.log("idToken")
        console.log(idToken)
  
        cognitoUser.getUserAttributes((err, attributes) => {
          if (err) {
            alert(err.message || JSON.stringify(err));
            return;
          }
          
          localStorage.setItem('adminName', attributes.find(attr => attr.Name === 'custom:adminName').Value);
          localStorage.setItem('userEmail', attributes.find(attr => attr.Name === 'email').Value);
          localStorage.setItem('address', attributes.find(attr => attr.Name === 'address').Value);
          localStorage.setItem('name', attributes.find(attr => attr.Name === 'name').Value);
          localStorage.setItem('phoneNumber', attributes.find(attr => attr.Name === 'phone_number').Value);
          localStorage.setItem('website', attributes.find(attr => attr.Name === 'website').Value);
    
          window.location.href = '/static/business-dashboard.html';
        });
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      },
    });
  } */

  function signOut() {
    const userData = {
      Username: localStorage.getItem('userEmail'),
      Pool: userPoolBusiness,
    };
  
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.signOut();
    localStorage.clear();
    window.location.href = '/static/index.html';
  }
  
  
  function verifyBusiness() {
    const storedUsername = localStorage.getItem('businessSignupUsername');
    if (!storedUsername) {
      alert('No username found. Please sign up first.');
      return;
    }
  
    const verificationCode = document.getElementById('business-verification-code').value;
  
    const userData = {
      Username: storedUsername,
      Pool: userPoolBusiness,
    };
  
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  
    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      alert('Email verified successfully. You can now log in.');
      document.getElementById('business-verification-form').style.display = 'none';
      document.getElementById('business-login-form').style.display = 'block';
    });
  }

  
  
  
