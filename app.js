//
const app = document.getElementById("app");
const form = document.querySelector("form");
let meals = [];

// FETCH
const fetchMeals = async (search) => {
  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((res) => {
      meals = res.meals;
    });
};

//DISPLAY
const displayMeals = () => {
  if (meals !== null) {
    app.innerHTML = meals
      .slice(0, 24)
      .map((meal) => {
        let ingredients = [];
        for (let i = 0; i < 21; i++) {
          if (meal[`strIngredient${i}`]) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];
            ingredients.push(`<div> ${ingredient} -  ${measure}</div>`);
          }
        }

        return `<div class="meal-card">
                 <h2> ${meal.strMeal} </h2>
                 <p> Origin: ${meal.strArea} </p>
                 <img src=${meal.strMealThumb} alt=${meal.strMeal} />
                 <p>${ingredients.join("")} </p>
                
               </div>
     `;
      })
      .join("");
  } else {
    app.innerHTML = "<h3> Cet aliment n'existe pas ! </h3>";
  }
};

// FORM
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // INPUT
  const input = document.getElementById("search").value;
  if (!input) {
    app.innerHTML += "<h3> Aucun résultat ! </h3>";
  } else {
    fetchMeals(input).then(() => displayMeals());
  }
});
