const post = document.querySelector(".wppost");

async function addPost() {
	const respons = await fetch("http://localhost:8888/gourmet/wp-json/wp/v2/posts/6");
	const json = await respons.json();
	console.log(json.content.rendered);
	post.innerHTML = json.content.rendered;
}
addPost();
