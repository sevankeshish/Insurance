//variables
const form = document.querySelector("#request-quote")
const html = new HTMLUI()


//eventListeners
eventListeners()

function eventListeners() {

    document.addEventListener("DOMContentLoaded", function () {

        //display the <option>
        // console.log(html)
        html.displayYears()

    })

    form.addEventListener("submit", function (e) {
        e.preventDefault()

        const make = document.querySelector("#make").value
        const year = document.getElementById("year").value
        const level = document.querySelector('input[name="level"]:checked').value
        // console.log(make);
        // console.log(year);
        // console.log(level);

        if(make === "" || year === "" || level === ""){
            html.displayError("لظفا مقادیر را به درستی وارد کنید")
        } else {
            console.log("alright");
        }

    })

}


//objects
function HTMLUI() {}

//display year
HTMLUI.prototype.displayYears = function () {
    let
        persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
        fixNumbers = function (str) {
            if (typeof str === 'string') {
                for (let i = 0; i < 10; i++) {
                    str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
                }
            }
            return str;
        };

    //get max year
    const now = new Date().toLocaleDateString('fa-IR');
    // console.log(year)
    let nowYear = now.slice(0, 4)
    let max = fixNumbers(nowYear)
    // console.log(max);

    //get min year
    let min = max - 20

    //accessto the select tag
    const selectYear = document.querySelector("#year")

    //create for loop for maing the option tag
    for (let i = max; i >= min; i--) {
        //create option
        const option = document.createElement("option")
        option.value = i
        option.innerText = i

        //append option to the selectYear
        selectYear.appendChild(option)

    }
}

HTMLUI.prototype.displayError = function (err){
    const div = document.createElement("div")
    div.classList ="error"
    div.innerText = err

    form.insertBefore(div , document.querySelector(".form-group"))

    setTimeout(() => {
        document.querySelector(".error").remove()
    }, 3000);
}