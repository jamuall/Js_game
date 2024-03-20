const numRows = 11;
const numCols = 11;
const grid = document.querySelector(".grid");
const gridElement = document.querySelector(".grid-element");

let currentElement = null;

const mapState = Array.from({ length: numRows }, () =>
  Array(numCols).fill(null)
);
let canPlaceItem = true;

function canPlaceGridAt(row, col) {
  for (let i = 0; i < currentElement.shape.length; i++) {
    for (let j = 0; j < currentElement.shape[i].length; j++) {
      if (currentElement.shape[i][j] === 1) {
        const targetRow = row + i;
        const targetCol = col + j;

        if (targetRow >= numRows || targetCol >= numCols) {
          return false;
        }

        if (
          mapState[targetRow][targetCol] !== null ||
          isMountain(targetRow, targetCol)
        ) {
          return false;
        }
        if (canPlaceItem == false) {
          return false;
        }
      }
    }
  }
  return true;
}

function isMountain(row, col) {
  return (
    (row === 1 && col === 1) ||
    (row === 3 && col === 8) ||
    (row === 5 && col === 3) ||
    (row === 8 && col === 9) ||
    (row === 9 && col === 5)
  );
}
let elapsedTime = 0;

function updateElapsedTime() {
  const elapsedTimeElement = document.getElementById("elapsed-time");
  elapsedTimeElement.textContent = `${elapsedTime}`;
}
function placeGridAt(row, col) {
  let centerRow = -1;
  let centerCol = -1;

  for (let i = 0; i < currentElement.shape.length; i++) {
    for (let j = 0; j < currentElement.shape[i].length; j++) {
      if (currentElement.shape[i][j] === 1) {
        centerRow = i;
        centerCol = j;
        break;
      }
    }
    if (centerRow !== -1) {
      break;
    }
  }

  if (centerRow !== -1 && centerCol !== -1) {
    const targetRow = row - centerRow;
    const targetCol = col - centerCol;

    if (canPlaceGridAt(targetRow, targetCol)) {
      for (let i = 0; i < currentElement.shape.length; i++) {
        for (let j = 0; j < currentElement.shape[i].length; j++) {
          if (currentElement.shape[i][j] === 1) {
            mapState[targetRow + i][targetCol + j] = currentElement.type;
          }
        }
      }

      elapsedTime += currentElement.time;

      updateSeasonAndTime();
      updateActiveSpans();
      updateMap();
      generateRandomElement();
      //calculatePoints(seasons[currentSeasonIndex]);
      return;
    }
  }
}

function updateMap() {
  grid.innerHTML = ""; // Clear the existing map

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const square = document.createElement("div");
      square.classList.add("map-square");
      square.setAttribute("data-row", i);
      square.setAttribute("data-col", j);

      if (isMountain(i, j)) {
        square.classList.add("mountain");
      }

      // Check if this square is part of the placed element
      if (mapState[i][j] !== null) {
        square.classList.add(mapState[i][j]);
      }

      // Attach a hover event listener to each map square
      square.addEventListener("mouseenter", function () {
        const isValidPlacement = canPlaceGridAt(i, j);
        square.classList.toggle("hover-green", isValidPlacement);
        square.classList.toggle("hover-red", !isValidPlacement);
      });

      square.addEventListener("mouseleave", function () {
        square.classList.remove("hover-green", "hover-red");
      });

      // Attach a click event listener to each map square
      square.addEventListener("click", function () {
        placeGridAt(i, j);
      });

      grid.appendChild(square);
    }
  }
}
function handleGridClick(row, col) {
  placeGridAt(row, col);
  //calculatePoints(seasons[currentSeasonIndex]);
}

// Update the map after a valid placement
function updateMapAfterPlacement() {
  updateMap();
  generateRandomElement();
}

// Initial map rendering
updateMap();

// Button event listeners
const rotateButton = document.getElementById("rotateButton");
rotateButton.addEventListener("click", function () {
  rotateGrid();
});

const flipButton = document.getElementById("flipButton");
flipButton.addEventListener("click", function () {
  flipGrid();
});

