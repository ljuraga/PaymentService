var contractAbi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "customerAddress",
                "type": "address"
            }
        ],
        "name": "addCustomerAddress",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "closeContract",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "getCustomers",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "customerAddress",
                "type": "address"
            },
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "processPayment",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "customerAddress",
                "type": "address"
            }
        ],
        "name": "removeCustomerAddress",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newCustomerRatio",
                "type": "uint256"
            }
        ],
        "name": "setCustomerRatio",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newOwnerRatio",
                "type": "uint256"
            }
        ],
        "name": "setOwnerRatio",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferContractBalanceToOwner",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "customer",
                "type": "address"
            }
        ],
        "name": "LogCustomers",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getContractBalance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getCustomerCount",
        "outputs": [
            {
                "name": "count",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getCustomerRatio",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getOwnerRatio",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

const openWeatherMapApiKey = "3a04b53f7b6d2edbaad0c1e9b9d783f1";

let searchButton = document.getElementById("searchButton");
let searchInput = document.getElementById("searchInput");
let city = document.getElementById("city");
let country = document.getElementById("country");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let web3response = document.getElementById("web3response");

searchButton.addEventListener("click", chargeFeeAndSearchCity);
searchInput.addEventListener("keyup", enterPressed);

window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */ });
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */ });
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

function enterPressed(event) {
    if (event.key === "Enter") {
        chargeFeeAndSearchCity();
    }
}

function chargeFeeAndSearchCity() {
    window.web3 = new Web3(web3.currentProvider);
    if (searchInput.value === "") {
    } else {
        var contractAddress = '0x97c4fc1b4770bd945776187cb7ece4c4388a82da'
        var ownerAddress = '0x8374e20B1111951ACbfC4D077BaB15F50134360A'
        var ethAmount = 0.004
        var ethAmountInWei = window.web3.toWei(ethAmount, 'ether')

        var Contract = web3.eth.contract(contractAbi);
        var contractInstance = Contract.at(contractAddress)

        contractInstance.processPayment(ownerAddress, ethAmountInWei, { from: web3.eth.accounts[0], value: ethAmountInWei, gas: 1000000 }, (function (err, result) {
            if (err) {
                clearAll();
                web3response.innerHTML = "Something went wrong!";
            } else {
                let openWeatherMapCitySearch = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + openWeatherMapApiKey;
                getJSON(openWeatherMapCitySearch, parseResponse);
                web3response.innerHTML = "Track your payment here: <a href='https://etherscan.io/tx/" + result + "'>https://etherscan.io/tx/" + result + "'"
            }
        }))
    }
}

function getJSON(url, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

function parseResponse(response) {
    let jsonObject = JSON.parse(response);
    city.innerHTML = "City: " + jsonObject.name;
    country.innerHTML = "Country: " + jsonObject.sys.country;
    temperature.innerHTML = "Temperature: " + parseInt(jsonObject.main.temp - 273) + "°";
    humidity.innerHTML = "Humidity: " + jsonObject.main.humidity + "%";
    wind.innerHTML = "Wind:\n" + "speed " + jsonObject.wind.speed + "km/h" + ", direction" + jsonObject.wind.deg + "°";
}

function clearAll() {
    city.innerHTML = "";
    country.innerHTML = "";
    temperature.innerHTML = "";
    humidity.innerHTML = "";
    wind.innerHTML = "";
}

