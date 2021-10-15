// FUNCTION TO SEARCH FOR DESTINATIONS FROM A TO B
const handleSpecificSearch = () => {

    let from = document.getElementById("from").value.toUpperCase();
    let to = document.getElementById("to").value.toUpperCase();

    document.querySelector(".flight-list-container").innerHTML = "";

    if(document.querySelector(".flight-container")){

        document.querySelector(".flight-container").innerHTML = "";

    }
    
    async function fetchSpecificFlights()  {

        let response = await fetch(`http://localhost:8080/api/v1/get/flights/${from.toUpperCase()}/${to.toUpperCase()}`);
        let data = response.json()
        
        data.then((data) => {
            
            document.querySelector(".flight-list-container").insertAdjacentHTML("afterbegin", "<div class='flight-container'></div>")

            for(let i = 0; i <= data.length - 1; i++){

                document.querySelector(".flight-container").insertAdjacentHTML("afterbegin", `<div class="card">
                <div class="airline-container">
                    <img src="./img/${data[i].airline.toLowerCase()}.png" alt="airline-logo" class="airline-logo">
                    <p class="airline">${data[i].airline}</p>
                </div>
                <p class="from-to">${data[i].flyingfrom} - ${data[i].flyingto}</p>
                <div class="info-container">            
                    <p class="flightnumber">Flight number: ${data[i].flightnumber}</p>
                    <p class="date">Date: ${data[i].flightdate}</p>
                    <p class="time">Time: ${data[i].flighttime}</p>
                    <p class="price">Price: ${data[i].price}$</p>
                </div>
                <button type="button" class="book-btn book-flight">Book flight</button>
                </div> `)

                document.querySelector(".book-btn").addEventListener("click", handleBookFlight.bind(event, data[i].flightnumber))
            }

        });

    }


    fetchSpecificFlights()


}

// FUNCTION THAT SHOWS ALL AVAILIABLE FLIGHTS
const handleSearchAll = () => {

    document.querySelector(".flight-list-container").innerHTML = "";

    if(document.querySelector(".flight-container")){

        document.querySelector(".flight-container").innerHTML = "";

    }

    async function fetchAllFlights()  {

        let response = await fetch(`http://localhost:8080/api/v1/get/flights/all`);
        let data = response.json()

        data.then((data) => {

            document.querySelector(".flight-list-container").insertAdjacentHTML("afterbegin", "<div class='flight-container'></div>")

            for(let i = 0; i <= data.length - 1; i++){

                document.querySelector(".flight-container").insertAdjacentHTML("afterbegin", `<div class="card">
                <div class="airline-container">
                    <img src="./img/${data[i].airline.toLowerCase()}.png" alt="airline-logo" class="airline-logo">
                    <p class="airline">${data[i].airline}</p>
                </div>
                <p class="from-to">${data[i].flyingfrom} - ${data[i].flyingto}</p>
                <div class="info-container">            
                    <p class="flightnumber">Flight number: ${data[i].flightnumber}</p>
                    <p class="date">Date: ${data[i].flightdate}</p>
                    <p class="time">Time: ${data[i].flighttime}</p>
                    <p class="price">Price: ${data[i].price}$</p>
                </div>
                <button type="button" class="book-btn book-flight">Book flight</button>
                </div> `)

                document.querySelector(".book-btn").addEventListener("click", handleBookFlight.bind(event, data[i].flightnumber))
            }     
                
        })

    };
    fetchAllFlights()
}



