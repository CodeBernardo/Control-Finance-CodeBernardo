import { handleTotalValueDisplay, verifyStorage } from "./index.js";
import { green, toast } from "./toast.js";

export const creatValueCard = (data) => {
  const listItem = document.createElement("li");
  listItem.classList.add("value__item");

  const valueText = document.createElement("p");
  valueText.classList.add("text1-b");
  valueText.innerText = `R$ ${parseFloat(data.value).toFixed(2)}`;

  const buttonContainer = document.createElement("div");

  const valueType = document.createElement("p");
  valueType.classList.add("text1-r", "value__type");

  if (data.typeOfValue === "credit") {
    valueType.innerText = "Entrada";
  } else if (data.typeOfValue === "debit") {
    valueType.innerText = "Saida";
  }

  const trashButton = document.createElement("button");
  trashButton.classList.add("trash__button", "btn--outline");
  trashButton.id = data.id;

  trashButton.addEventListener("click", () => {
    const valuesList = JSON.parse(
      localStorage.getItem("@controlFinance:valuesList")
    );
    const valueFound = valuesList.findIndex(
      (value) => value.id == trashButton.id
    );
    valuesList.splice(valueFound, 1);
    localStorage.setItem(
      "@controlFinance:valuesList",
      JSON.stringify(valuesList)
    );
    const newValuesList = JSON.parse(
      localStorage.getItem("@controlFinance:valuesList")
    );
    renderValues(newValuesList);
    verifyStorage();
    handleTotalValueDisplay(JSON.parse(localStorage.getItem("@controlFinance:valuesList"))
    )
    toast("Valor detelado com sucesso!", green);
  });

  const trashIcon = document.createElement("i");
  trashIcon.classList.add("fa-solid", "fa-trash", "trash__icon");

  trashButton.append(trashIcon);
  buttonContainer.append(valueType, trashButton);
  listItem.append(valueText, buttonContainer);

  return listItem;
};

export const renderValues = (dataArray) => {
  const valuesList = document.querySelector(".values__list__container");
  valuesList.innerHTML = "";
  dataArray.forEach((data) => {
    const valueCard = creatValueCard(data);
    valuesList.append(valueCard);
  });
  return valuesList;
};

export const renderEmptyList = () => {
  const valuesListContainer = document.querySelector(
    ".values__list__container"
  );
  valuesListContainer.innerHTML = "";

  const list = document.querySelector(".values__list__container");

  const blankItem = document.createElement("li");
  blankItem.classList.add("blank__List");

  const blankItemTitle = document.createElement("h2");
  blankItemTitle.classList.add("title2-m");
  blankItemTitle.innerText = "Nenhum valor cadastrado";

  const blankItemDescription = document.createElement("p");
  blankItemDescription.classList.add("text1-r");
  blankItemDescription.innerText = "Registar novo valor";

  blankItem.append(blankItemTitle, blankItemDescription);
  list.append(blankItem);
};
