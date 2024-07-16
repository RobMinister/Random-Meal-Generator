// Get references to DOM elements
const getMealBtn = document.getElementById('get_meal');
const mealContainer = document.getElementById('meal');

// Event listener for the "Get Meal" button click
getMealBtn.addEventListener('click', () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
      createMeal(data.meals[0]);
    })
    .catch(error => {
      console.error('Error fetching meal:', error);
    });
});

// Function to create and display meal details
const createMeal = (meal) => {
  if (!meal) {
    mealContainer.innerHTML = '<p>Meal not found. Please try again.</p>';
    return;
  }

  const ingredients = [];
  // Collect up to 20 ingredients and measures
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }

  // Construct HTML content for displaying meal details
  const newInnerHTML = `
    <div class="row">
      <div class="columns five">
        <img src="${meal.strMealThumb}" alt="Meal Image">
        ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
        ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
        <h5>Ingredients:</h5>
        <ul>${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
      </div>
      <div class="columns seven">
        <h4>${meal.strMeal}</h4>
        <p>${meal.strInstructions}</p>
      </div>
    </div>
    ${meal.strYoutube ? `
    <div class="row">
      <h5>Video Recipe</h5>
      <div class="videoWrapper">
        <iframe width="420" height="315"
        src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}" frameborder="0" allowfullscreen>
        </iframe>
      </div>
    </div>` : ''}
  `;

  // Update the meal container with the new HTML content
  mealContainer.innerHTML = newInnerHTML;
};

// Example of handling a floating button and social panel
const floatingBtn = document.querySelector('.floating-btn');
const socialPanelContainer = document.querySelector('.social-panel-container');
const closeBtn = socialPanelContainer.querySelector('.close-btn');

floatingBtn.addEventListener('click', () => {
  socialPanelContainer.classList.toggle('visible');
});

closeBtn.addEventListener('click', () => {
  socialPanelContainer.classList.remove('visible');
});