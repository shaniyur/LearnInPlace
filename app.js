const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

//const try1=document.querySelector("try-this");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// document.getElementById("try-this").addEventListener("click", function(){
//     alert("Hello World");
//   });

// function toggleForm(){
//     document.body.classList.toggle('activeForm');
//   }