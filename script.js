document.getElementById('search').addEventListener('click', function() {
    let ingredients = document.getElementById('ingredients').value;
    if (ingredients.trim() === '') {
        alert('Please enter some ingredients.');
        return;
    }
    fetchRecipes(ingredients);
});

function fetchRecipes(ingredients) {
    let recipesDiv = document.getElementById('recipes');
    recipesDiv.innerHTML = '<p>Loading recipes...</p>';

    // Replace with your actual API key
    let apiKey = 'a0ad6b625ab74c489fb919ae6c6c9dce';
    let apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=5&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            recipesDiv.innerHTML = '';
            if (data.length === 0) {
                recipesDiv.innerHTML = '<p>No recipes found.</p>';
                return;
            }
            data.forEach(recipe => {
                fetchRecipeDetails(recipe.id, recipesDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
            recipesDiv.innerHTML = '<p>Error fetching recipes. Please try again later.</p>';
        });
}

function fetchRecipeDetails(recipeId, recipesDiv) {
    // Replace with your actual API key
    let apiKey = 'a0ad6b625ab74c489fb919ae6c6c9dce';
    let apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(recipe => {
            let recipeDiv = document.createElement('div');
            recipeDiv.className = 'recipe';
            let recipeContent = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <a href="${recipe.sourceUrl}" target="_blank" class="view-recipe-button">View Recipe</a>
            `;
            recipeDiv.innerHTML = recipeContent;
            recipesDiv.appendChild(recipeDiv);
        })
        .catch(error => {
            console.error('Error fetching recipe details:', error);
        });
}
