const form = document.querySelector(".contact-form"),
	messageSend = document.querySelector(".form-submitted"),
	userName = document.querySelector("#name"),
	userNameError = document.querySelector("#name-error"),
	subject = document.querySelector("#subject"),
	subjectError = document.querySelector("#subject-error"),
	message = document.querySelector("#message"),
	messageError = document.querySelector("#message-error");

form.addEventListener("submit", function (e) {
	e.preventDefault();
	formValidation(userName, userNameError, 5);
	formValidation(subject, subjectError, 15);
	formValidation(message, messageError, 25);
	if (
		formValidation(userName, userNameError, 5) &&
		formValidation(subject, subjectError, 15) &&
		formValidation(message, messageError, 25) === true
	) {
		messageSend.style.display = "block";
		window.scrollTo(0, 0);
		form.reset();
	}
});

export function checkLength(value, len) {
	if (value.trim().length > len) {
		return true;
	} else {
		return false;
	}
}

export function formValidation(validateField, error, len) {
	if (checkLength(validateField.value, len) === true) {
		error.style.display = "none";
		return true;
	} else {
		error.style.display = "block";
		return false;
	}
}
