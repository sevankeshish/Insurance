//variables
const html = new HTMLUI();
const form = document.querySelector("#request-quote");

//evenntListeners
eventListeners();

function eventListeners() {
  //make option tag for select
  document.addEventListener("DOMContentLoaded", function () {
    //display the <option>
    html.displayYears();
  });

  //submit the form by clicking
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const make = document.querySelector("#make").value;
    const year = document.getElementById("year").value;
    const level = document.querySelector('input[name="level"]:checked').value;
    // console.log(make);
    // console.log(year);
    // console.log(level);

    //ckeck the fields value
    if (make === "" || year === "" || level === "") {
      html.displayError("لظفا مقادیر را به درستی وارد کنید");
    } else {
      let resultDiv = document.querySelector("#result div");
      if (resultDiv !== null) {
        resultDiv.remove();
      }
      // console.log("alright");
      const insurance = new Insurance(make, year, level);
      // insurance(make, year, level) //it is a wrong one
      const price = insurance.calculatePrice(insurance);
      // console.log(price);
      html.showResult(price, insurance);
    }
  });
}

/*
//objects
function Insurance(make, year, level) {
    this.make = make
    this.year = year
    this.level = level
}

//calculating the price
Insurance.prototype.calculatePrice = function (info) {
    // console.log(info);
    let price;
    let base = 2000000;
    
    //get the make value
    let make = info.make
    // insurance calculation by make
            
           // make 1 ==> pride ==> 1.15
           // make 2 ==> optima ==> 1.30
           // make 3 ==> porschr ==> 1.80
            

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

            // default:
            break;
    }
    // console.log(price);
    // return price

    //get year
    const year = info.year
    // console.log(year);

    const difference = this.getDifferenceYear(year)
    // console.log(difference);

    //3% cheaper for each year
    // price = price - (((difference * 3) /100) * price)
    price = price - ((difference * 0.03) * price)
    // console.log(price);

    const level = info.level
    price = this.calculateLevel(level, price)
    // console.log(price);
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

    let newYear = now.slice(0, 4)
    // console.log(newYear)
    let max = fixNumbers(newYear)
    // console.log(max);

    year = max - year

    return year
}

Insurance.prototype.calculateLevel = function (level, price) {
     
      // basic ==> increse 30%
       //complete ==> increase 50%
       
    if (level === "basic") {
        price = price * 1.3
    } else {
        price = price * 1.5
    }

    return price
}

function HTMLUI() {}

//1-display years 
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

    let newYear = now.slice(0, 4)
    // console.log(newYear)
    let max = fixNumbers(newYear)
    // console.log(max);

    let min = max - 20

    //access to the selected tag(year)
    const selectYear = document.querySelector("#year")

    for (let i = max; i >= min; i--) {
        //create option    
        const option = document.createElement("option")
        option.innerText = i
        option.value = i

        //append option to the selectYear
        selectYear.appendChild(option)
    }

}

//2.display error on the form
HTMLUI.prototype.displayError = function (err) {

    const div = document.createElement("div")
    div.classList = "error"
    div.innerText = err

    //insert div in form
    form.insertBefore(div, document.querySelector(".form-group"))

    //remove error in 3 seconds
    setTimeout(() => {
        document.querySelector(".error").remove()
    }, 3000);
}

//3.display factor 
HTMLUI.prototype.showResult = function (price, info) {

    //access to the result div
    const result = document.querySelector("#result")

    //create div for showing the price
    const div = document.createElement("div")

    //convert the make value to car name
    let make = info.make
    switch (make) {
        case "1":
            make = "پراید"
            break;
        case "2":
            make = "اپتیما"
            break;
        case "3":
            make = "پورشه"
            break;

            // default:
            break;
    }

    let level = info.level

    if (level === "basic") {
        level = "ساده"
    } else {
        level = "کامل"
    }


    div.innerHTML = `
    <p class="header">خلاصه فاکتور</p>
    <p>مدل ماشین :${make}</p>
    <p>سال ساخت :${info.year}</p>
    <p>نوع بیمه :${level}</p>
    <p class = "total" >فیمت نهایی :${price}</p>
    `
    //show spinner
    const spinner = document.querySelector("#loading img")
    spinner.style.display = "block"

    //hide spinner in 3 sec and then show the result
    setTimeout(() => {
        spinner.style.display = "none"
        result.appendChild(div)
    }, 3000);

    // console.log(info);
}

*/
