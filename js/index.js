const carousel = document.querySelector(".posts"),
	post = document.querySelector(".post"),
	next = document.querySelector(".fa-circle-chevron-right"),
	prev = document.querySelector(".fa-circle-chevron-left"),
	popularPosts = document.querySelector(".popular-posts");

let gap = 20,
	//---> Calculating the number of posts that fit the current screen size
	nrOfPostsDisplayed = Math.floor(carousel.offsetWidth / (post.offsetWidth + gap)),
	//---> Calculating  the scrolling width
	width = post.offsetWidth * nrOfPostsDisplayed,
	url = "http://localhost:8888/gourmet/wp-json/gposts/v1/posts";

//---> Building carousel

gap *= nrOfPostsDisplayed;

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

window.addEventListener("resize", (e) => {
	location.reload();
});

function postsDisplay(container, object, iteration) {
	container.innerHTML += `<div class="post">
                <div style="background-image: url(${object[iteration].featured_image})" class="post-image"></div>
                <h3 class="post-title">${object[iteration].title}</h3>
                <p class="description">${object[iteration].description}</p>
                <p class="post-date">Date posted: ${object[iteration].date}</p>
                </div>`;
}

async function getPosts() {
	const response = await fetch(url);
	const posts = await response.json();
	for (let i = 0; i < 8; i++) {
		postsDisplay(carousel, posts, i);
	}
	console.log(posts.length - 4);
	for (let i = posts.length - 1; i > posts.length - 5; i--) {
		postsDisplay(popularPosts, posts, i);
		console.log(post.length);
	}
	//console.log(posts);
}
getPosts();
