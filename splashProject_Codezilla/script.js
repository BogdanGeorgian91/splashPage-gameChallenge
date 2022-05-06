const overlay = document.querySelector(".popup-overlay");
const popContent = document.querySelector(".popup-content");
const navContainer = document.querySelector(".nav__container");
const nav = document.querySelector(".nav");

// Hamburger menu
$(".nav__hamburger").click(function (e) {
  $(".nav__hamburger").toggleClass("nav__hamburger-active");
  $(".nav__list2").toggleClass("nav__list2-bm");

  if ($(".nav__hamburger").hasClass("nav__hamburger-active")) {
    $(".nav__container").css("top", "0");
  } else {
    $(".nav__container").css("top", "-20px");
  }
});

//appends an "active" class to .popup and .popup-content when the "Open" button is clicked
$(".btn-cta1, .btn-cta2").on("click", function (e) {
  e.preventDefault();
  $(".popup-overlay, .popup-content").addClass("active");
});

// DISPLAYING MODAL WITH IMAGE FETCHED FROM PIXABAY API
let inputName;
let inputFruit;

async function getImage(el) {
  try {
    let fetchData = await axios.get(
      "https://pixabay.com/api/?key=26938153-0f73f30d796328a900f00ca01&q=" +
        el +
        "&image_type=photo"
    );

    let randomNum = Math.ceil(Math.random() * 20) - 1;
    return fetchData.data.hits[randomNum].webformatURL;
  } catch (err) {
    console.log(err);
  }
}

$(".form__btn").on("click", async function (e) {
  e.preventDefault();
  inputName = $(".form__name").val();
  inputFruit = $(".form__fruit").val().toLowerCase();

  if (inputName == "" || inputFruit == "") {
    $(".form__inp").attr("placeholder", "MUST ENTER SOMETHING");
  } else {
    $(".popup-overlay").addClass("active");
    $(
      ".popup-content"
    )[0].children[1].textContent = `Thank you, ${inputName}!!!`;
    $(".popup-content")[0].children[1].classList.add("input-name");
    const image = await getImage(inputFruit);
    $(
      ".popup-content"
    )[0].children[2].outerHTML = `<img src = ${image} class = "form__img">`;
    $(".popup-content").addClass("active");
  }
});

//removes the "active" class to .popup and .popup-content when the "Close" button is clicked
$(".close-btn").on("click", function () {
  $(".popup-overlay, .popup-content").removeClass("active");
});

// hide modal on outside click
window.addEventListener("click", (e) => {
  if (e.target == overlay) {
    overlay.classList.remove("active");
    popContent.classList.remove("active");
  }
});

// Header SLIDER
$(".autoplay").slick({
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2600,
  arrows: false,
});

// 2nd SLIDER
$(".autoplay2").slick({
  infinite: true,
  arrows: false,
  fade: true,
  loop: true,
  cssEase: "linear",
  autoplay: true,
  autoplaySpeed: 2000,
});

// Acordion dropdown only one active at any given time
$(".acordion__item").click(function (e) {
  let currentActive = $(this).hasClass("acordion__item-active");

  $(this)
    .parent(".acordion__container")
    .find("> *")
    .removeClass("acordion__item-active");

  if (currentActive != 1) {
    $(this).addClass("acordion__item-active");
  }
});

// SLIDER CARDS
let sliderBool = false;

let sliderBreakpoint = 768;

let sliderSettings = {
  infinite: true,
  speed: 300,
  slidesToShow: 2,
  slidesToScroll: 2,
  arrows: true,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: sliderBreakpoint,
      settings: "unslick",
    },
  ],
  prevArrow: ".arrow-prev",
  nextArrow: ".arrow-next",
};

function sliderInit(sliderElem) {
  if (window.innerWidth <= sliderBreakpoint) {
    if (sliderBool == false) {
      $(sliderElem).slick(sliderSettings);
      sliderBool = true;
    }
  } else {
    sliderBool = false;
  }
}

// init
sliderInit("#sect8");

// resize
$(window).resize(function () {
  sliderInit("#sect8");
});

// Theme Switcher
// function to set a given theme/color-scheme
function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-light");
  } else {
    setTheme("theme-dark");
  }
}
// Immediately invoked function to set the theme on initial load
(function () {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-dark");
    document.getElementById("theme-slider").checked = false;
  } else {
    setTheme("theme-light");
    document.getElementById("theme-slider").checked = true;
  }
})();

// ############################################################################
// #######################################################################
// ########################################################################
// ##########################################################################
// #########################################################################
// ########################################################################
// #####################################################################
// ##########################################################################
// #########################################################################

// GAME FUNCTIONALITY
const gameOverlay = $(".game__overlay");
const gameDifficulty = $(".game__difficulty");
const gameType = $(".game__type");

const scootersArea = $(".game__content__scooters");
const scooterImage = $(".scooterItem__img");
const gameStart = $(".game__btn-start");
const addScooter = $("#game__btn-add");
const gameStop = $("#game__btn-stop");

let startInterval;
let scooterItem;
let scootersArr = [];
let scootersArray = [];
let scooter;
let imageElement;
let energyPercentage;
let newScooter;