// Additional functions for rotating and flipping the current element's shape
function rotateGrid() {
  if (currentElement !== null) {
    currentElement.shape = currentElement.shape[0].map((_, index) =>
      currentElement.shape.map((row) => row[index]).reverse()
    );
    updateGridElement();
  }
}

function flipGrid() {
  if (currentElement !== null) {
    currentElement.shape = currentElement.shape.map((row) => row.reverse());
    updateGridElement();
  }
}

// Function to update the visual representation of the current element
function updateGridElement() {
  gridElement.innerHTML = ""; // Clear the existing grid

  for (let i = 0; i < currentElement.shape.length; i++) {
    for (let j = 0; j < currentElement.shape[i].length; j++) {
      const squareM = document.createElement("div");

      if (currentElement.shape[i][j] === 1) {
        squareM.classList.add(currentElement.type);
      }

      gridElement.appendChild(squareM);
    }
  }
}

// Function to handle the generation of a new random element
function generateRandomElement() {
  // Randomly select an element from the elements array
  currentElement = elements[Math.floor(Math.random() * elements.length)];

  // Set the time-value span content
  const timeValue = document.getElementById("time-value");
  timeValue.innerHTML = `${currentElement.time}`;

  // Display the element in the grid-element
  updateGridElement();

  const gridSquares = document.querySelectorAll(".map-square");
  gridSquares.forEach((square) => {
    square.addEventListener("click", function () {
      const row = parseInt(square.getAttribute("data-row"));
      const col = parseInt(square.getAttribute("data-col"));
      handleGridClick(row, col);
    });
  });
}

// Initial generation of a random element
generateRandomElement();

let currentSeasonIndex = 0;
let seasonChanged = false;
let totalElapsedTime = 0;
const bottomBox = document.querySelector(".bottom-box");

function updateSeasonAndTime() {
  const elapsedTimeSpan = document.getElementById("elapsed-time");

  if (elapsedTime > 6) {
    // Update the current season index
    //currentSeasonIndex = (currentSeasonIndex + 1) % seasons.length;
    currentSeasonIndex += 1;
    // Reset elapsed time to the remainder after season transition

    elapsedTime %= 7;

    seasonChanged = true;

    // Update points for the new season
    calculatePoints(seasons[currentSeasonIndex - 1]);

    // Update the UI for the new season
    updatePointsUI(seasons[currentSeasonIndex - 1]);
    //updateSeasonPointsUI(seasons[currentSeasonIndex - 1]);
    seasonChanged = false;
  }
  if (currentSeasonIndex >= 4) {
    finishGame();
  }

  elapsedTimeSpan.innerText = `${elapsedTime}`;

  const currentSeasonText = document.getElementById("current-season");
  currentSeasonText.innerText = `${seasons[currentSeasonIndex]}`;

  // Check for the end of the game
  // if (elapsedTime >= 28) {
  //   endGame();
  // }
}

function finishGame() {
  // Hide the bottom box and related elements
  const bottomBoxDivs = document.querySelectorAll(".bottom-box > div");
  bottomBoxDivs.forEach((div) => {
    div.style.display = "none";
  });

  const currentH3H3 = document.querySelectorAll(".current-h3 > h3");
  currentH3H3.forEach((div) => {
    div.style.display = "none";
  });
  canPlaceItem = false;
  // Create a "New Game" button
  const newGameButton = document.getElementById("new-game-button");
  const newGameDiv = document.querySelector(".new-game");
  newGameDiv.style.display = "block";
  newGameButton.addEventListener("click", startNewGame);
}
function startNewGame() {
  // Reload the page to start a new game
  location.reload();
}

