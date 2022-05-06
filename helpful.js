      let arr = [...scootersArea[0].children];
    console.log(arr);

    arr.map(el => {
      console.log(el.firstElementChild.innerText);
      let variable = parseInt(el.firstElementChild.innerText);

      return el.firstElementChild.innerText = setInterval(() => {
        return `${variable - 10}%`;
      }, 1000);
    })

    #######################################

    let myInterval;
  let spinning = false;

  function handleClick() {
    spinning = spinning ? stop() : start();
  }

  // start the interval that calls move function and set moving to true
  function start() {
    spinning = true;
    // myInterval = setInterval(function () {
    //   move();
    // }, 500);
    myInterval = setInterval(decreaseBattery, 1000);
  }

  // clear the interval and set spinning to false
  function stop() {
    spinning = false;
    clearInterval(myInterval);
  }

  // myInterval = setInterval(decreaseBattery, 1000);


  #######################################

   spinning = spinning ? stop() : start();

  // if (spinning) {
  //   stop();
  // } else {
  //   start();
  // }

  function start() {
    spinning = true;
    intervalID = setInterval(decreaseBattery, 1000);
  }

  function stop() {
    console.log("ok");
    spinning = false;
    clearInterval(intervalID);
  }


    #######################################

     // console.log(scootersArr);

  // CREATING THE ARRAY WITH THE 10 INITIAL SCOOTER ITEMS WHICH WILL BE DISPLAYED ON THE PAGE
  // const scootersArr = Array.apply(null, { length: 10 });
  
  // scootersArray = scootersArr.map((scooter) => {
  //   if (scootersArea[0].children.length == 0) {
  //     for (let i = 0; i < scootersArr.length; i++) {
  //       scooter = populateWithScooters();
  //       // scooter = populateWithScooters;
  //       // scootersArea.append(scooter);
  //     }
  //   }
  // });

  // scootersArray = scootersArr.map((scooter) => {
    
  //       scooter = populateWithScooters();
  //       // scooter = populateWithScooters;
  //       scootersArea.append(scooter);
  //     });

  ####################################################################
  GOOD PART

  // scooterImage.on("click", function (e) {
//   // console.log("ENERGY REFUEL");
//   e.currentTarget.attributes.style.nodeValue = `opacity: 1`;
//   e.currentTarget.parentElement.firstChild.nextSibling.textContent = `100%`;
// });

########################################################################if (scootersArray.length == 0) {
              clearInterval(startInterval);

              let html = `<section class = "game-over">
                  <h2>Game Over!</h2>
                  <h3>Want to play again?</h3>

                  <div class="game-over__switch-container">
                      <label class="game-over__switch">
                        <input type="checkbox" class = "game__difficulty game-over__difficulty">
                        <span class="game-over__slider round"></span>
                      </label>

                      <span class = "game-over__type mixed">mixed</span>
                  </div>

                <button class = "game-over__btn-start">Start</button>
              </section>`;
              scootersArea.append(html);
              console.log($(".game-over__difficulty"));
              // $(".game-over__difficulty").on("click", changeDifficulty);
            }


 #######################################
 let html = `
      <div class="game__content__stats">
            <div class="game__content__stats__component">
              <img src="/assets/img/scooter-small-black.png" alt="scooter" class="scooterItem__img-small">
              <span class="scooterItem__number" id="totalScooters">START</span>
            </div>

            <div class="game__content__stats__component">
              <img src="/assets/img/scooter-small-0.png" alt="scooter" class="scooterItem__img-small">
              <span class="scooterItem__number number-red" id="scootersRed">START</span>
            </div>

            <div class="game__content__stats__component">
              <img src="/assets/img/scooter-small-2.png" alt="scooter" class="scooterItem__img-small">
              <span class="scooterItem__number number-green" id="scootersGreen">START</span>
            </div>

            <div class="game__content__stats__component">
              <img src="/assets/img/scooter-small-1.png" alt="scooter" class="scooterItem__img-small">
              <span class="scooterItem__number number-blue" id="scootersBlue">START</span>
            </div>
          </div>
  `;

  scootersArea[0].insertAdjacentHTML("afterbegin", html);
  
$("#scootersRed")[0].childNodes[0].textContent = "FINISH";
              $("#scootersBlue")[0].childNodes[0].textContent = "FINISH";
              $("#scootersGreen")[0].childNodes[0].textContent = "FINISH";
              $("#totalScooters")[0].childNodes[0].textContent = "FINISH";