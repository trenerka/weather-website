console.log("Client side javascript file is loaded!");

const search = document.querySelector("input");
const weatherForm = document.querySelector("form");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  const url = `http://localhost:3000/weather?address=${location}`;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(url).then((res) => {
    res.json().then((data) => {
      if (data.error) messageOne.textContent = data.error;
      else {
        messageOne.textContent = data.forecast;
        messageTwo.textContent = data.weather;
      }
    });
  });
});
