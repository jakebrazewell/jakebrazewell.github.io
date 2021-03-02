// *****************
// VARIABLES
// ***************** 

let introPage = document.querySelector(".intro");
let introButton = document.querySelector(".intro__button--box");
let searchInput = document.querySelector("#main-search");
let searchButton = document.querySelector(".search__input--button");
let autocompleteDiv = document.querySelector(".autocomplete");
let selectedItems = document.querySelector(".search__selected");
let homePage = document.querySelector(".home");
let recipeListPage = document.querySelector(".recipeList");
let spinner = document.querySelector(".loader");
let recipeListReturn = document.querySelector(".recipeList__return");
let recipeList = document.querySelector(".recipeList__content");
let searchValidationText = document.querySelector(".search__validationText");


let selectedIngredientsArray = [];

let mockEndpoint = [
    
       {
        id: 248670,
        title: "Parmigiano Reggiano Savoury French Toast",
        likes: 1424,
        missedIngredientCount: 0,
        image: "https://spoonacular.com/recipeImages/248670-312x231.jpg",
        usedIngredients: [
            {
            0: {name: "bread"},  
            1: {name: "cheese"},  
            2: {name: "eggs"}  
            }
        ],
        unusedIngredients: [
            {
            0: {name: "dill"},  
            1: {name: "chives"},  
            2: {name: "milk"}  
            }
        ],
        usedIngredientCount: 4,
      },
      {
        id: 248670,
        title: "Another random recipe with a different name",
        likes: 1424,
        missedIngredientCount: 0,
        image: "https://spoonacular.com/recipeImages/637458-556x370.jpg",
        usedIngredients: [
            {
            0: {name: "bread"},  
            1: {name: "cheese"},  
            2: {name: "eggs"}  
            }
        ],
        unusedIngredients: [
            {
            0: {name: "dill"},  
            1: {name: "chives"},  
            2: {name: "milk"}  
            }
        ],
        usedIngredientCount: 4,
      },
       {
        id: 248670,
        title: "One last recipe I havent added yet",
        likes: 1424,
        missedIngredientCount: 0,
        image: "https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg",
        usedIngredients: [
            {
            0: {name: "bread"},  
            1: {name: "cheese"},  
            2: {name: "eggs"}  
            }
        ],
        unusedIngredients: [
            {
            0: {name: "dill"},  
            1: {name: "chives"},  
            2: {name: "milk"}  
            }
        ],
        usedIngredientCount: 4,
      },
       {
        id: 248670,
        title: "One last recipe I havent added yet",
        likes: 1424,
        missedIngredientCount: 0,
        image: "https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg",
        usedIngredients: [
            {
            0: {name: "bread"},  
            1: {name: "cheese"},  
            2: {name: "eggs"}  
            }
        ],
        unusedIngredients: [
            {
            0: {name: "dill"},  
            1: {name: "chives"},  
            2: {name: "milk"}  
            }
        ],
        usedIngredientCount: 4,
      },
      
    
]



// *****************
// AUTOCOMPLETE FUNCTIONS
// ***************** 


