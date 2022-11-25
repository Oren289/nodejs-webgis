const myAccountPill = document.getElementById("my-account-pill");
const myAccountCard = document.getElementById("my-account-card");

const myAddressPill = document.getElementById("my-address-pill");
const myAddressCard = document.getElementById("my-address-card");

const changePasswordPill = document.getElementById("change-password-pill");
const changePasswordCard = document.getElementById("change-password-card");

myAccountPill.addEventListener("click", (e) => {
  e.preventDefault;

  myAccountPill.classList.remove("active-pill");
  myAddressPill.classList.remove("active-pill");
  changePasswordPill.classList.remove("active-pill");
  myAccountPill.classList.add("active-pill");

  myAccountCard.classList.remove("d-none");
  myAddressCard.classList.remove("d-none");
  changePasswordCard.classList.remove("d-none");
  myAddressCard.classList.add("d-none");
  changePasswordCard.classList.add("d-none");
});

myAddressPill.addEventListener("click", (e) => {
  e.preventDefault;

  myAccountPill.classList.remove("active-pill");
  myAddressPill.classList.remove("active-pill");
  changePasswordPill.classList.remove("active-pill");
  myAddressPill.classList.add("active-pill");

  myAccountCard.classList.remove("d-none");
  myAddressCard.classList.remove("d-none");
  changePasswordCard.classList.remove("d-none");
  myAccountCard.classList.add("d-none");
  changePasswordCard.classList.add("d-none");
});

changePasswordPill.addEventListener("click", (e) => {
  e.preventDefault;

  myAccountPill.classList.remove("active-pill");
  myAddressPill.classList.remove("active-pill");
  changePasswordPill.classList.remove("active-pill");
  changePasswordPill.classList.add("active-pill");

  myAccountCard.classList.remove("d-none");
  myAddressCard.classList.remove("d-none");
  changePasswordCard.classList.remove("d-none");
  myAddressCard.classList.add("d-none");
  myAccountCard.classList.add("d-none");
});