function updateActiveSpans() {
  const currentSeason = seasons[currentSeasonIndex];

  // Get all the mission divs
  const missionDivs = document.querySelectorAll(".missions > div");

  // Hide all active spans initially
  missionDivs.forEach((div) => {
    const activeSpan = div.querySelector("#active");
    activeSpan.style.display = "none";
  });

  // Determine which active spans should be displayed based on the current season
  if (currentSeason === "Spring") {
    const missionA = document.querySelector(".mission-A #active");
    const missionB = document.querySelector(".mission-B #active");
    missionA.style.display = "block";
    missionB.style.display = "block";
  } else if (currentSeason === "Summer") {
    const missionB = document.querySelector(".mission-B #active");
    const missionC = document.querySelector(".mission-C #active");
    missionB.style.display = "block";
    missionC.style.display = "block";
  } else if (currentSeason === "Autumn") {
    const missionC = document.querySelector(".mission-C #active");
    const missionD = document.querySelector(".mission-D #active");
    missionC.style.display = "block";
    missionD.style.display = "block";
  } else if (currentSeason === "Winter") {
    const missionA = document.querySelector(".mission-A #active");
    const missionD = document.querySelector(".mission-D #active");
    missionA.style.display = "block";
    missionD.style.display = "block";
  }
}

const shuffledMissions = missions.basic.sort(() => Math.random() - 0.5);

// Assign each mission's background image URL and title to a mission A, B, C, D
const missionAssignments = ["A", "B", "C", "D"];

// Set background image URL and title for each mission
missionAssignments.forEach((assignment, index) => {
  const missionDiv = document.querySelector(`.mission-${assignment}`);

  missionDiv.style.backgroundImage = `url(${shuffledMissions[index].image})`;

  missionDiv.classList.add(shuffledMissions[index].title);
});

function calculateBorderlandsPoints() {
  let totalPoints = 0;

  for (let row = 0; row < numRows; row++) {
    if (isFullRow(row)) {
      totalPoints += 6;
    }
  }

  for (let col = 0; col < numCols; col++) {
    if (isFullColumn(col)) {
      totalPoints += 6;
    }
  }

  console.log("Borderlands");
  return totalPoints;
}

function isFullRow(row) {
  for (let col = 0; col < numCols; col++) {
    const element = grid.querySelector(
      `.map-square[data-row="${row}"][data-col="${col}"]`
    );

    if (
      !element ||
      (!element.classList.contains("town") &&
        !element.classList.contains("mountain") &&
        !element.classList.contains("forest") &&
        !element.classList.contains("water") &&
        !element.classList.contains("farm"))
    ) {
      return false;
    }
  }

  return true;
}

function isFullColumn(col) {
  for (let row = 0; row < numRows; row++) {
    const element = grid.querySelector(
      `.map-square[data-row="${row}"][data-col="${col}"]`
    );
    if (
      !element ||
      (!element.classList.contains("town") &&
        !element.classList.contains("mountain") &&
        !element.classList.contains("forest") &&
        !element.classList.contains("water") &&
        !element.classList.contains("farm"))
    ) {
      return false;
    }
  }
  return true;
}

function calculateSleepyValleyPoints() {
  let totalPoints = 0;

  for (let row = 0; row < numRows; row++) {
    if (hasThreeForests(row)) {
      totalPoints += 4;
    }
  }
  console.log("SleepyValley");
  return totalPoints;
}

function hasThreeForests(row) {
  let count = 0;
  for (let col = 0; col < numCols; col++) {
    const element = grid.querySelector(
      `.map-square[data-row="${row}"][data-col="${col}"]`
    );
    if (element.classList.contains("forest")) {
      count++;
    }
  }
  return count >= 3;
}

function calculateEdgeOfForestPoints() {
  let totalPoints = 0;

  for (let row = 0; row < numRows; row++) {
    const element = grid.querySelector(
      `.map-square[data-row="${row}"][data-col="${0}"]`
    );
    if (element.classList.contains("forest")) {
      totalPoints++;
    }
    const element2 = grid.querySelector(
      `.map-square[data-row="${row}"][data-col="${numCols - 1}"]`
    );
    if (
      element2.classList.contains("forest") &&
      row !== 0 &&
      row !== numRows - 1
    ) {
      // Ensure it's not a corner element
      totalPoints++;
    }
  }

  for (let col = 0; col < numCols; col++) {
    const element = grid.querySelector(
      `.map-square[data-row="${0}"][data-col="${col}"]`
    );
    if (
      element.classList.contains("forest") &&
      col !== 0 &&
      col !== numCols - 1
    ) {
      // Ensure it's not a corner element
      totalPoints++;
    }
    const element2 = grid.querySelector(
      `.map-square[data-row="${numRows - 1}"][data-col="${col}"]`
    );
    if (
      element2.classList.contains("forest") &&
      col !== 0 &&
      col !== numCols - 1
    ) {
      // Ensure it's not a corner element
      totalPoints++;
    }
  }
  console.log("EdgeOfForest");
  return totalPoints;
}

