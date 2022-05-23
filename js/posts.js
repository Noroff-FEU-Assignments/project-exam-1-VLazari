const allPosts = document.querySelector(".posts-display");
const nextPage = document.querySelector("#next-page");
const header = document.querySelector(".h2-header");
const loader = document.querySelector(".loader");

const urlString = window.location.search;
const urlParam = new URLSearchParams(urlString);
let search = urlParam.get("search");

let nrOfPages = 1;
let currentPage = 1;

let url = "https://myprojects.digital/GourmetFood/wp-json/wp/v2/posts";

if (search) {
	search = search.replaceAll(" ", "+");
	url = url + `?search=${search}`;
	header.innerHTML = "Search results";
}

async function getPosts() {
	try {
		const request = await fetch(url);
		const posts = await request.json();
		loader.style.display = "none";

		if (posts.length === 0) {
			header.innerHTML = "Unfortunately we don't have any recipe that matches your request";
			nextPage.style.display = "none";
		} else {
			posts.forEach((e) => {
				postsDisplay(e, allPosts);
			});

			nrOfPages = parseInt(request.headers.get("X-WP-TotalPages"));
			if (currentPage === nrOfPages) {
				nextPage.style.display = "none";
			}
		}
	} catch (error) {
		header.innerHTML = "There was an error, please try again later";
	}
}
getPosts();

function postsDisplay(object, container) {
	container.innerHTML += `<a href="post.html?id=${object.id}"  class="post">
                      <div style="background-image: url(${object.image_src})" class="post-image"></div>
                      <h3 class="post-title">${object.title.rendered}</h3>
                      ${object.excerpt.rendered}
                      <p class="post-date">Date posted: ${object.date}</p>
                    </a>`;
}

nextPage.addEventListener("click", (e) => {
	currentPage++;
	url = `https://myprojects.digital/GourmetFood/wp-json/wp/v2/posts?page=${currentPage}`;
	getPosts();
});
