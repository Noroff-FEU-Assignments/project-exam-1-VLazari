//--- Responsive menubar

const nav = document.querySelector(".navigation");
const menu = document.querySelector(".fa-bars");
const burgerMenu = document.querySelector(".mobile-menu");
const search = document.querySelector(".search-icon");
const searchIcon = document.querySelector(".fa-magnifying-glass");
const searchPanel = document.querySelector(".search-container");
const searchBtn = document.querySelector("#search-button");
const searchTerms = document.querySelector(".search");
const url = "http://localhost:8888/gourmet/wp-json/wp/v2/posts";

burgerMenu.addEventListener("click", (e) => {
	nav.classList.toggle("navigation-active");
	menu.classList.toggle("fa-times");
});

search.addEventListener("click", (e) => {
	searchPanel.classList.toggle("search-container-on");
	searchTerms.value = "";
	searchTerms.placeholder = "Search for a recipes...";
	searchIcon.style.display = "none";
});

window.addEventListener("click", (e) => {
	if (!searchPanel.contains(e.target) && !search.contains(e.target)) {
		searchPanel.classList = "search-container";
		searchIcon.style.display = "flex";
	}
});

// --- Searching and redirecting to search page

searchBtn.addEventListener("click", (e) => {
	let searchFor = searchTerms.value.trim();
	if (searchFor === "") {
		searchTerms.placeholder = "Add a search keyword, please";
	} else {
		createSearchStr(searchFor);
	}
});

function createSearchStr(str) {
	for (let i = 0; i < str.length; i++) {
		str = str.replaceAll("  ", " ");
	}
	window.location.href = `posts.html?search=${str}`;
}
