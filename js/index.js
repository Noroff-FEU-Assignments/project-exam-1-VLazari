const carousel = document.querySelector(".posts");
const post = document.querySelector(".post");
const next = document.querySelector(".fa-circle-chevron-right");
const prev = document.querySelector(".fa-circle-chevron-left");
const popularPosts = document.querySelector(".popular-posts");
const loader = document.querySelector(".loader");

let gap = 20;
let url = "https://myprojects.digital/GourmetFood/wp-json/wp/v2/posts";
let windowWidth = window.innerWidth;

//---> Building carousel
//---> Calculating the number of posts that fit the current screen size
let nrOfPostsDisplayed = Math.floor(carousel.offsetWidth / (post.offsetWidth + gap));
//---> Calculating  the scrolling width
let width = post.offsetWidth * nrOfPostsDisplayed;

gap *= nrOfPostsDisplayed;

carousel.innerHTML = "";

next.addEventListener("click", (e) => {
	carousel.scrollBy(width + gap, 0);
	prev.style.opacity = "70%";
	if (carousel.scrollWidth - width - gap <= carousel.scrollLeft + width) {
		next.style.opacity = "10%";
	}
});

prev.addEventListener("click", (e) => {
	carousel.scrollBy(-(width + gap), 0);
	if (carousel.scrollLeft - width - gap <= 0) {
		prev.style.opacity = "10%";
	}
	next.style.opacity = "70%";
});

window.onresize = function () {
	if (windowWidth != window.innerWidth) {
		location.reload();
	}
};

function postsDisplay(container, object, iteration) {
	container.innerHTML += `<a href="post.html?id=${object[iteration].id}" class="post">
                <div style="background-image: url(${object[iteration].image_src})" class="post-image"></div>
                <h3 class="post-title">${object[iteration].title.rendered}</h3>
                ${object[iteration].excerpt.rendered}
                <p class="post-date">Date posted: ${object[iteration].date}</p>
								</a>`;
}

async function getPosts() {
	try {
		const request = await fetch(url);
		const posts = await request.json();
		loader.style.display = "none";
		const nrPostsInCarousel = 8;
		for (let i = 0; i < nrPostsInCarousel; i++) {
			postsDisplay(carousel, posts, i);
		}

		for (let i = posts.length - 1; i > posts.length - 5; i--) {
			postsDisplay(popularPosts, posts, i);
		}
	} catch (error) {
		postName.innerHTML = "There is a server problem, please try again later";
	}
}
getPosts();
