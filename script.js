let item = document.getElementById("item");
let searchBtn = document.getElementById("search-btn");
let itemref = document.getElementById("search-input");

// Function to fetch details
let getitem = () => {
    let itemvalue = itemref.value;
    if (itemvalue.length === 0) {
        item.innerHTML = `<h3 class="msg">Please enter an item..</h3>`;
    } else {
        let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${itemvalue}`;
        itemref.value = ""; // Clear input field after submission
        fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            if (data.meals) {
                let meal = data.meals[0]; // First meal in response
                let mainIngredients = [
                    meal.strIngredient1,
                    meal.strIngredient2,
                    meal.strIngredient3,
                    meal.strIngredient4,
                    meal.strIngredient5,
                    meal.strIngredient6,
                    meal.strIngredient7,
                    meal.strIngredient8,
                    meal.strIngredient9,
                    meal.strIngredient10,
                    meal.strIngredient11
                     // Mozzarella as a key ingredient
                ].filter(ingredient => ingredient && ingredient.trim() !== "").slice(0, 11); // Pick top 4 non-empty

                // Display item name and image with a "Get Item" button
                item.innerHTML = `
                   <div class="result-container">
                   <div class="image">
                   <img src="${meal.strMealThumb}" alt="${meal.strMeal}"  />
                    </div>
                   <div class="item-details">
                    <h2>${meal.strMeal}</h2>
                    <p>Cuisine: ${meal.strArea} Style</p>
                   <p class="meal-ingredients" style="font-size: 16px;"><strong>Ingredients:</strong> ${mainIngredients.join(', ')}</p>
                    <button class="get-item-btn">Get Item</button>
                    </div>
                    </div>
                `;

                // Adding event listener for "Get Item" button
                document.querySelector(".get-item-btn").addEventListener("click", () => {
                    alert(`Item: ${meal.strMeal}`);
                });
            } else {
                item.innerHTML = `<h3 class="msg">Item not found</h3>`;
            }
        })
        .catch(() => {
            item.innerHTML = `<h3 class="msg">Item not found</h3>`;
        });
    }
};

// Event listeners
searchBtn.addEventListener("click", getitem);
window.addEventListener("load", getitem);
