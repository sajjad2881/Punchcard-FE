//const poolData = {
//    UserPoolId: 'us-east-1_ViBGmruWb',
//    ClientId: '5v1l1dgami6h8qufckv96p5vrj',
 // };
//const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  
const poolDataCustomer = {
    UserPoolId: 'us-east-1_ViBGmruWb',
    ClientId: '5v1l1dgami6h8qufckv96p5vrj',
  };
  
  const poolDataBusiness = {
    UserPoolId: 'us-east-1_rGBGZ0es7',
    ClientId: '2f6lm7fh4lfertij7i9pu0f2ro',
  };
  
  const userPoolCustomer = new AmazonCognitoIdentity.CognitoUserPool(poolDataCustomer);
  const userPoolBusiness = new AmazonCognitoIdentity.CognitoUserPool(poolDataBusiness);
  

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
      
              window.location.href = 'rewards.html';
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
  
    const attributeList = [
      new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'name', Value: name }),
      new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'address', Value: address }),
      new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: email }),
      new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'phone_number', Value: phone_number }),
      new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'website', Value: website }),
      new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'custom:adminName', Value: adminName }),
    ];
    console.log(attributeList)
  
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
    
          window.location.href = 'business-dashboard.html';
        });
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      },
    });
  }

  function signOut() {
    const userData = {
      Username: localStorage.getItem('userEmail'),
      Pool: userPoolBusiness,
    };
  
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.signOut();
    localStorage.clear();
    window.location.href = 'index.html';
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
  
  
  