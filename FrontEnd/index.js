// function set_figure(img_src, alt)
// {
// 	let figure = document.createElement('figure');
// 	figure.innerHTML = "<img src=" + img_src + " alt=" + alt + ">" + "<figcaption>" + alt.replace('"', '') + "</figcaption>";
// }

function set_categories(data) {
	var lenght = Object.keys(data).length;
	var filter = [lenght];

	if (!lenght)
		console.log("NO DATA");

	for (let i = 0; i < lenght; i++) {
		filter[i] = document.createElement("button");

		let name = data[i].name;
	
		filter[i].classList.add(name.replaceAll(' ', '_'));
		filter[i].innerHTML = name;
		filter[i].onclick = function () {console.log("click test")};

		document.getElementById("filter").appendChild(filter[i]);
	}
}

function set_works(data) {
	var lenght = Object.keys(data).length;
	var gallery = [lenght];
	console.log(lenght);

	if (!lenght)
		console.log("NO DATA");

	for (let i = 0; i < lenght; i++) {
		gallery[i] = document.createElement("figure");

		let name = data[i].name;

		gallery[i].innerHTML = "<img src=" + data[i].imageUrl + " alt=\"" + data[i].title + "\"><figcaption>" + data[i].title + "</figcaption>"
		gallery[i].onclick = function () {window.open(data[i].imageUrl)};

		document.getElementById("gallery").appendChild(gallery[i]);
		console.log("i = " + i + "\nlenght = " + lenght);
	}
}

fetch('http://localhost:5678/api/categories')
	.then(res => {
		if (res.ok) {
			res.json().then(data => {
				set_categories(data);
			})
		} else {
			console.log("ERROR_CAT");
		}
	})

fetch('http://localhost:5678/api/works')
.then(res => {
	if (res.ok) {
		res.json().then(data => {
			set_works(data);
		})
	} else {
		console.log("ERROR_WORKS");
	}
})

// function filter(button)
// {
// 	button
// }