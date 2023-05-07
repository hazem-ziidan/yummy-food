$(document).ready(() => {
    searchByName("").then(() => { // default value for search is empty to showup some meals then loading screen will hide in 0.1s when response arrived.
       $(".main-loading").fadeOut(100)
       $(".loading-screen").fadeOut(100)
})
})
    
    // Side Bar Section ..
    let sideBarinnerWidth = $(".sideBar-inner").innerWidth(); 
    $(".SideBar").css('left' , -sideBarinnerWidth); // when web loaded sidebar will be hidden untill you press the button to show it up
    
    function openSideBar(){
        $(".SideBar").animate({left:"0px"}, 500)
        $(".sidebar-button").removeClass("fa-align-justify");
        $(".sidebar-button").addClass("fa-x");
        for (let i = 0; i < 5; i++) {$(".sideBar-inner a").eq(i).animate({top: 0}, (i + 5) * 100)}
        
    }

    function closeSideBar(){
    $(".SideBar").animate({left:-sideBarinnerWidth}, 500)
    $(".sidebar-button").addClass("fa-align-justify"); // button icons switch in sideBar section.
    $(".sidebar-button").removeClass("fa-x");
    $(".sideBar-inner a").animate({top: 300}, 500);

   }


    $(".sidebar-button").click( () => {
        if($(".SideBar").css('left') == "0px")
        {closeSideBar();} 
        else 
        {openSideBar();}    
    })
    // End of SideBar.
  
    







// Categories Functions 
// There is 3 functions for category section ..

// first we get the api data then recall the showCategoriesF to show up the data in response in categories section in website.
async function apiCategoriesF() {
    $("#DataContainer").html("")
    $(".main-loading").fadeIn(500)
    $("#SContainer").html("")

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    showCategoriesF(response.categories)
    $(".main-loading").fadeOut(500)

}

// in this function we built the html code inside the loop to showup each category in the api data to the user.
function showCategoriesF(arr) {
    let categories = "";

    for (let i = 0; i < arr.length; i++) {
        categories += `
        <div class="col-md-3">
        <div onclick="apiCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 categories-F">
        <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
        <div class="meal-layer position-absolute text-center text-black p-2">
        <h3>${arr[i].strCategory}</h3>
        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
        </div>
        </div>
        `
    }
    $("#DataContainer").html(categories)
}
// here we show up meals from showmealsF (when u click in any div it will go to showMealsF data to show up the meals inside a category you have choose)
async function apiCategoryMeals(category) {
    $("#DataContainer").html("")
    $(".main-loading").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()

    showMealsF(response.meals.slice(0, 20))
    $(".main-loading").fadeOut(500)
}

// when click in categories in sidebar (recall the apiCategoriesF + closeSideBar functions..)
$("#categories").click( () => {
    apiCategoriesF();
    closeSideBar();
})

// End Of  Categories Functions


// Area Section Functions 
// Same comments as categories section
async function apiAreaF() {
    $("#DataContainer").html("")
    $(".main-loading").fadeIn(500)
    $("#SContainer").html("")

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    showAreaF(respone.meals)
    $(".main-loading").fadeOut(300)

}

function showAreaF(arr) {
    let area = "";

    for (let i = 0; i < arr.length; i++) {
        area += `
        <div class="col-md-3">
        <div onclick="apiMealsArea('${arr[i].strArea}')" class="rounded-2 text-center area-div">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3>${arr[i].strArea}</h3>
        </div>
        </div>
        `
    }

    $("#DataContainer").html(area)
}

async function apiMealsArea(area) {
    $("#DataContainer").html("")
    $(".main-loading").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()

    showMealsF(response.meals.slice(0, 20))
    $(".main-loading").fadeOut(500)
}

$("#area").click( () => {
    apiAreaF();
    closeSideBar();
})

// End of Area section functions


// Ingredients functions section
// Same comments as categories , area  sections

async function apiIngredientsF() {
    $("#DataContainer").html("")
    $(".main-loading").fadeIn(300)
    $("#SContainer").html("")

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()


    showIngredientsF(respone.meals.slice(0, 20))
    $(".main-loading").fadeOut(300)

}

function showIngredientsF(arr) {
    let Ingredients = "";

    for (let i = 0; i < arr.length; i++) {
        Ingredients += `
        <div class="col-md-3">
        <div onclick="apiIngredientsMealF('${arr[i].strIngredient}')" class="rounded-2 text-center ingredients-div">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${arr[i].strIngredient}</h3>
        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
        </div>
        `
    }
    $("#DataContainer").html(Ingredients)
}

async function apiIngredientsMealF(ingredients) {
    $("#DataContainer").html("")
    $(".main-loading").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()

    showMealsF(response.meals.slice(0, 20))
    $(".main-loading").fadeOut(500)
}

$("#Ingredients").click( () => {
    apiIngredientsF();
    closeSideBar();
})

// End of ingredients functions section 


