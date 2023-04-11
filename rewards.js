document.addEventListener('DOMContentLoaded', function () {
    const userName = localStorage.getItem('userName');
    const userBirthdate = localStorage.getItem('userBirthdate');
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      window.location.href = 'index.html';
    } else {
      document.getElementById('user-email').textContent = userEmail;
      // Display the user's name and birthdate:
      const userInfo = document.createElement('p');
      userInfo.textContent = `Name: ${userName}, Birthdate: ${userBirthdate}`;
      document.body.appendChild(userInfo);
    }
  });
  