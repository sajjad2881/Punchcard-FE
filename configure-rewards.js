// Function to create a new tier element
function createTierElement() {
    const tierElement = document.createElement('div');
    tierElement.className = 'tier-element';
  
    const rewardInput = document.createElement('input');
    rewardInput.type = 'text';
    rewardInput.placeholder = 'Tier reward';
    rewardInput.required = true;
  
    const pointsInput = document.createElement('input');
    pointsInput.type = 'number';
    pointsInput.min = '1';
    pointsInput.step = '1';
    pointsInput.value = '100';
    pointsInput.required = true;
  
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remove tier';
    removeBtn.addEventListener('click', () => {
      tierElement.remove();
    });
  
    tierElement.appendChild(rewardInput);
    tierElement.appendChild(pointsInput);
    tierElement.appendChild(removeBtn);
  
    return tierElement;
  }
  
  // Add initial tier
  document.getElementById('tiers-container').appendChild(createTierElement());
  
  // Add new tier button click event
  document.getElementById('add-tier-btn').addEventListener('click', () => {
    document.getElementById('tiers-container').appendChild(createTierElement());
  });
  
  // Form submit event
  document.getElementById('rewards-form').addEventListener('submit', (event) => {
    event.preventDefault();
  
    const rewardTiers = [];
    const tiers = document.getElementsByClassName('tier-element');
    for (const tier of tiers) {
      const reward = tier.children[0].value;
      const points = tier.children[1].value;
      rewardTiers.push(`{'tierPoints': ${points}, 'tierReward': '${reward}'}`);
    }
  
    const restaurantID = localStorage.getItem('restaurantID');
    const payload = {
      restaurantID: restaurantID,
      rewardTiers: rewardTiers
    };
  
    // Use the API Gateway SDK to make the API POST request to /programs
    const apiGatewayUrl = '/programs';

    var apigClient = apigClientFactory.newClient();

    apigClient.programsPost({}, payload, {})
      .then((response) => {
        // Display success message and show the reward program
        document.getElementById('result-message').textContent = 'Reward program successfully configured.';
        document.getElementById('rewards-form').style.display = 'none';
        const rewardProgramDisplay = document.getElementById('reward-program-display');
        rewardProgramDisplay.style.display = 'block';
        rewardProgramDisplay.innerHTML = '<h2>Reward Program</h2>';
        for (const tier of rewardTiers) {
          const tierElement = document.createElement('div');
          tierElement.textContent = tier;
          rewardProgramDisplay.appendChild(tierElement);
        }
      })
      .catch((error) => {
        // Display error message
        document.getElementById('result-message').textContent = 'Error: ' + error.message;
      });
  });
  
  // Note: The code assumes that the API endpoint '/programs' is set up to accept POST requests with the specified payload format.
  // The code also assumes that the server will respond with a JSON object containing relevant information.
  // The CSS file 'configure-rewards.css' is not provided, but you can create and customize it according to your design preferences.
  