// Deals with the autocomplete search functionality 
function autocomplete() {
    // grabs data from spoonacular API and creates autocomplete list
    function fetchData(searchQuery) {
        fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=56b36a485ef743c498e8e1dc91e6a0f3&query=${searchQuery}&number=5`)
        .then(response => response.json())
        .then(function(data) {
            // console.log(data);
            createAutocompleteList(data)
        })
    }
    // takes the data from the search input and calls fetch API with data
    function grabSearchData() {
        let searchQuery = ""
        searchInput.addEventListener("keydown", function(e) {
            setTimeout(function(){
                searchQuery = searchInput.value
                // console.log(searchQuery)
                fetchData(searchQuery)
            }, 10)
        })
    }
    // creates the autocomplete list div with items
    function createAutocompleteList(ingArray) {
        let autocompleteList = document.querySelector(".autocomplete__list")
        if (autocompleteList === null) {
            let listBlock = document.createElement('div');
            adjustListHeight(ingArray, listBlock)
            listBlock.classList.add("autocomplete__list")
            createListItems(listBlock, ingArray)
        }
        else {
            autocompleteList.classList.remove("hide-content");
            autocompleteList.innerHTML = '';
            adjustListHeight(ingArray, autocompleteList)
            createListItems(autocompleteList, ingArray)
        }
    }
    // sets the height of the autocomplete div according to number of results
    function adjustListHeight(ingArray, listBlock) {
        let listHeight = (ingArray.length * 4).toString() + "rem";
        listBlock.style.height = listHeight;
    }
    // creates the individual autocomplete list items from returned API data
    function createListItems(listBlock, ingArray) {
        let listItemArray = ingArray.map(function(ingredient) {
            let itemDiv = document.createElement('div');
            let ingredientText = ingredient.name;
            itemDiv.innerHTML = 
            `
                <div class="autocomplete__list--item capitalize">${ingredientText}</div>
            `;
            return itemDiv;
        })
        listItemArray.forEach(listItem => {
            listBlock.appendChild(listItem)
        });
        autocompleteDiv.appendChild(listBlock)
    }
    grabSearchData()
}


// *****************
// INGREDIENT SELECTION FUNCTIONS
// ***************** 

// organise selected ingredients
function selectedItemsControl() {
    // gets the item from the autocomplete list
    function getListItem() {
        window.addEventListener("click", function(e) {
            if (e.target.classList.contains("autocomplete__list--item")) {
                console.log(e.target);
                searchButton.style.backgroundColor = "red";
                let targetValue = e.target.textContent
                // selectedIngredientsArray.push(targetValue);
                createSelectedItem(targetValue)
                console.log(selectedIngredientsArray)
                searchInput.value = "";
            }
            if (searchInput === document.activeElement) {
                let list = document.querySelector(".autocomplete__list")
                if(list) {
                    list.classList.remove("hide-content");
                }
            // hides list if clicked off the list 
            } else if (searchInput !== document.activeElement) {
                let list = document.querySelector(".autocomplete__list")
                if(list) {
                    list.classList.add("hide-content");
                }
            }
            
            
        })
    }
    
    // creates the html element for the selected item from autocomplete list
    function createSelectedItem(itemText) {
        let selectedItem = document.createElement("div");
        selectedItem.classList.add("search__selected--item");
        selectedItem.innerHTML =
        `
            <a class="close-selected"><i class="fas fa-times"></i></a>
            <p class="capitalize">${itemText}</p>
        `;
        selectedItems.appendChild(selectedItem);
        let closeButtons = document.querySelectorAll(".close-selected");
        closeButtons.forEach(function(button) {
            button.addEventListener("click", deleteSelectedIngredient)
        })
        selectedIngredientsArray.push(itemText)
    }
    
    // deletes the item from the html
    function deleteSelectedIngredient() {
       let currentItem = this.parentNode;
       let currentItemText = currentItem.childNodes[3].innerHTML
       let itemsDiv = currentItem.parentNode;
       itemsDiv.removeChild(currentItem)

       // removes the item from the final items array
       let index = selectedIngredientsArray.indexOf(currentItemText)
       selectedIngredientsArray.splice(index, 1)
       
    }

    // adds event listeners to common ingredients and adds a selected item div if clicked
    function commonItemChoice() {
        let commonItems = document.querySelectorAll(".commonItems__item");
        commonItems.forEach(function(item) {
            item.addEventListener("click", function() {
                let itemText = item.getElementsByClassName("commonItems__item--text")[0].textContent;
                createSelectedItem(itemText);
            })
        })
    }

    commonItemChoice()
    getListItem()
}

// *****************
// SELECTED RECIPE FUNCTIONS
// ***************** 


// grabs the data for recipes based on input ingredients 
function getSelectedRecipeData() {
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=56b36a485ef743c498e8e1dc91e6a0f3&ingredients=${selectedIngredientsArray[0]},+${selectedIngredientsArray[1]},+${selectedIngredientsArray[2]},+${selectedIngredientsArray[3]}&ranking=2&number=5`)
    .then(response => response.json())
    .then(function(data) {
        createRecipeListHTML(data)
    })
}