function calculateWateringPotatoesPoints() {
  let totalPoints = 0;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const element = grid.querySelector(
        `.map-square[data-row="${row}"][data-col="${col}"]`
      );
      if (element && element.classList.contains("water")) {
        if (isAdjacentToFarm(row, col)) {
          totalPoints += 2;
        }
      }
    }
  }
  console.log("WateringPotatoes");
  return totalPoints;
}

function isAdjacentToFarm(row, col) {
  return (
    isFarm(row - 1, col) ||
    isFarm(row + 1, col) ||
    isFarm(row, col - 1) ||
    isFarm(row, col + 1)
  );
}

function isFarm(row, col) {
  const element = grid.querySelector(
    `.map-square[data-row="${row}"][data-col="${col}"]`
  );
  if (
    element &&
    element.classList.contains("farm") &&
    row >= 0 &&
    col >= 0 &&
    col < numCols &&
    row < numRows
  ) {
    return true;
  }
  return false;
}

function calculateEncircledMountainPoints() {
  let totalPoints = 0;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (isMountain(row, col)) {
        const surroundings = [
          { row: row - 1, col: col }, // Top
          { row: row + 1, col: col }, // Bottom
          { row: row, col: col - 1 }, // Left
          { row: row, col: col + 1 }, // Right
        ];

        let isEncircled = true;

        for (const neighbor of surroundings) {
          const neighborElement = grid.querySelector(
            `.map-square[data-row="${neighbor.row}"][data-col="${neighbor.col}"]`
          );

          if (
            !neighborElement ||
            (!neighborElement.classList.contains("forest") &&
              !neighborElement.classList.contains("water") &&
              !neighborElement.classList.contains("farm") &&
              !neighborElement.classList.contains("town"))
          ) {
            isEncircled = false;
            break;
          }
        }

        if (isEncircled) {
          totalPoints++;
        }
      }
    }
  }

  console.log("EncircledMountain"); // Example usage
  console.log("Points for encircled mountains: " + totalPoints);
  return totalPoints;
}

function calculateLongestForestPoints() {
  let longestForestLength = 0;
  let currentForestLength = 0;

  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      const element = grid.querySelector(
        `.map-square[data-row="${row}"][data-col="${col}"]`
      );

      if (element && element.classList.contains("forest")) {
        currentForestLength++;
      } else {
        // Check if the current forest is longer than the previous longest forest
        longestForestLength = Math.max(
          longestForestLength,
          currentForestLength
        );
        currentForestLength = 0; // Reset the current forest length
      }
    }

    // Check after each column for the longest forest
    longestForestLength = Math.max(longestForestLength, currentForestLength);
    currentForestLength = 0; // Reset the current forest length
  }

  const totalPoints = longestForestLength * 2; // Two points for each field in the longest vertically uninterrupted continuous forest

  console.log("LongestForest");
  console.log(
    "Points for the longest vertically uninterrupted continuous forest: " +
      totalPoints
  );

  return totalPoints;
}

