import { checkLength, formValidation } from "./contact.js";

const postHeader = document.querySelector(".post-header");
const location = document.querySelector(".current-location");
const postName = document.querySelector(".h2-header");
const recipe = document.querySelector(".recipe");
const title = document.querySelector("title");
const comments = document.querySelector(".comments");
const userMail = document.querySelector("#email");
const addMessage = document.querySelector(".add-message");
const userName = document.querySelector("#name");
const userNameError = document.querySelector("#name-error");
const message = document.querySelector("#message");
const messageError = document.querySelector("#message-error");
const modalContainer = document.querySelector(".modal-container");
const modalImg = document.querySelector("#modal-image");
const loader = document.querySelector(".loader");

const urlString = window.location.search;
const urlParam = new URLSearchParams(urlString);
const postId = parseInt(urlParam.get("id"));

const url = "http://localhost:5555/gourmet/wp-json/wp/v2/posts/" + postId;
const urlComment = "http://localhost:5555/gourmet/wp-json/wp/v2/comments?post=" + postId;

async function postDetails() {
	try {
		const request = await fetch(url);
		const post = await request.json();
		loader.style.display = "none";

		postDisplay(post);
	} catch (error) {
		postName.innerHTML = "There is a server problem, please try again later";
	}
}
postDetails();

async function postComments() {
	const request = await fetch(urlComment);
	const comm = await request.json();
	if (comm.length) {
		comm.forEach((e) => {
			comments.innerHTML += `<h6>${e.author_name}</h6>
		${e.content.rendered}<hr/>`;
		});
	}
}
postComments();

function postDisplay(object) {
	location.innerHTML += object.title.rendered;
	title.innerHTML += object.title.rendered;
	postName.innerHTML = object.title.rendered;
	postHeader.innerHTML = `<div id="single-post" style="background-image: url(${object.image_src})" class="post-image"></div>`;
	recipe.innerHTML = object.content.rendered;
	const mainImg = document.querySelector("#single-post");
	const postImg = document.querySelectorAll("img");

	mainImg.addEventListener("click", function (e) {
		modalContainer.style.display = "flex";
		modalImg.src = `${object.image_src}`;
	});

	postImg.forEach((image) => {
		image.addEventListener("click", function (e) {
			modalContainer.style.display = "flex";
			modalImg.src = `${image.src}`;
		});
	});

	modalContainer.addEventListener("click", function (e) {
		if (!modalImg.contains(e.target)) {
			modalContainer.style.display = "none";
		}
	});
}

async function addComment(url) {
	const request = await fetch(url, { method: "POST" });
}

addMessage.addEventListener("submit", function (e) {
	e.preventDefault();
	formValidation(userName, userNameError, 2);
	formValidation(message, messageError, 2);
	if (formValidation(userName, userNameError, 2) && formValidation(message, messageError, 2) === true) {
		let commentUrl = `http://localhost:5555/gourmet/wp-json/wp/v2/comments?post=${postId}&content=${message.value}&author_name=${userName.value}&author_email=${userMail.value}`;
		addComment(commentUrl);
		window.location.reload();
	}
});
