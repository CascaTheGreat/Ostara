//<div class="w-checkbox-input w-checkbox-input--inputType-custom toggle-pill-dark w--redirected-focus"></div>

//<div class="w-checkbox-input w-checkbox-input--inputType-custom toggle-pill-dark w--redirected-checked"></div>

function checkbox(dairyVal, eggVal, nutVal, soyVal, vegVal, vegaVal) {
	var allergyArray = ["Dairy", dairyVal, "Egg", eggVal, "Nuts", nutVal, "Soy", soyVal, "Vegetarian", vegVal, "Vegan", vegaVal]; 
	document.cookie = "Allergies" + "=" + JSON.stringify(allergyArray) + ";expires=Thu, 22 Dec 2022 12:00:00 UTC;path=/";
}
  

function getCookie(allergen) {
    let name = allergen + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


function logSubmit() {
	checkbox(document.getElementById("Dairy").checked, document.getElementById("Egg").checked, document.getElementById("Nuts").checked, document.getElementById("Soy").checked, document.getElementById("Vegetarian").checked, document.getElementById("Vegan").checked)
}

const form = document.getElementById('allergy-form');

//Checkbox IS checked
let allergenArray = new Array(["Dairy",true,"Egg",false,"Nuts",false,"Soy",false,"Vegetarian",false,"Vegan",false]);
let subArray = new Array;
/*let allergenArray = getCookie("Allergies") */
if (allergenArray[1]) {
  subArray.push("milk");
  subArray.push("butter");
  subArray.push("yogurt");
}
if (allergenArray[3]) {
  subArray.push("egg");
}
if (allergenArray[5]) {
  subArray.push("soy");
}
if (allergenArray[7]) {
  subArray.push("meat");
}
///Separate, Dont copy--------------------------------------------

/*let subArray = JSON.parse(getCookie("poison"));*/
let subArray = new Array("milk", "egg", "butter");
ingredients= document.getElementById("ingredients").textContent;

//allergen="milk";
//let allergenArray = new Array("milk", "egg", "butter");


var replacement = {"butter": "0.5 cup mashed avacados", "egg": "0.5 cup applesauce", "milk": "0.25 cup soy milk"};

let ingredientList = new Array("");
ingredientList = ingredients.split("- ");

for(var i = 0; i < subArray.length; i++){
  let allergen = subArray[i];
  for(var j = 1; j < ingredientList.length; j++){
    if (ingredientList[j].search(allergen) != -1) {
      ingredientList.splice(j, 1, replacement[allergen]);
    }
  }
}

let funnyString= "";

for(var i = 1; i < ingredientList.length; i++){
  funnyString += "- " + ingredientList[i] + "<br> <br>";
}

document.getElementById("ingredients").innerHTML = funnyString;



//INSTRUCTION PART--------------------------
instructions=document.getElementById("instructions").textContent;
console.log(instructions);

//allergen="milk";
//var testArray = [];
//testArray = ["milk", "egg", "butter"];


var replacementI = {"butter": "mashed avacados", "egg": "applesauce", "milk": "soy milk"};

let instructionList = new Array("");
instructionList = instructions.split("Step ");

for(var i = 0; i < subArray.length; i++){
  let allergen = subArray[i];
  for(var j = 1; j < instructionList.length; j++){
    //console.log(instructionList[j]);
    //console.log();
    if (instructionList[j].search(allergen) != -1) {
      let myString;
      myString = instructionList[j].substring(0, instructionList[j].indexOf(allergen));
      let mySecondString;
      let myVar;
      myVar = instructionList[j].indexOf(allergen)+allergen.length;
      mySecondString = instructionList[j].substring(myVar);
      console.log(mySecondString);
      instructionList[j] = "";
      instructionList[j] += myString + replacementI[allergen] + mySecondString;
      //console.log(instructionList[j]);
      //instructionList.splice(j, 1, replacementI[allergen]);
    }
  }
}
console.log(instructionList);
let comedicString = "";

for(var i = 1; i < instructionList.length; i++){
  comedicString += "Step " + instructionList[i] + "<br> <br>";
}

document.getElementById("instructions").innerHTML = comedicString;






