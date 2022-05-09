//--- Responsive menubar

const nav = document.querySelector(".navigation"),
	menu = document.querySelector(".fa-bars"),
	burgerMenu = document.querySelector(".mobile-menu"),
	search = document.querySelector(".search-icon"),
	searchIcon = document.querySelector(".fa-magnifying-glass"),
	searchPanel = document.querySelector(".search-container");

burgerMenu.addEventListener("click", (e) => {
	nav.classList.toggle("navigation-active");
	menu.classList.toggle("fa-times");
});

search.addEventListener("click", (e) => {
	searchPanel.classList.toggle("search-container-on");
	searchIcon.style.display = "none";
});

window.addEventListener("click", (e) => {
	if (!searchPanel.contains(e.target) && !search.contains(e.target)) {
		searchPanel.classList = "search-container";
		searchIcon.style.display = "flex";
	}
});