function calculateFarmWaterBalancePoints() {
  let totalPoints = 0;

  for (let col = 0; col < numCols; col++) {
    let farmCount = 0;
    let waterCount = 0;

    for (let row = 0; row < numRows; row++) {
      const element = grid.querySelector(
        `.map-square[data-row="${row}"][data-col="${col}"]`
      );

      if (element && element.classList.contains("farm")) {
        farmCount++;
      } else if (element && element.classList.contains("water")) {
        waterCount++;
      }
    }

    // Check if the column has at least one farm and one water field
    if (farmCount > 0 && waterCount > 0 && farmCount === waterCount) {
      totalPoints += 4;
    }
  }

  console.log("FarmWaterBalance");
  console.log(
    "Points for columns with the same number of farm and water fields: " +
      totalPoints
  );

  return totalPoints;
}

function collectMissionOrder() {
  const missionOrder = [];
  const missionDivs = document.querySelectorAll(".missions > div");

  missionDivs.forEach((div) => {
    const missionSpan = div.querySelector("span[id^='mission-span-']");
    if (missionSpan) {
      missionOrder.push(missionSpan.innerText.trim());
    }
  });

  return missionOrder;
}

let currentMissionOrder = collectMissionOrder();
console.log(currentMissionOrder);

function createFunctionArray() {
  const functionArray = [];

  currentMissionOrder.forEach((mission) => {
    const functionName = `calculate${mission}Points`;

    if (typeof window[functionName] === "function") {
      // Add the corresponding calculation function to the array
      functionArray.push(window[functionName]);
    } else {
      // Handle the case where the function is not found
      console.error(`Function ${functionName} not found.`);
    }
  });

  return functionArray;
}

// Initialize points as an object to store points for each mission
let points = {
  A: 0,
  B: 0,
  C: 0,
  D: 0,
};

// Initialize season points as an object to store points for each season
// let seasonPoints = {
//   Spring: 0,
//   Summer: 0,
//   Autumn: 0,
//   Winter: 0,
// };
let totalPoints = 0;
function updatePointsUI(currentSeason) {
  let mountainPoints = calculateEncircledMountainPoints();
  let springPoints = points.A + points.B;
  let summerPoints = points.B + points.C;
  let autumnPoints = points.C + points.D;
  let winterPoints = points.D + points.A + mountainPoints;

  switch (currentSeason) {
    case "Spring":
      document.getElementById("points-A").textContent = points.A;
      document.getElementById("points-B").textContent = points.B;
      document.getElementById("spring-point").textContent = springPoints;
      totalPoints += springPoints;
      document.getElementById("total-points").textContent = totalPoints;
      console.log("Spring");
      break;
    case "Summer":
      document.getElementById("points-B").textContent = points.B;
      document.getElementById("points-C").textContent = points.C;
      document.getElementById("summer-point").textContent = summerPoints;
      totalPoints += summerPoints;
      document.getElementById("total-points").textContent = totalPoints;
      console.log("Summer");
      break;
    case "Autumn":
      document.getElementById("points-C").textContent = points.C;
      document.getElementById("points-D").textContent = points.D;
      document.getElementById("autumn-point").textContent = autumnPoints;
      totalPoints += autumnPoints;
      document.getElementById("total-points").textContent = totalPoints;
      console.log("Autumn");
      break;
    case "Winter":
      document.getElementById("points-A").textContent = points.A;
      document.getElementById("points-D").textContent = points.D;
      document.getElementById("winter-point").textContent = winterPoints;
      totalPoints += winterPoints;
      document.getElementById("total-points").textContent = totalPoints;
      console.log("Winter");
      break;
  }
}

function calculatePoints(currentSeason) {
  const activeMissions = getActiveMissions(currentSeason);

  // Calculate points for each active mission
  activeMissions.forEach((mission) => {
    points[mission] += calculatePointsForMission(mission);
  });
  console.log("Calculate points " + currentSeason);
}
function getActiveMissions(currentSeason) {
  const seasonMissions = {
    Spring: ["A", "B"],
    Summer: ["B", "C"],
    Autumn: ["C", "D"],
    Winter: ["A", "D"],
  };

  return seasonMissions[currentSeason] || [];
}