// collects recipes and moves to recipe page
function searchForSelectedRecipes() {
    searchButton.addEventListener("click", function() {
        if (selectedIngredientsArray.length < 1) {
            console.log("error")
            searchValidationText.classList.remove("hide-content");
        }
        else {
            searchValidationText.classList.add("hide-content");
            getSelectedRecipeData()
            recipePageTransition()
        }
    })
}

// creates the HTML for the list of recipes returned from API call
function createRecipeListHTML(data) {
    recipeList.innerHTML = ``;
    let listHeight = ((data.length * 13) + 20).toString() + "rem";
    let recipesArray = data.map(function(recipe) {
        console.log(recipe);
        let recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipeList__recipe");
        recipeDiv.innerHTML = 
        `
        <div class="recipeList__image">               
        </div>
        <div class="recipeList__text">
            <h5>${recipe.title}</h5>
            <div class="recipeList__icons">
                <p class="recipeList__icons--likes"><i class="far fa-heart"></i><span> ${recipe.likes}</span></p>
                <p class="recipeList__icons--used"><i class="far fa-check-circle"></i> <span>${recipe.usedIngredientCount}</span></p>
                <p class="recipeList__icons--missing"><i class="far fa-times-circle"></i> <span> ${recipe.missedIngredientCount}</span></p>
            </div>
            <div class="recipeList__info"><i class="fas fa-chevron-right"></i></div>
        </div>
        `
        recipeList.appendChild(recipeDiv);
        recipeDiv.childNodes[1].style.backgroundImage = `url(${recipe.image})`;

    });
    recipeList.style.height = listHeight;
    
}

// *****************
// RANDOM RECIPE FUNCTIONS
// ***************** 


// collects random recipe data ready to display on home page
function getRandomRecipeData() {
    fetch(`https://api.spoonacular.com/recipes/random?apiKey=56b36a485ef743c498e8e1dc91e6a0f3&number=4`)
    .then(response => response.json())
    .then(function(data) {
        // console.log(data)
        createRandomDiv(data)
    })
}

// creates the html for the random recipe returned from API call
function createRandomDiv(data) {
    let randomBoxDivs = document.querySelectorAll(".random__box");
    for(let i = 0; i < data.recipes.length; i++) {
        randomBoxDivs[i].innerHTML =
        `
        <p class="random__text">${data.recipes[i].title}</p>
        <div class="random__arrowbox">
            <i class="fas fa-chevron-right random__arrow"></i>
        </div>
        `
        randomBoxDivs[i].style.backgroundImage = `linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(115, 16, 255,0.7)), url(${data.recipes[i].image})`
    }
}


// *****************
// TRANSITION FUNCTIONS
// ***************** 


// transitions from main page to recipe page with loading screen
function recipePageTransition() {
    homePage.classList.add("fade-out");
    spinner.classList.add("fade-in");
    spinner.classList.add("spinning");
    recipeListPage.classList.remove("slide-right");

    setTimeout(function() {
        spinner.classList.add("hidden")
        spinner.classList.add("hide-content")
        recipeListPage.classList.add("fade-in")
    }, 1500)
    setTimeout(function() {
        homePage.classList.remove("fade-out");
    },1000)
    homePage.classList.add("slide-left");

    
}

function homePageTransition() {
    recipeListPage.classList.add("slide-right");
    homePage.classList.remove("slide-left");
    spinner.classList.remove("hide-content");
    spinner.classList.remove("spinning");
    spinner.classList.remove("fade-in");
    recipeListPage.classList.remove("fade-in");
    recipeListPage.classList.remove("slide-right");
}

recipeListReturn.addEventListener("click", homePageTransition)

// Removes intro page on mobile
introButton.addEventListener("click", function() {
    introPage.style.opacity = "0";
})







searchForSelectedRecipes()
autocomplete()
selectedItemsControl()
getRandomRecipeData()









