//variables
const html = new HTMLUI()
const form = document.querySelector("#request-quote")


//evenntListeners
eventListeners()

function eventListeners() {

    document.addEventListener('DOMContentLoaded', function () {
        html.displayYears()

    })

    form.addEventListener('submit', function (e) {
        e.preventDefault()

        const make = document.querySelector("#make").value
        const year = document.getElementById("year").value
        const level = document.querySelector('input[name="level"]:checked').value
        // console.log(make);
        // console.log(year);
        // console.log(level);

        if (make === "" || year === "" || level === "") {
            html.displayError("لظفا مقادیر را به درستی وارد کنید")
        } else {
            // console.log("alright");
            const insurance = new Insurance(make, year, level)
            // insurance(make, year, level) //it is a wrong one
            const price = insurance.calculatePrice(insurance)
        }

    })

}




//objects
function Insurance(make, year, level) {
    this.make = make
    this.year = year
    this.level = level
}

Insurance.prototype.calculatePrice = function (info) {
    // console.log(info);
    let price;
    let base = 2000000;
    let make = info.make
    // insurance calculation by make
    /*
    make 1 ==> pride ==> 1.15
    make 2 ==> optima ==> 1.30
    make 3 ==> porschr ==> 1.80
    */

    switch (make) {
        case "1":
            price = base * 1.15
            break;
        case "2":
            price = base * 1.30
            break;
        case "3":
            price = base * 1.80
            break;

        default:
            break;
    }
    // console.log(price);
    // return price

    //get year
    const year = info.year
    // console.log(year);

    const difference = this.getDifferenceYear(year)
    // console.log(difference);
    // price = price - (((difference * 3) /100) * price)
    price = price - ((difference * 0.03) * price)
    console.log(price);
}

Insurance.prototype.getDifferenceYear = function (year) {
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

    const now = new Date().toLocaleDateString('fa-IR');
    // console.log(now);

    const newYear = now.slice(0, 4)
    // console.log(newYear)
    const max = fixNumbers(newYear)
    // console.log(max);

    year = max - year

    return year

}

function HTMLUI() {}

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

    const now = new Date().toLocaleDateString('fa-IR');
    // console.log(now);

    const newYear = now.slice(0, 4)
    // console.log(newYear)
    const max = fixNumbers(newYear)
    // console.log(max);

    const min = max - 20

    const selectYear = document.querySelector("#year")

    for (let i = max; i >= min; i--) {
        const option = document.createElement("option")
        option.innerText = i
        option.value = i

        selectYear.appendChild(option)
    }

}

HTMLUI.prototype.displayError = function (err) {

    const div = document.createElement("div")
    div.classList = "error"
    div.innerText = err

    form.insertBefore(div, document.querySelector(".form-group"))

    setTimeout(() => {
        document.querySelector(".error").remove()
    }, 3000);
}