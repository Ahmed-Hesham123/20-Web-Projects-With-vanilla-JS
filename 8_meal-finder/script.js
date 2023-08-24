const search=document.getElementById("search"),submit=document.getElementById("submit"),random=document.getElementById("random"),mealsEl=document.getElementById("meals"),resultHeading=document.getElementById("result-heading"),singleMealEL=document.getElementById("single-meal");async function searchMeal(e){e.preventDefault(),singleMealEL.innerHTML="";let a=search.value;if(a.trim()){let t=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${a}`),l=await t.json();resultHeading.innerHTML=`<h2>Search results for '${a}':</h2>`,null===l.meals?resultHeading.innerHTML="<p>There is no search results. Try again</p>":mealsEl.innerHTML=l.meals.map(e=>`<div class="meal">
        <img src="${e.strMealThumb}" alt="${e.strMeal}" />
        <div class="meal-info" data-mealID="${e.idMeal}">
        <h3>${e.strMeal}</h3>
        </div>
      </div>`).join(""),search.value=""}else alert("Please enter a search term")}function getMealById(e){fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e}`).then(e=>e.json()).then(e=>{let a=e.meals[0];addMealToDOM(a)})}async function getRandomMeal(){mealsEl.innerHTML="",resultHeading.innerHTML="";let e=await fetch("https://www.themealdb.com/api/json/v1/1/random.php"),a=await e.json(),t=a.meals[0];addMealToDOM(t)}function addMealToDOM(e){let a=[];for(let t=1;t<=20;t++)if(e[`strIngredient${t}`])a.push(`${e[`strIngredient${t}`]} - ${e[`strMeasure${t}`]}`);else break;singleMealEL.innerHTML=`<div class="single-meal">
    <h1>${e.strMeal}</h1>
    <img src="${e.strMealThumb}" alt="${e.strMeal}" />
    <div class="single-meal-info">
      ${e.strCategory?`<p>${e.strCategory}</p>`:""}
      ${e.strArea?`<p>${e.strArea}</p>`:""}
    </div>
    <div class="main">
      <p>${e.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${a.map(e=>`<li>${e}</li>`).join("")}
      </ul>
    </div>
  </div>`}submit.addEventListener("submit",searchMeal),random.addEventListener("click",getRandomMeal),mealsEl.addEventListener("click",e=>{let a=e.target;for(;null!==a&&!a.classList.contains("meal-info");)a=a.parentElement;let t=a;if(t){let l=t.getAttribute("data-mealid");getMealById(l)}});