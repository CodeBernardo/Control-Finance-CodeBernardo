import { createNewValue, handleTotalValueDisplay, verifyStorage } from "./index.js";
import { renderValues } from "./render.js";

export const handleModal = () => {
  const modalcontroler = document.querySelector(".modal__controler");
  const regiterValueBtn = document.querySelector(".add__valueBtn");
  const cancelBtn = document.querySelector(".cancelBtn");
  const submitValue = document.querySelector("#submitBtn");

  regiterValueBtn.addEventListener("click", () => {
    modalcontroler.showModal();
  });

  cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    modalcontroler.close();
  });

  submitValue.addEventListener("click", (event) => {
    event.preventDefault();
    createNewValue();
    const valuesList = JSON.parse(
      localStorage.getItem("@controlFinance:valuesList")
    );
    renderValues(valuesList);
  handleTotalValueDisplay(JSON.parse(localStorage.getItem("@controlFinance:valuesList"))
)
    modalcontroler.close();
  });
};

export const handleResetListModal = () => {
  const modalcontroler = document.querySelector(".modal__controler--reset");
  const resetBtn = document.querySelector(".resetList__Btn");
  const cancelReset = document.querySelector(".cancel__button");
  const confirmReset = document.querySelector(".confirm__button");

  resetBtn.addEventListener("click", () => {
    modalcontroler.showModal();
  });

  cancelReset.addEventListener("click", () => {
    modalcontroler.close();
  });

  confirmReset.addEventListener("click", () => {
    localStorage.setItem("@controlFinance:valuesList", JSON.stringify([]));
    verifyStorage();
    handleTotalValueDisplay(
      JSON.parse(localStorage.getItem("@controlFinance:valuesList"))
    );
    modalcontroler.close();
    toast("Todos os valores foram apagados!", green);
    modalcontroler.close();
  });
};