const card = document.getElementById("card");

let currentTimeframe = "weekly";

const previousTimeframeText = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
};

const renderCards = (data) => {
  card.innerHTML = data
    .map(
      (item) =>
        ` 
      <div class="relative">
      <div class="bg-[${item.bgcolor}] rounded-xl overflow-hidden lg:min-h-[190px] md:min-h-[190px] min-h-[160px]">
        <div class="flex justify-end relative">
          <img
            class="w-[55px] mr-3 absolute top-[-3px]"
            src="${item.image}"
            alt="icon-work"
          />
        </div>

        <div class="bg-[#141638ff] px-5 pt-5 pb-6 rounded-xl absolute inset-x-0 bottom-0 top-[35px] hover:bg-[#1b1e4bff] transition duration-300 cursor-pointer ">
          <div class="flex justify-between items-center">
            <h3 class="text-[18px] text-white">${item.title}</h3>
            <img
              class="w-[15px]"
              src="./images/icon-ellipsis.svg"
              alt="icon-ellipsis"
            />
          </div>

        <div class="lg:block md:block flex justify-between items-center">
         <h4 class="lg:text-[35px] md:text-[35px] text-[25px] text-[white] mt-3">${item.timeframes[currentTimeframe].current}hrs</h4>
          <p class="text-[14px]">
            <span>${previousTimeframeText[currentTimeframe]}</span> - <span>${item.timeframes[currentTimeframe].previous}hrs</span>
          </p>
          </div>
          
        </div>
      </div>
      </div>
      `
    )
    .join("");
};

let dashboardData = [];

const getData = async () => {
  try {
    const response = await fetch("./data.json");
    dashboardData = await response.json();
    console.log(dashboardData);
    renderCards(dashboardData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

getData();

const timeFrameBtns = document.querySelectorAll("#timeframe li");

timeFrameBtns.forEach((btn) => {
  if (btn.dataset.time === currentTimeframe) {
    btn.classList.add("text-white");
  }

  btn.addEventListener("click", () => {
    currentTimeframe = btn.dataset.time;

    timeFrameBtns.forEach((btn) => btn.classList.remove("text-white"));
    btn.classList.add("text-white");

    renderCards(dashboardData);
  });
});