function calculatePointsForMission(mission) {
  const missionElement = document.querySelector(`.mission-${mission}`);

  if (missionElement) {
    const missionName = missionElement.className;

    if (missionName.includes("Borderlands")) {
      console.log("called Borderlands");
      return calculateBorderlandsPoints();
    } else if (missionName.includes("EdgeOfForest")) {
      console.log("called EdgeOfForest");
      return calculateEdgeOfForestPoints();
    } else if (missionName.includes("SleepyValley")) {
      console.log("Called SleepyValley");
      return calculateSleepyValleyPoints();
    } else if (missionName.includes("WateringPotatoes")) {
      console.log("Called Watering Potatoes");
      return calculateWateringPotatoesPoints();
    } else if (missionName.includes("TreeLine")) {
      console.log("Called Tree Line");
      return calculateLongestForestPoints();
    } else if (missionName.includes("WateringCanal")) {
      console.log("Called Watering Canal");
      return calculateFarmWaterBalancePoints();
    } else if (missionName.includes("WealthyTown")) {
      console.log("Called Wealthy Town");
      return calculateWealthyTownPoints();
    } else if (missionName.includes("MagiciansValley")) {
      console.log("Called Magicians Valley");
      return calculateMagiciansValleyPoints();
    } else if (missionName.includes("EmptySite")) {
      console.log("Called Empty Site");
      return calculateEmptySitePoints();
    } else if (missionName.includes("RowOfHouse")) {
      console.log("Called Row of House");
      return calculateRowOfHousePoints();
    } else if (missionName.includes("OddNumberedSilos")) {
      console.log("Called Odd numbered silos");
      return calculateOddNumberedSilosPoints();
    } else if (missionName.includes("RichCountryside")) {
      console.log("Called Rich Countryside");
      return calculateRichCountrysidePoints();
    }
  }

  return 0;
}
function calculateRichCountrysidePoints() {
  let totalPoints = 0;

  for (let row = 0; row < numRows; row++) {
    const uniqueTerrainTypes = getUniqueTerrainTypesInRow(row);

    if (uniqueTerrainTypes.length >= 5) {
      totalPoints += 4;
    }
  }

  console.log("RichCountryside");
  console.log(
    "Points for rows with at least five different terrain types: " + totalPoints
  );

  return totalPoints;
}

function getUniqueTerrainTypesInRow(row) {
  const terrainTypes = new Set();

  for (let col = 0; col < numCols; col++) {
    const element = grid.querySelector(
      `.map-square[data-row="${row}"][data-col="${col}"]`
    );

    if (element) {
      terrainTypes.add(getTerrainType(element));
    }
  }

  return Array.from(terrainTypes);
}

function getTerrainType(element) {
  const terrainClasses = ["town", "mountain", "forest", "water", "farm"];

  for (const terrainClass of terrainClasses) {
    if (element.classList.contains(terrainClass)) {
      return terrainClass;
    }
  }

  return null;
}

function calculateOddNumberedSilosPoints() {
  let totalPoints = 0;

  for (let col = 0; col < numCols; col++) {
    if (col % 2 == 0 && isFullColumn(col)) {
      totalPoints += 10;
    }
  }

  console.log("OddNumberedSilos");
  console.log("Points for odd-numbered full columns: " + totalPoints);

  return totalPoints;
}

function calculateWealthyTownPoints() {
  let totalPoints = 0;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const isTown = isTownField(row, col);

      if (isTown) {
        const uniqueTerrainTypes = getUniqueAdjacentTerrainTypes(row, col);

        if (uniqueTerrainTypes.length >= 3) {
          totalPoints += 3;
        }
      }
    }
  }

  console.log("WealthyTown");
  console.log("Points for wealthy towns: " + totalPoints);

  return totalPoints;
}

function isTownField(row, col) {
  const element = grid.querySelector(
    `.map-square[data-row="${row}"][data-col="${col}"]`
  );
  return element && element.classList.contains("town");
}

function getUniqueAdjacentTerrainTypes(row, col) {
  const terrainTypes = new Set();

  const adjacentCoordinates = [
    { row: row - 1, col: col }, // Top
    { row: row + 1, col: col }, // Bottom
    { row: row, col: col - 1 }, // Left
    { row: row, col: col + 1 }, // Right
  ];

  for (const neighbor of adjacentCoordinates) {
    const element = grid.querySelector(
      `.map-square[data-row="${neighbor.row}"][data-col="${neighbor.col}"]`
    );

    if (element) {
      terrainTypes.add(getTerrainType(element));
    }
  }

  return Array.from(terrainTypes);
}

