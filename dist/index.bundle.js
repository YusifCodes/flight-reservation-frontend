/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("// FUNCTION TO SEARCH FOR DESTINATIONS FROM A TO B\r\nconst handleSpecificSearch = () => {\r\n\r\n    let from = document.getElementById(\"from\").value.toUpperCase();\r\n    let to = document.getElementById(\"to\").value.toUpperCase();\r\n\r\n    document.querySelector(\".flight-list-container\").innerHTML = \"\";\r\n\r\n    if(document.querySelector(\".flight-container\")){\r\n\r\n        document.querySelector(\".flight-container\").innerHTML = \"\";\r\n\r\n    }\r\n    \r\n    async function fetchSpecificFlights()  {\r\n\r\n        let response = await fetch(`http://localhost:8080/api/v1/get/flights/${from.toUpperCase()}/${to.toUpperCase()}`);\r\n        let data = response.json()\r\n        \r\n        data.then((data) => {\r\n            \r\n            document.querySelector(\".flight-list-container\").insertAdjacentHTML(\"afterbegin\", \"<div class='flight-container'></div>\")\r\n\r\n            for(let i = 0; i <= data.length - 1; i++){\r\n\r\n                document.querySelector(\".flight-container\").insertAdjacentHTML(\"afterbegin\", `<div class=\"card\">\r\n                <div class=\"airline-container\">\r\n                    <img src=\"./img/${data[i].airline.toLowerCase()}.png\" alt=\"airline-logo\" class=\"airline-logo\">\r\n                    <p class=\"airline\">${data[i].airline}</p>\r\n                </div>\r\n                <p class=\"from-to\">${data[i].flyingfrom} - ${data[i].flyingto}</p>\r\n                <div class=\"info-container\">            \r\n                    <p class=\"flightnumber\">Flight number: ${data[i].flightnumber}</p>\r\n                    <p class=\"date\">Date: ${data[i].flightdate}</p>\r\n                    <p class=\"time\">Time: ${data[i].flighttime}</p>\r\n                    <p class=\"price\">Price: ${data[i].price}$</p>\r\n                </div>\r\n                <button type=\"button\" class=\"book-btn book-flight\">Book flight</button>\r\n                </div> `)\r\n\r\n                document.querySelector(\".book-btn\").addEventListener(\"click\", handleBookFlight.bind(event, data[i].flightnumber))\r\n            }\r\n\r\n        });\r\n\r\n    }\r\n\r\n\r\n    fetchSpecificFlights()\r\n\r\n\r\n}\r\n\r\n// FUNCTION THAT SHOWS ALL AVAILIABLE FLIGHTS\r\nconst handleSearchAll = () => {\r\n\r\n    document.querySelector(\".flight-list-container\").innerHTML = \"\";\r\n\r\n    if(document.querySelector(\".flight-container\")){\r\n\r\n        document.querySelector(\".flight-container\").innerHTML = \"\";\r\n\r\n    }\r\n\r\n    async function fetchAllFlights()  {\r\n\r\n        let response = await fetch(`http://localhost:8080/api/v1/get/flights/all`);\r\n        let data = response.json()\r\n\r\n        data.then((data) => {\r\n\r\n            document.querySelector(\".flight-list-container\").insertAdjacentHTML(\"afterbegin\", \"<div class='flight-container'></div>\")\r\n\r\n            for(let i = 0; i <= data.length - 1; i++){\r\n\r\n                document.querySelector(\".flight-container\").insertAdjacentHTML(\"afterbegin\", `<div class=\"card\">\r\n                <div class=\"airline-container\">\r\n                    <img src=\"./img/${data[i].airline.toLowerCase()}.png\" alt=\"airline-logo\" class=\"airline-logo\">\r\n                    <p class=\"airline\">${data[i].airline}</p>\r\n                </div>\r\n                <p class=\"from-to\">${data[i].flyingfrom} - ${data[i].flyingto}</p>\r\n                <div class=\"info-container\">            \r\n                    <p class=\"flightnumber\">Flight number: ${data[i].flightnumber}</p>\r\n                    <p class=\"date\">Date: ${data[i].flightdate}</p>\r\n                    <p class=\"time\">Time: ${data[i].flighttime}</p>\r\n                    <p class=\"price\">Price: ${data[i].price}$</p>\r\n                </div>\r\n                <button type=\"button\" class=\"book-btn book-flight\">Book flight</button>\r\n                </div> `)\r\n\r\n                document.querySelector(\".book-btn\").addEventListener(\"click\", handleBookFlight.bind(event, data[i].flightnumber))\r\n            }     \r\n                \r\n        })\r\n\r\n    };\r\n    fetchAllFlights()\r\n}\r\n\r\n\r\n\r\n// FUNCTION TO SHOW THE BOOKING INTERFACE\r\nconst handleBookFlight = (flightnumber, event) => {\r\n    console.log(flightnumber)\r\n\r\n    let finalSeat;\r\n    \r\n    document.querySelector(\".container\").innerHTML = \"\";\r\n\r\n    document.querySelector(\".container\").insertAdjacentHTML(\"afterbegin\", `\r\n        <h1 class=\"hero\">Let's set you up!</h1>\r\n        <div class=\"seat-container\">\r\n            <div class=\"seats-def\">\r\n                <div class=\"column column-def\">\r\n                    <div class=\"f seat\">f</div>\r\n                    <div class=\"e seat\">e</div>\r\n                    <div class=\"d seat\">d</div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"seats-abc\">\r\n                <div class=\"column column-abc\">\r\n                    <div class=\"c seat\">c</div>\r\n                    <div class=\"b seat\">b</div>\r\n                    <div class=\"a seat\">a</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    `);\r\n\r\n    // RENDERING ALL THE SEATS DYNAMICALLY\r\n\r\n    let seatsABC = [\"c\", \"b\", \"a\"]\r\n    let seatsDEF = [\"f\", \"e\", \"d\"]\r\n    const createSeats = (container, seatArray, insertNumbers) => {\r\n        let storeI;\r\n        let rowArr = [];\r\n\r\n        for(let i = 1; i <= 28; i++){\r\n\r\n            for(let j = 0; j <= seatArray.length - 1; j++){\r\n\r\n                rowArr.push(`<div class=\"${seatArray[j]}-${i} seat\"></div>`)\r\n\r\n            }\r\n\r\n            if(storeI !== i && insertNumbers == true){\r\n\r\n                document.querySelector(container).insertAdjacentHTML(\"beforeend\", `<div class=\"column-${i} column\"><span class=\"column-number\">${i}</span>${rowArr.join(\"\")}</div>`)\r\n                rowArr = [];\r\n\r\n            }\r\n            else if(storeI !== i && insertNumbers == false){\r\n\r\n                document.querySelector(container).insertAdjacentHTML(\"beforeend\", `<div class=\"column-${i} column\">${rowArr.join(\"\")}</div>`)\r\n                rowArr = [];\r\n                \r\n            }\r\n\r\n            storeI = i;\r\n        }\r\n        \r\n        // SHOWING ALL OCUPPIED SEATS FUNCTIONALITY\r\n\r\n        \r\n        const showOcuppied = async (flightnumber) => {\r\n            const response = await fetch(`http://localhost:8080/api/v1/get/seats/${flightnumber}`)\r\n            const data = response.json();\r\n\r\n            data.then(seats => {\r\n                seats.forEach(seat => {\r\n                    if(seat.seatstatus == false){\r\n                        document.querySelector(`.${seat.flightseat.replace(\" \", \"-\")}`).classList.add(\"occupied\")\r\n                    }\r\n                })\r\n            })\r\n        }\r\n\r\n\r\n\r\n        // CHOOSING A SEAT FUNCTIONALITY\r\n        const showSelected = () => {\r\n\r\n            let storeSeat;\r\n            document.querySelectorAll(\".seat\").forEach(seat => {\r\n                seat.addEventListener(\"click\", (e) => {\r\n        \r\n                    if(!e.target.classList.contains(\"occupied\")){\r\n                        e.target.classList.add(\"selected\");\r\n                        finalSeat = e.target.classList[0];\r\n                    }\r\n        \r\n                    if(e.target != storeSeat && storeSeat !== undefined){\r\n                        storeSeat.classList.remove(\"selected\")\r\n                    }\r\n                    storeSeat = e.target;\r\n        \r\n                })\r\n            })\r\n\r\n        }\r\n\r\n\r\n        showOcuppied(flightnumber)\r\n        showSelected()\r\n        \r\n    }\r\n\r\n    // HANDLE PASSENGER CREATION\r\n    const handlePassenger = (flightnumber, seat) => {\r\n\r\n        const firstname = document.querySelector(\".first-name\").value;\r\n        const lastname = document.querySelector(\".last-name\").value;\r\n        const passportnumber = document.querySelector(\".passport-number\").value;\r\n        const email = document.querySelector(\".email\").value;\r\n        const address = document.querySelector(\".address\").value;\r\n        let dataObject = {firstname, lastname, passportnumber, email, address, flightnumber, seat};\r\n    \r\n        const handleSubmit = () => {\r\n        \r\n            let url = \"http://localhost:8080/api/v1/set/passenger\";\r\n    \r\n           const xhr = new XMLHttpRequest();\r\n           xhr.open(\"POST\", url);\r\n           xhr.setRequestHeader(\"Accept\", \"application/json\");\r\n           xhr.setRequestHeader(\"Content-type\", \"application/json\");\r\n    \r\n           xhr.onreadystatechange = () => {\r\n               if(xhr.readyState === 4){\r\n                   console.log(xhr.status);\r\n               }\r\n           }\r\n    \r\n           dataObject = JSON.stringify(dataObject);\r\n           xhr.send(dataObject);\r\n           alert(\"Thank you. Reservation succesful\")\r\n        }\r\n    \r\n        if(seat !== undefined){\r\n            handleSubmit();\r\n            location.reload();\r\n            return false;\r\n        }\r\n    }\r\n\r\n    createSeats(\".seats-def\", seatsDEF, true)\r\n    createSeats(\".seats-abc\", seatsABC, false)\r\n\r\n\r\n    document.querySelector(\".container\").insertAdjacentHTML(\"beforeend\", `\r\n    <div class=\"book-info-container\"><input type=\"text\" class=\"first-name book-input\" placeholder=\"First Name\">\r\n    <input type=\"text\" class=\"last-name book-input\" placeholder=\"Last name\">\r\n    <input type=\"text\" class=\"email book-input\" placeholder=\"E-mail\">\r\n    <input type=\"text\" class=\"passport-number book-input\" placeholder=\"Passport number\">\r\n    <input type=\"text\" class=\"address book-input\" placeholder=\"Billing address\">\r\n    </div><button type=\"button\" class=\"setPassenger book-input\" >Reserve ticket</button>`);\r\n\r\n\r\n    document.querySelector(\".setPassenger\").addEventListener(\"click\",() => {\r\n        finalSeat = finalSeat.replace(\"-\", \" \")\r\n        handlePassenger(flightnumber, finalSeat);\r\n    })\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\ndocument.querySelector(\".search-specific\").addEventListener(\"click\", handleSpecificSearch);\r\ndocument.querySelector(\".search-all\").addEventListener(\"click\", handleSearchAll);\r\n\n\n//# sourceURL=webpack://plane-ticket-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;