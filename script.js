const buttons = document.querySelectorAll(".filter-btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {

   
    buttons.forEach((btn) => {
      btn.classList.remove("bg-blue-500", "text-white");
      btn.classList.add("bg-white");
    });


    button.classList.remove("bg-white");
    button.classList.add("bg-blue-500", "text-white");
  });
});

const statusButtons = document.querySelectorAll(".status-btn");
const interviewCounter = document.querySelector(".interview-count"); 

statusButtons.forEach((button) => {
  button.addEventListener("click", () => {

    
    if (button.innerText === "Applied") return;

    
    button.innerText = "Applied";
    button.classList.add("bg-green-500", "text-white");

    
    interviewCounter.innerText = parseInt(interviewCounter.innerText) + 1;

  });
});