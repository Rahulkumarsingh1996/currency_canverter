import React, { useState, useEffect } from "react";
import axios from "axios";
import Download from "./Download";
import CurrencyChart from "./CurrencyChart";
import './Design.css'

function Home() {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState();

  useEffect(() => {
    // Fetch the currency data from the spreadsheet or API
    axios
      .get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => {
        const data = response.data;
        const currencyCodes = Object.keys(data.rates);
        setCurrencies(currencyCodes);
        setBaseCurrency("USD");
        setTargetCurrency(currencyCodes[0]);
        setDate(data.date);

        const timestamp = data.time_last_updated;

        const updatedTime = new Date(timestamp * 1000).toLocaleTimeString();

        setTime(updatedTime);
      })
      .catch((error) => {
        console.log("Error fetching currency data:", error);
      });
  }, []);

  useEffect(() => {
    convertCurrency();
  }, [baseCurrency, targetCurrency, amount]);

  const convertCurrency = () => {
    if (baseCurrency === targetCurrency) {
      setResult(amount);
    } else {
      // Make the currency conversion calculation here
      axios
        .get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
        .then((response) => {
          const data = response.data;
          const exchangeRate = data.rates[targetCurrency];
          setResult(amount * exchangeRate);
        })
        .catch((error) => {
          console.log("Error fetching exchange rate:", error);
        });
    }
  };

  const currencyData = [
    { date: '2023-07-01', rate: 1.2 },
    { date: '2023-07-02', rate: 1.5 },
    { date: '2023-07-03', rate: 1.8 },
    // Add more data as needed
  ];

  return (
    <div className="main-div">
      <h1 className="text-center">Currency Converter</h1>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="container d-flex justify-content-center ">
              <section>
                <div>
                  <label htmlFor="base-currency">Base Currency:</label>
                  <select
                    id="base-currency"
                    value={baseCurrency}
                    onChange={(e) => setBaseCurrency(e.target.value)}
                    className="base_curr"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="target-currency">Target Currency:</label>
                  <select
                    id="target-currency"
                    value={targetCurrency}
                    onChange={(e) => setTargetCurrency(e.target.value)}
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="amount">Total Amount:</label>
                  <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </section>
              
            </div>
            <div className="mt-5" id="result">
          {result && (
            <div>
              <h5>
                The current currency of <i className="fa-duotone fa-dollar-sign"></i>
              </h5>
              <p>
                {amount} {baseCurrency} = {result} {targetCurrency}
              </p>
            </div>
          )}
        </div>
          </div>

          <div className="col-md-6">
            <div className="container">
              <div className="row">
                <div className="col-6 d-flex justify-content-evenly mt-2">
                  <span className="">
                    <i className="fa-solid fa-clock"></i>
                    {time}
                  </span>
                  <span className="">
                    <i className="fa-solid fa-calendar-days"></i> {date}
                  </span>
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                  <i className="fa-solid fa-download mt-2"></i> <Download />
                </div>
              </div>
              <CurrencyChart data={currencyData} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <h3>Currency converter</h3>
        <p className="bio">
          A currency converter is a tool that converts one currency's value or
          quantity into the relative values or amounts of other currencies.
          Currency conversion is carried out by utilising specialised software
          programmes that are created to be rapid and precise. Currency
          converters, which are widely and freely available online, can quickly
          convert the value of one currency into another. You can, for example,
          quickly convert dollars to rupees or rupees to pounds, and vice versa.
        </p>
        <p className="bio">
          They're especially helpful for travellers who want to know how much
          their home currency will rise or fall when visiting a new foreign
          country.
        </p>

        <p className="bio">
          A universal currency converter is so named because it allows you to
          convert any foreign currency into any domestic currency
        </p>

      </div>
    </div>
  );
}

export default Home;