// Meals functions section 

function showMealsF(arr) {
    let meals = "";

    for (let i = 0; i < arr.length; i++) {
        meals += `
        <div class="col-md-3">
        <div onclick="mealDF('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
        <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
        <h3>${arr[i].strMeal}</h3>
        </div>
        </div>
        </div>
        `
    }
    $("#DataContainer").html(meals)
}

async function mealDF(mealID) {
    closeSideBar();
    $("#DataContainer").html("");
    $(".main-loading").fadeIn(500);
    $("#SContainer").html("");

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".main-loading").fadeOut(500)

}

function displayMealDetails(meal) {
    
    $("#SContainer").html("");
    // this code creates two lists (ingredients and tags) that can be displayed on a webpage

    // Checks if they exist in the meal object. If an ingredient exists, it is added to the ingredients list along with its corresponding measurement.
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    // checks if the meal has any tags associated with it. If there are no tags, an empty array is created. If there are tags, they are split into an array and then added to the tagsStr variable as list items.

    let tags = meal.strTags?.split(",")
 
    if (tags === undefined || tags === null) {
        tags = [];
    }

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr +=`<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let mealDetails = `
    <div class="col-md-4">
    <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
    <h2 class="image-info pt-3">${meal.strMeal}</h2>
    </div>
    <div class="col-md-8 py-2">
    <h2 class="D-Header text-center">Instructions</h2>
    <p class="D-Pargraph text-center">${meal.strInstructions}</p>
    <h3 class="text-center heading-D "><span class="fw-bolder heading-D1">Area : </span>${meal.strArea}</h3>
    <h3 class="text-center heading-D py-4"><span class="fw-bolder heading-D1">Category : </span>${meal.strCategory}</h3>
    <h3 class="text-center heading-D1">Recipes :</h3>
    <div class="d-flex justify-content-center text-center py-2">
    <ul class="list-unstyled d-flex g-3 flex-wrap ">${ingredients}</ul>
    </div>

    <h3 class="text-center">Tags :</h3>

    <div class="d-flex justify-content-center text-center">
    <ul class="list-unstyled d-flex g-3 flex-wrap">${tagsStr}</ul>
    </div>

    <div class="text-center">
    <a target="_blank" href="${meal.strSource}" class="btn btn-success px-4">Source</a>
    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger px-4">Youtube</a>
    </div>

    </div>`

    $("#DataContainer").html(mealDetails)
}

// End of Meals functions section 


// Search functions 
function showSearchInputs() {
    $(".main-loading").fadeIn(300)
    $("#SContainer").html(`
        <div class="row py-4 ">
        <h2 class="text-center search-h2 py-3">Search to find your favourite meal ! </h2>
        <div class="col-md-6 ">
        <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
        <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`)

    $(".main-loading").fadeOut(300)
    $("#DataContainer").html("")

}

async function searchByName(term) {
    closeSideBar();
    $("#DataContainer").html("")
    $(".main-loading").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    if (response.meals) 
    {
    showMealsF(response.meals);
    } 
    else 
    {
    showMealsF([]);
    }
      
    $(".main-loading").fadeOut(500)

}

async function searchByFLetter(term) {
    closeSideBar();
    $("#DataContainer").html("")
    $(".main-loading").fadeIn(500)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    if (response.meals) 
    {
    showMealsF(response.meals);
    } 
    else {
    showMealsF([]);
    }
    $(".main-loading").fadeOut(500)

}

$("#search").click( () => {
    showSearchInputs();
    closeSideBar();
})
// End Of Search Functions.

// Contacts Section


$("#ContactUs").click( () => {
    contactsF();
    closeSideBar();
})


function contactsF() {
    $(".main-loading").fadeIn(500)
$("#DataContainer").html(`    
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
    <h3 class="text-center py-3 heading-contact">Contact Us </h3>
    <div class="row g-4">
    <div class="col-md-6">
    <input onkeyup="entryVerficationF()" type="text" class="form-control bg-transparent text-white" id="NameEntry" placeholder="Enter Your Name">
    <div class="error text-white w-100 mt-2 d-none" id="NameError">Special characters,numbers,symbols are not allowed.</div>
    </div>
    <div class="col-md-6">
    <input onkeyup="entryVerficationF()" type="email" class="form-control bg-transparent text-white" id="EmailEntry" placeholder="Enter Your Email">
    <div class="error text-white w-100 mt-2 d-none" id="EmailError">Enter correct email address, example : test@domain.com</div>
    </div>
    <div class="col-md-6">
    <input  onkeyup="entryVerficationF()" type="text" class="form-control bg-transparent text-white" id="PhoneEntry" placeholder="Enter Your Phone">
    <div  class="error text-white w-100 mt-2 d-none" id="PhoneError"> Enter correct phone number for verfication.</div>
    </div>
    <div class="col-md-6">
    <input onkeyup="entryVerficationF()" type="number" class="form-control bg-transparent text-white" id="AgeEntry" placeholder="Enter Your Age">
    <div class="error text-white w-100 mt-2 d-none" id="AgeError">Enter your age.</div>
    </div>
    <div class="col-md-6">
    <input onkeyup="entryVerficationF()" type="password" class="form-control bg-transparent text-white" id="PasswordEntry" placeholder="Enter Your Password">
    <div class="error text-white w-100 mt-2 d-none" id="PasswordError">Enter a strong password minimum 8 characters - should contain atleast 1 letter , 1 number </div>
    </div>
    <div class="col-md-6">
    <input onkeyup="entryVerficationF()" type="password" class="form-control bg-transparent text-white" id="rePasswordEntry" placeholder="Repassword">
    <div class="error text-white w-100 mt-2 d-none" id="rePasswordError">Make sure it's the same as password field. </div>
    </div>
    </div>
    <button id="ContactButton"  class="btn w-50 px-2 mt-3 disabled C-B">Submit</button>
    </div>
</div>
    
    
`)
    
// when the user clicks away from the input field a function is executed that sets a variables to true.

    $("#NameEntry").on("blur", function() {
        nameTest = true;
    });

    $("#EmailEntry").on("blur", function() {
        emailTest = true;
    });
    
    $("#PhoneEntry").on("blur", function() {
        phoneTest = true;
    });

    $("#AgeEntry").on("blur", function() {
        ageTest = true;
    });

    $("#PasswordEntry").on("blur", function() {
        passwordTest = true;
    });

    $("#rePasswordEntry").on("blur", function() {
        repasswordTest = true;
    });

    $(".main-loading").fadeOut(500)
}

// here we change all variables to false , to determine user interacted with inputs or not.
let nameTest = false;
let emailTest = false;
let phoneTest = false;
let ageTest = false;
let passwordTest = false;
let repasswordTest = false;




function entryVerficationF() {
    if (nameTest) {
        if (nameVerfication()) 
        {
        $("#NameError").removeClass("d-block").addClass("d-none");
        } 
        else 
        {
        $("#NameError").removeClass("d-none").addClass("d-block");
        }
    }
    if (emailTest) {
        if (emailVerfication()) 
        {
        $("#EmailError").removeClass("d-block").addClass("d-none");
        } 
        else 
        {
        $("#EmailError").removeClass("d-none").addClass("d-block");
        }
    }

    if (phoneTest) {
        if (phoneVerfication()) 
        {
        $("#PhoneError").removeClass("d-block").addClass("d-none");
        } 
        else 
        {
        $("#PhoneError").removeClass("d-none").addClass("d-block");
        }
    }

    if (ageTest) {
        if (ageVerfication()) 
        {
        $("#AgeError").removeClass("d-block").addClass("d-none");
        } 
        else 
        {
        $("#AgeError").removeClass("d-none").addClass("d-block");
        }
    }

    if (passwordTest) {
        if (passwordVerfication()) 
        {
        $("#PasswordError").removeClass("d-block").addClass("d-none");
        } 
        else 
        {
        $("#PasswordError").removeClass("d-none").addClass("d-block");
        }
    }
    if (repasswordTest) {
        if (rePasswordVerfication()) 
        {
        $("#rePasswordError").removeClass("d-block").addClass("d-none");
        } 
        else 
        {
        $("#rePasswordError").removeClass("d-none").addClass("d-block");
        }
    }



// The reg expression for name => This regular expression allows only alphabets uppercase and lowercase.
function nameVerfication() {
    return (/^[a-zA-Z ]+$/.test($("#NameEntry").val()));
}
// The reg expression for email => This regular expression validates email addresses that end with @mail.domain, where domain can be any valid domain name.
function emailVerfication() {
    return (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test($("#EmailEntry").val()))
}

// The reg expression for phone => This regular expression validates phone numbers from around the world, including country codes and optional spaces or hyphens between digits.
    
function phoneVerfication() {
    return (/^(?:\+|\d{1,3})\s?(?:\d{1,4}\s?){6,14}\d$/.test($("#PhoneEntry").val()))
}
// The reg expression for age => This regular expression validates age values between 1 and 100.
function ageVerfication() {
    return (/^(?:[1-9][0-9]?|100)$/.test($("#AgeEntry").val()))
}
// The reg expression for password => This regular expression validates passwords that are at least 8 characters long and contain at least one letter and one number.
function passwordVerfication() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test($("#PasswordEntry").val()))
}
    
function rePasswordVerfication() {
    return $("#rePasswordEntry").val() == $("#PasswordEntry").val();
}
    


    if (nameVerfication() && emailVerfication() && phoneVerfication() && ageVerfication() && passwordVerfication() && rePasswordVerfication()) 
    {
    $("#ContactButton").removeClass("disabled")
    } 
    else 
    {
    $("#ContactButton").addClass("disabled", true);
    }
}


