/* Desenvolva sua lógica aqui */

import { handleFilters } from "./filter.js";
import { handleModal, handleResetListModal } from "./modal.js";
import { renderEmptyList, renderValues } from "./render.js";
import { green, red, toast } from "./toast.js";

export const verifyStorage = () => {
  if (!localStorage.getItem("@controlFinance:valuesList")) {
    localStorage.setItem("@controlFinance:valuesList", JSON.stringify([]));
    renderEmptyList();
  } else if (localStorage.getItem("@controlFinance:valuesList") === "[]") {
    renderEmptyList();
  } else {
    const valuesList = JSON.parse(
      localStorage.getItem("@controlFinance:valuesList")
    );
    renderValues(valuesList);
  }
};

export const createNewValue = () => {
  const inputs = document.querySelectorAll(".input");
  const valuesList = JSON.parse(
    localStorage.getItem("@controlFinance:valuesList")
  );
  const valueData = {};
  let counter = 0;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      counter++;
    } else {
      valueData[input.name] = input.value;
    }
  });

  if (counter !== 0) {
    toast("Preencha todos os campos!", red);
  } else {
    valuesList.push(valueData);

    valuesList.forEach((value, index) => {
      value.id = index;
    });

    inputs.forEach((input) => (input.value = ""));

    localStorage.setItem(
      "@controlFinance:valuesList",
      JSON.stringify(valuesList)
    );
    toast("Valor adicionado!", green);
  }
};

export const calculateTotalValue = (valuesList) => {
  const totalValue = valuesList.reduce((acc, cur) => {
    if (cur.typeOfValue === "credit") {
      return acc + Number(cur.value);
    } else if (cur.typeOfValue === "debit") {
      return acc - Number(cur.value);
    }
  }, 0);
  return totalValue.toFixed(2);
};

export const handleTotalValueDisplay = (valuesList) => {
  const totalValue = document.querySelector("#totalValue");
  const total = calculateTotalValue(valuesList);
  totalValue.innerText = `R$ ${total}`;

  if (total > 0) {
    totalValue.classList.add("positive");
    totalValue.classList.remove("negative");
  } else if (total < 0) {
    totalValue.classList.add("negative");
    totalValue.classList.remove("positive");
  } else {
    totalValue.classList.remove("negative");
    totalValue.classList.remove("positive");
  }
};

verifyStorage();
handleModal()
handleTotalValueDisplay(
  JSON.parse(localStorage.getItem("@controlFinance:valuesList"))
);
handleResetListModal()
handleFilters()