function changeDifficulty() {
  // console.log("ok");
  // console.log(gameType.text());
  gameType.text(gameType.text() == "mixed" ? "by color" : "mixed");
  // console.log(gameType.text());
}

// toggle between mixed and by-color game mode
gameDifficulty.on("click", changeDifficulty);

// FUNCTION TO POPULATE WITH SCOOTER ITEMS ON PAGE
const generateScooter = function populateWithScooters(percentageNum) {
  let opacity;

  if (!percentageNum) {
    let percentageNumberPhase1 =
      Math.floor(Math.random() * (100 - 50 + 1)) + 50;

    // PERCENTAGE NUMBER WILL BE EITHER 50, 60, 70, 80, 90 OR 100 IF NOT ADDED...
    // ...WITH 100(%) FROM THE START WITH THE ADD BUTTON EVENT HANDLER
    percentageNum = Math.trunc(percentageNumberPhase1 / 10) * 10;
  }
  // OPACITY OF THE SCOOTER WILL ALWAYS DEPEND ON THE PERCENTAGE NUMBER
  opacity = percentageNum / 100;
  // PICKING RANDOM SCOOTER IMAGE (DIFFERENT COLOR)
  let randomNumber = Math.ceil(Math.random() * 3) - 1;
  scooterItem = `
            <span class="scooterItem__energy">${percentageNum}%</span>
            <img src="/assets/img/scooter-${randomNumber}.png" alt="scooter" class="scooterItem__img" style="opacity: ${opacity}">
    `;
  // console.log(percentageNum);
  let wrapper = document.createElement("div");
  wrapper.classList.add("scooterItem");
  wrapper.innerHTML = scooterItem;
  // console.log(wrapper);

  // ASSIGNING THE CREATED SCOOTER ITEM AS A CHILD TO THE SCOOTERS AREA DIV
  return wrapper;
  // return scootersArea.append(wrapper);
};
// console.log(generateScooter());

// console.log(scootersArray);

