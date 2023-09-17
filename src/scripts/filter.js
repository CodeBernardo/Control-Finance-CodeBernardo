import { handleTotalValueDisplay } from "./index.js";
import { renderEmptyList, renderValues } from "./render.js";

export const handleFilters = () => {
  const listContainer = document.querySelector(".values__list__container");
  const allValues = document.querySelector("#allValues");
  const creditValues = document.querySelector("#creditValues");
  const debitValues = document.querySelector("#debitValues");

  allValues.addEventListener("click", () => {
    const valueslist = JSON.parse(
      localStorage.getItem("@controlFinance:valuesList")
    );
    listContainer.innerHTML = "";
    if (JSON.stringify(valueslist) === "[]") {
      renderEmptyList();
    } else {
      renderValues(valueslist);
      handleTotalValueDisplay(valueslist);
    }
  });

  creditValues.addEventListener("click", () => {
    const valueslist = JSON.parse(
      localStorage.getItem("@controlFinance:valuesList")
    );
    const filteredValues = valueslist.filter(
      (value) => value.typeOfValue === "credit"
    );
    listContainer.innerHTML = "";
    if (JSON.stringify(valueslist) === "[]") {
      renderEmptyList();
    } else {
      renderValues(filteredValues);
      handleTotalValueDisplay(filteredValues);
    }
  });

  debitValues.addEventListener("click", () => {
    const valueslist = JSON.parse(
      localStorage.getItem("@controlFinance:valuesList")
    );
    const filteredValues = valueslist.filter(
      (value) => value.typeOfValue === "debit"
    );
    listContainer.innerHTML = "";
    if (JSON.stringify(valueslist) === "[]") {
      renderEmptyList();
    } else {
      renderValues(filteredValues);
      handleTotalValueDisplay(filteredValues);
    }
  });
};