// FUNCTION TO SHOW THE BOOKING INTERFACE
const handleBookFlight = (flightnumber, event) => {
    console.log(flightnumber)

    let finalSeat;
    
    document.querySelector(".container").innerHTML = "";

    document.querySelector(".container").insertAdjacentHTML("afterbegin", `
        <h1 class="hero">Let's set you up!</h1>
        <div class="seat-container">
            <div class="seats-def">
                <div class="column column-def">
                    <div class="f seat">f</div>
                    <div class="e seat">e</div>
                    <div class="d seat">d</div>
                </div>
            </div>

            <div class="seats-abc">
                <div class="column column-abc">
                    <div class="c seat">c</div>
                    <div class="b seat">b</div>
                    <div class="a seat">a</div>
                </div>
            </div>
        </div>
    `);

    // RENDERING ALL THE SEATS DYNAMICALLY

    let seatsABC = ["c", "b", "a"]
    let seatsDEF = ["f", "e", "d"]
    const createSeats = (container, seatArray, insertNumbers) => {
        let storeI;
        let rowArr = [];

        for(let i = 1; i <= 28; i++){

            for(let j = 0; j <= seatArray.length - 1; j++){

                rowArr.push(`<div class="${seatArray[j]}-${i} seat"></div>`)

            }

            if(storeI !== i && insertNumbers == true){

                document.querySelector(container).insertAdjacentHTML("beforeend", `<div class="column-${i} column"><span class="column-number">${i}</span>${rowArr.join("")}</div>`)
                rowArr = [];

            }
            else if(storeI !== i && insertNumbers == false){

                document.querySelector(container).insertAdjacentHTML("beforeend", `<div class="column-${i} column">${rowArr.join("")}</div>`)
                rowArr = [];
                
            }

            storeI = i;
        }
        
        // SHOWING ALL OCUPPIED SEATS FUNCTIONALITY

        
        const showOcuppied = async (flightnumber) => {
            const response = await fetch(`http://localhost:8080/api/v1/get/seats/${flightnumber}`)
            const data = response.json();

            data.then(seats => {
                seats.forEach(seat => {
                    if(seat.seatstatus == false){
                        document.querySelector(`.${seat.flightseat.replace(" ", "-")}`).classList.add("occupied")
                    }
                })
            })
        }



        // CHOOSING A SEAT FUNCTIONALITY
        const showSelected = () => {

            let storeSeat;
            document.querySelectorAll(".seat").forEach(seat => {
                seat.addEventListener("click", (e) => {
        
                    if(!e.target.classList.contains("occupied")){
                        e.target.classList.add("selected");
                        finalSeat = e.target.classList[0];
                    }
        
                    if(e.target != storeSeat && storeSeat !== undefined){
                        storeSeat.classList.remove("selected")
                    }
                    storeSeat = e.target;
        
                })
            })

        }


        showOcuppied(flightnumber)
        showSelected()
        
    }

    // HANDLE PASSENGER CREATION
    const handlePassenger = (flightnumber, seat) => {

        const firstname = document.querySelector(".first-name").value;
        const lastname = document.querySelector(".last-name").value;
        const passportnumber = document.querySelector(".passport-number").value;
        const email = document.querySelector(".email").value;
        const address = document.querySelector(".address").value;
        let dataObject = {firstname, lastname, passportnumber, email, address, flightnumber, seat};
    
        const handleSubmit = () => {
        
            let url = "http://localhost:8080/api/v1/set/passenger";
    
           const xhr = new XMLHttpRequest();
           xhr.open("POST", url);
           xhr.setRequestHeader("Accept", "application/json");
           xhr.setRequestHeader("Content-type", "application/json");
    
           xhr.onreadystatechange = () => {
               if(xhr.readyState === 4){
                   console.log(xhr.status);
               }
           }
    
           dataObject = JSON.stringify(dataObject);
           xhr.send(dataObject);
           alert("Thank you. Reservation succesful")
        }
    
        if(seat !== undefined){
            handleSubmit();
            location.reload();
            return false;
        }
    }

    createSeats(".seats-def", seatsDEF, true)
    createSeats(".seats-abc", seatsABC, false)


    document.querySelector(".container").insertAdjacentHTML("beforeend", `
    <div class="book-info-container"><input type="text" class="first-name book-input" placeholder="First Name">
    <input type="text" class="last-name book-input" placeholder="Last name">
    <input type="text" class="email book-input" placeholder="E-mail">
    <input type="text" class="passport-number book-input" placeholder="Passport number">
    <input type="text" class="address book-input" placeholder="Billing address">
    </div><button type="button" class="setPassenger book-input" >Reserve ticket</button>`);


    document.querySelector(".setPassenger").addEventListener("click",() => {
        finalSeat = finalSeat.replace("-", " ")
        handlePassenger(flightnumber, finalSeat);
    })
}








document.querySelector(".search-specific").addEventListener("click", handleSpecificSearch);
document.querySelector(".search-all").addEventListener("click", handleSearchAll);