function startGame() {
  console.log("CLICKED START BUTTON");
  // console.log(scootersArray);

  // REMOVING THE NAVBAR TO DISPLAY ON THE ENTIRE PAGE THE GAME CONTAINER
  $(".header").toggleClass("header-disabled");
  $(".nav__container").toggleClass("nav__container-disabled");
  gameOverlay.addClass("active");

  // CREATING AN ARRAY WITH 10 UNDEFINED VALUES WHICH WILL BE DEFINED AFTERWARDS...
  // ...EACH AS A SCOOTER ITEM AND RENDER ON PAGE
  scootersArr = Array.apply(null, { length: 10 });
  scootersArray = scootersArr.map(function (scooter) {
    scooter = generateScooter();
    scootersArea.append(scooter);
    return scooter;
    // return scootersArea[0].children;
  });

  // console.log(scootersArray);

  startInterval = setInterval(function () {
    console.log(scootersArray);
    // randomArrayShuffle(scootersArray);
    // shuffleArray(scootersArray);

    scootersArray.forEach((scooter) => {
      console.log(scooter);
      // console.log(scooter.children[1].attributes[0].textContent);
      // console.log("running ok");
      // console.log(scooter.firstElementChild);
      // randomArrayShuffle(scooter);

      let redScootersArr = [];
      let blueScootersArr = [];
      let greenScootersArr = [];

      scootersArray.map((scooter) => {
        let elementWanted = scooter.children[1].attributes[0].textContent;
        imageElement = elementWanted.match(/\d/g).join("");
        console.log(imageElement);

        if (imageElement == 0) {
          redScootersArr.push(imageElement);
        } else if (imageElement == 1) {
          blueScootersArr.push(imageElement);
        } else if (imageElement == 2) {
          greenScootersArr.push(imageElement);
        }

        // console.log(redScootersArr.length);
        // console.log(blueScootersArr.length);
        // console.log(greenScootersArr.length);

        $("#scootersRed")[0].childNodes[0].textContent = redScootersArr.length;
        $("#scootersBlue")[0].childNodes[0].textContent =
          blueScootersArr.length;
        $("#scootersGreen")[0].childNodes[0].textContent =
          greenScootersArr.length;
        $("#totalScooters")[0].childNodes[0].textContent =
          redScootersArr.length +
          blueScootersArr.length +
          greenScootersArr.length;
      });

      let energiesArr = [];
      energyPercentage = scooter.firstElementChild;
      energiesArr.push(energyPercentage);
      // console.log(energiesArr);
      // console.log(energiesArr.length);

      energiesArr.map((energy) => {
        // console.log(energiesArr);

        console.log(energy);
        // console.log(energy.nextElementSibling);

        let parent = energy.parentElement;
        let currentEnergy = parseInt(energy.firstChild.textContent);

        // console.log(parent);

        let currentOpacityEl =
          energy.parentElement.children[1].attributes[3].textContent;

        // console.log(currentOpacityEl);

        let currentOpacity = currentOpacityEl.match(/\d/g);
        // console.log(currentOpacity);
        currentOpacity = currentOpacity.join(".");
        // console.log(currentOpacity);

        energy.firstChild.textContent = `${currentEnergy}%`;
        currentEnergy = currentEnergy - 10;

        energy.parentElement.children[1].attributes[3].textContent = `opacity: ${currentOpacity}`;
        currentOpacity = (currentOpacity * 10 - 1) / 10;

        energy.firstChild.textContent = `${currentEnergy}%`;
        energy.parentElement.children[1].attributes[3].textContent = `opacity: ${currentOpacity}`;

        // console.log(parent);

        parent.onclick = function (e) {
          console.log("clicked added energy");
          currentEnergy = 100;
          energy.firstChild.textContent = `${currentEnergy}%`;
          currentOpacity = 1;
          energy.parentElement.children[1].attributes[3].textContent = `opacity: ${currentOpacity}`;
        };

        if (currentEnergy <= 10) {
          parent.classList.add("scooterItem__battery");
        } else {
          parent.classList.remove("scooterItem__battery");
        }

        if (currentEnergy == 0) {
          // parent.remove();
          console.log(scootersArray);

          // scooter.remove();

          for (let i = 0; i < scootersArray.length; i++) {
            if (scootersArray[i] === scooter) {
              scootersArray.splice(i, 1);
              scooter.remove();
            }

            if (scootersArray.length == 0) {
              clearInterval(startInterval);

              // let html = `<section class = "game-over">
              //     <h2>Game Over!</h2>
              //     <h3>Want to play again?</h3>

              //     <div class="game-over__switch-container">
              //         <label class="game-over__switch">
              //           <input type="checkbox" class = "game__difficulty game-over__difficulty">
              //           <span class="game-over__slider round"></span>
              //         </label>

              //         <span class = "game-over__type mixed">mixed</span>
              //     </div>

              //   <button class = "game-over__btn-start">Start</button>
              // </section>`;
              // scootersArea.append(html);
              // console.log($(".game-over__difficulty"));
              // $(".game-over__difficulty").on("click", changeDifficulty);
            }
          }

          console.log(scootersArray);
          // clearInterval(startInterval);

          if (scootersArray.length == 0) {
            let html = `<section class = "game-over">
              <h2>Game Over!</h2>
              <h3>Want to play again?</h3>

              <div class="game-over__switch-container">
                  <label class="game-over__switch">
                    <input type="checkbox" class = "game__difficulty" id="game-over__difficulty">
                    <span class="game-over__slider round"></span>
                  </label>

                  <span class = "game-over__type mixed">mixed</span>
              </div>

            <button class = "game-over__btn-start">Start</button>
          </section>`;

            scootersArea.append(html);

            console.log($("#game-over__difficulty")[0]);

            $("#game-over__difficulty")[0].onclick = function () {
              console.log("CLICKEDDDDDDDDD");
              const gameTypeOver = $(".game-over__type");
              gameTypeOver.text(
                gameTypeOver.text() == "mixed" ? "by color" : "mixed"
              );
            };

            $(".game-over__btn-start")[0].onclick = function () {
              $(".header").removeClass("header-disabled");
              $(".nav__container").removeClass("nav__container-disabled");
              scootersArea.empty();

              startGame();
            };
          }
        }

        // console.log(scootersArray[0]);
      });
    });
  }, 1000);
}

// EVENT HANDLER ON START BUTTON
gameStart.on("click", startGame);

console.log(scootersArray);

// GAME MODE = mixed (default)
if (gameType.text() == "mixed") {
  // console.log("ok mixed");
} else if (gameType.text() == "by color") {
  // GAME MODE = by color (harder)
  console.log("ok color");
}

function randomArrayShuffle(array) {
  // let currentIndex = array.length;
  // let temporaryValue;
  // let randomIndex;
  // while (currentIndex > 0) {
  //   console.log("SHUFFLING");
  //   randomIndex = Math.floor(Math.random() * currentIndex);
  //   currentIndex--;
  //   temporaryValue = array[currentIndex];
  //   array[currentIndex] = array[randomIndex];
  //   array[randomIndex] = temporaryValue;
  // }
  // return array;
}
function shuffleArray(array) {
  // for (let i = array.length - 1; i > 0; i--) {
  //   console.log("SHUFFLING ARRAY");
  //   const j = Math.floor(Math.random() * (i + 1));
  //   [array[i], array[j]] = [array[j], array[i]];
  // }
}

// ADDING SINGLE SCOOTER WITH 100% BATTERY
addScooter.on("click", function () {
  console.log("CLICKED ADD BUTTON");

  newScooter = generateScooter(100);
  // console.log(newScooter);
  scootersArray.push(newScooter);
  // randomArrayShuffle(scootersArray);
  // shuffleArray(scootersArray);

  scootersArea.append(newScooter);
  console.log(scootersArray);
});

// REMOVE GAME INTERFACE - STOP BUTTON
gameStop.on("click", function () {
  $(".header").removeClass("header-disabled");
  $(".nav__container").removeClass("nav__container-disabled");
  console.log("CLICKED STOP BUTTON");
  clearInterval(startInterval);

  scootersArray.length = 0;
  gameOverlay.removeClass("active");
  scootersArea.empty();
});
