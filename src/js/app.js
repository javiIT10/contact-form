/* ======================================================================
                            VARIABLES
====================================================================== */

const data = {
  firstName: "",
  lastName: "",
  email: "",
  query: "",
  message: "",
  consent: false,
};

const inputFirstName = document.querySelector("#firstName");
const inputLastName = document.querySelector("#lastName");
const inputEmail = document.querySelector("#email");
const inputMessage = document.querySelector("#message");
const querySibling = document.querySelector("#querySibling");
const btnsQuerys = document.querySelectorAll(".btnRadio");
const checkConsent = document.querySelector("#checkConsent");
const btnSubmit = document.querySelector('[type="submit"]');
const modal = document.querySelector("#modal");
const form = document.querySelector("#form");

/* ======================================================================
                            EVENT LISTENERS
====================================================================== */

btnsQuerys.forEach((btnQuery) => {
  btnQuery.addEventListener("click", function (e) {
    // Remover clase active
    removeActive();

    // Eliminar alerta si existe
    cleanAlert(querySibling);

    // Agregar active
    e.target.parentElement.classList.add("check-active");
    data.query = e.target.parentElement.textContent.trim();
  });
});

checkConsent.addEventListener("click", function (e) {
  const alert = e.target.parentElement.querySelector(".error");

  if (alert) {
    alert.remove();
  }
  data.consent = true;
  e.target.disabled = true;
});

inputFirstName.addEventListener("input", validate);
inputLastName.addEventListener("input", validate);
inputEmail.addEventListener("input", validate);
inputMessage.addEventListener("input", validate);

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();

  if (data.firstName === "") {
    showAlert(inputFirstName, "This field is required");
  } else if (data.lastName === "") {
    showAlert(inputLastName, "This field is required");
  } else if (data.email === "") {
    showAlert(inputEmail, "This field is required");
  } else if (data.query === "") {
    showAlert(querySibling, "Please selected a Query Type");
  } else if (data.message === "") {
    showAlert(inputMessage, "This field is required");
  } else if (data.consent === false) {
    showAlert(
      checkConsent,
      "To submit this form, please consent to being contacted"
    );
  } else {
    showSuccess();
  }
});

/* ======================================================================
                            FUNCIONES
====================================================================== */

function validate(e) {
  if (e.target.value.trim() === "") {
    showAlert(e.target, "This field is required");
    data[e.target.name] = "";
    return;
  }

  if (e.target.id === "email" && !validarEmail(e.target.value)) {
    showAlert(e.target, "Please enter a valid email");
    data[e.target.name] = "";
    return;
  }

  cleanAlert(e.target);

  // Asignar los valores
  data[e.target.name] = e.target.value.trim().toLowerCase();
}

function showAlert(reference, message) {
  // Limpiar alerta
  cleanAlert(reference);
  // Generar alerta en HTML
  const error = document.createElement("P");
  error.textContent = message;
  error.classList.add("error");

  // Inyectar el error al formulario
  reference.classList.add("focus:border-red", "border-red");
  reference.parentElement.appendChild(error);
}

function cleanAlert(reference) {
  const alert = reference.parentElement.querySelector(".error");

  if (alert) {
    reference.classList.remove("focus:border-red", "border-red");
    alert.remove();
  }
}

function removeActive() {
  btnsQuerys.forEach((btn) => {
    btn.parentElement.classList.remove("check-active");
  });
}

function showSuccess() {
  modal.classList.remove("-translate-y-[1000px]");
  data.firstName = "";
  data.lastName = "";
  data.email = "";
  data.query = "";
  data.message = "";
  data.consent = false;
  checkConsent.disabled = false;
  removeActive();
  form.reset();

  setTimeout(() => {
    modal.classList.add("-translate-y-[1000px]");
  }, 5000);
}

function validarEmail(email) {
  const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const resultado = regex.test(email);
  return resultado;
}
