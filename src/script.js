const dataEl = document.querySelector(".data");
const resultEl = document.querySelector(".result__window");
let dataValuesAll = document.querySelectorAll(".data__value");
let dataWeightsAll = document.querySelectorAll(".data__weight");
const btnSubmit = document.getElementById("submit");
const btnAdd = document.getElementById("add");
const btnDelete = document.getElementById("delete");

class Data {
  dataArr = [];
  average;
  result;
  constructor() {
    this._createArr();
    this._calcAverage(this.dataArr);
    this._createResultString(this.average);
  }
  _createArr() {
    for (let i = 0; i < dataValuesAll.length; i++) {
      this.dataArr.push([
        Number(dataValuesAll[i].value),
        Number(dataWeightsAll[i].value),
      ]);
    }
    return;
  }
  _calcAverage(arr) {
    let numerator = 0;
    let denominator = 0;
    for (const [values, dataWeightsAll] of arr) {
      numerator += values * dataWeightsAll;
      denominator += dataWeightsAll;
    }
    this.average = numerator / denominator;
    return;
  }
  _createResultString(number) {
    const fixedNumber = number.toFixed(2);
    if (isNaN(number)) {
      this.result = "no data";
      return;
    }
    if (fixedNumber - Math.floor(fixedNumber) === 0) {
      this.result = number.toString();
      return;
    }
    this.result = fixedNumber;
    return;
  }
}

class App {
  #dates = [];
  #currentPosition = 0;
  #lastWeightIndex = 12;
  constructor() {
    btnSubmit.addEventListener("click", this._newData.bind(this));
    dataEl.addEventListener("focusin", this._getCurrentPosition.bind(this));
    document.addEventListener("click", this._resetPosision.bind(this));
    document.addEventListener("keydown", this._switchByArrows.bind(this));
    btnAdd.addEventListener("click", this._addRow.bind(this));
    btnDelete.addEventListener("click", this._deleteRow.bind(this));
  }
  _updateDataNodelists() {
    dataValuesAll = document.querySelectorAll(".data__value");
    dataWeightsAll = document.querySelectorAll(".data__weight");
    console.log(dataWeightsAll);
  }
  _newData() {
    const newData = new Data();
    this._displayOutput(newData.result);
    if (newData.result === "no data") {
      return;
    }
    this.#dates.push(newData);
    console.log(this.#dates);
    return;
  }
  _displayOutput(result) {
    resultEl.textContent = result;
  }
  _getCurrentPosition(e) {
    const focusedEl = e.target;
    const textLength = e.target.value.length;
    requestAnimationFrame(function () {
      if (e.target.tagName === "INPUT") {
        e.target.setSelectionRange(textLength, textLength);
      }
    });
    if (focusedEl.classList.contains("data__input")) {
      this.#currentPosition = Number(focusedEl?.dataset.id);
      return;
    }
    this.#currentPosition = 0;
  }
  _resetPosision(e) {
    if (!e.target.classList.contains("data__input")) this.#currentPosition = 0;
  }
  _switchByArrows(e) {
    const isOdd = this.#currentPosition % 2 !== 0;
    const isCursorStart = e.target.selectionStart;
    const isCursorEnd = e.target.selectionStart === e.target.value?.length;
    if (this.#currentPosition === 0) return;
    switch (e.key) {
      case "ArrowLeft":
        if (isOdd || isCursorStart) return;
        document
          .querySelector(`[data-id="${this.#currentPosition - 1}"]`)
          ?.focus();
        break;
      case "ArrowUp":
        document
          .querySelector(`[data-id="${this.#currentPosition - 2}"]`)
          ?.focus();
        break;
      case "ArrowRight":
        if (!isOdd || !isCursorEnd) return;
        document
          .querySelector(`[data-id="${this.#currentPosition + 1}"]`)
          ?.focus();
        break;
      case "ArrowDown":
        document
          .querySelector(`[data-id="${this.#currentPosition + 2}"]`)
          ?.focus();
        break;
      default:
        break;
    }
  }
  _addRow() {
    const lastIndex = this.#lastWeightIndex;
    dataWeightsAll[lastIndex / 2 - 1].closest(".data__row").insertAdjacentHTML(
      "afterend",
      `<div class="data__row">
      <div class="data__number">${lastIndex / 2 + 1}</div>
      <input type="text" data-id="${
        lastIndex + 1
      }" class="data__value data__input" />
      <input type="text" data-id="${
        lastIndex + 2
      }" class="data__weight data__input" />
    </div>`
    );
    this.#lastWeightIndex = lastIndex + 2;
    this._updateDataNodelists();
  }
  _deleteRow() {
    {
      console.log(this.#lastWeightIndex);
      const lastIndex = this.#lastWeightIndex;
      if (lastIndex === 4) {
        return;
      }
      dataWeightsAll[lastIndex / 2 - 1].closest(".data__row").remove();
      this.#lastWeightIndex = lastIndex - 2;
      this._updateDataNodelists();
    }
  }
}
const app = new App();

// dataEl.addEventListener("focusin", function (e) {
//   const focusedEl = e.target.closest(".data__input");
//   const id = Number(focusedEl.dataset.id);
//   console.log(id);
// });
// dataEl.addEventListener("click", function (e) {
//   console.log(e.target);
// });

// calcAverage([
//   [4, 1],
//   [4.5, 1],
//   [4.5, 0.5],
//   [4.5, 1.5],
//   [5, 0.8],
//   [5, 1.5],
//   [5, 1.5],
//   [2, 2],
//   [2, 1.5],
//   [2, 1.5],
// ]);
// switch (e.key) {
//   case "ArrowLeft":
//     console.log("left");
//     break;
//   case "ArrowUp":
//     console.log("up");
//     break;
//   case "ArrowRight":
//     console.log("ri");
//     break;
//   case "ArrowDown":
//     console.log("down");
//     break;

//   default:
//     break;
// }