function getTerrainType(element) {
  const terrainClasses = ["town", "mountain", "forest", "water", "farm"];

  for (const terrainClass of terrainClasses) {
    if (element.classList.contains(terrainClass)) {
      return terrainClass;
    }
  }

  return null;
}

function calculateMagiciansValleyPoints() {
  let totalPoints = 0;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (isWaterField(row, col)) {
        const adjacentCoordinates = getAdjacentCoordinates(row, col);

        for (const neighbor of adjacentCoordinates) {
          if (isMountainField(neighbor.row, neighbor.col)) {
            totalPoints += 3;
            break; // Break out of the loop once a mountain is found
          }
        }
      }
    }
  }

  console.log("MagiciansValley");
  console.log("Points for Magicians Valley: " + totalPoints);

  return totalPoints;
}

function isWaterField(row, col) {
  const element = grid.querySelector(
    `.map-square[data-row="${row}"][data-col="${col}"]`
  );
  return element && element.classList.contains("water");
}

function isMountainField(row, col) {
  const element = grid.querySelector(
    `.map-square[data-row="${row}"][data-col="${col}"]`
  );
  return element && element.classList.contains("mountain");
}

function getAdjacentCoordinates(row, col) {
  return [
    { row: row - 1, col: col }, // Top
    { row: row + 1, col: col }, // Bottom
    { row: row, col: col - 1 }, // Left
    { row: row, col: col + 1 }, // Right
  ];
}

function calculateEmptySitePoints() {
  let totalPoints = 0;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (isTownField(row, col)) {
        const adjacentCoordinates = getAdjacentCoordinates(row, col);

        for (const neighbor of adjacentCoordinates) {
          if (isEmptyField(neighbor.row, neighbor.col)) {
            totalPoints += 2;
          }
        }
      }
    }
  }

  console.log("EmptySite");
  console.log("Points for Empty Site: " + totalPoints);

  return totalPoints;
}

function isTownField(row, col) {
  const element = grid.querySelector(
    `.map-square[data-row="${row}"][data-col="${col}"]`
  );
  return element && element.classList.contains("town");
}

function isEmptyField(row, col) {
  const element = grid.querySelector(
    `.map-square[data-row="${row}"][data-col="${col}"]`
  );
  return (
    element &&
    !element.classList.contains("town") &&
    !element.classList.contains("mountain") &&
    !element.classList.contains("forest") &&
    !element.classList.contains("water") &&
    !element.classList.contains("farm")
  );
}

function getAdjacentCoordinates(row, col) {
  return [
    { row: row - 1, col: col }, // Top
    { row: row + 1, col: col }, // Bottom
    { row: row, col: col - 1 }, // Left
    { row: row, col: col + 1 }, // Right
  ];
}

//
function calculateRowOfHousePoints() {
  let maxLength = 0;
  let currentLength = 0;
  let maxSequences = 0;

  // Find the length of the longest town sequence
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const isTown = isTownField(row, col);

      if (isTown) {
        currentLength++;

        if (col === numCols - 1 || !isTownField(row, col + 1)) {
          // Check if the current town sequence is longer than the previous longest
          if (currentLength > maxLength) {
            maxLength = currentLength;
            maxSequences = 1;
          } else if (currentLength === maxLength) {
            maxSequences++;
          }

          currentLength = 0; // Reset the current town length
        }
      }
    }
  }

  const totalPoints = maxLength * 2 * maxSequences;

  console.log("RowOfHouse");
  console.log("Points for Row of House: " + totalPoints);

  return totalPoints;
}

function isTownField(row, col) {
  const element = grid.querySelector(
    `.map-square[data-row="${row}"][data-col="${col}"]`
  );
  return element && element.classList.contains("town");
}
