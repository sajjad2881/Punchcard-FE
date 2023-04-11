const poolData = {
    UserPoolId: 'us-east-1_ViBGmruWb',
    ClientId: '5v1l1dgami6h8qufckv96p5vrj',
  };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  
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
  
    userPool.signUp(username, password, attributeList, null, (err, result) => {
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
  
  
  /*
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
      Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        localStorage.setItem('userEmail', username);
        window.location.href = 'rewards.html';
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      },
    });
    */
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
          Pool: userPool,
        };
      
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (result) => {
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
      
/*
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
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
  
    */

  function verify() {
    const storedUsername = localStorage.getItem('signupUsername');
    if (!storedUsername) {
      alert('No username found. Please sign up first.');
      return;
    }
  
    const verificationCode = document.getElementById('verification-code').value;
  
    const userData = {
      Username: storedUsername,
      Pool: userPool,
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
  
  