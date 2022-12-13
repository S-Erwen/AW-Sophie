// function set_figure(img_src, alt)
// {
// 	let figure = document.createElement('figure');
// 	figure.innerHTML = "<img src=" + img_src + " alt=" + alt + ">" + "<figcaption>" + alt.replace('"', '') + "</figcaption>";
// }

let api = "http://localhost:5678/api";

function press_check_cat(p_work, id) {
	p_work.then((data) => {
		var lenght = Object.keys(data).length;
		var gallery = [lenght];

		for (let i = 0; data[i]; i++) {
			if (data[i])
				data[i].remove();
			// if (gallery[i])
			// 	gallery[i].remove();
		}
		for (let i = 0; data[i]; i++) {
			console.log("ID = " + id);
			console.log("DATA CID = " + data[i].categoryId);
			if (id == data[i].categoryId) {
				gallery[i] = document.createElement("figure");
				gallery[i].innerHTML = `<img crossorigin="anonymous" src="${data[i].imageUrl}" alt="${data[i].title}"><figcaption>${data[i].title}</figcaption>`;
			
				document.getElementById("gallery").appendChild(gallery[i]);
			}
		}
		});

}

function set_categories(data) {
	var lenght = Object.keys(data).length;
	var filter = [lenght];

	var p_work = f_work(0);
	if (!lenght)
		console.log("NO DATA_CAT");

	for (let i = 0; i < lenght; i++) {
		filter[i] = document.createElement("button");

		let name = data[i].name;
	
		filter[i].classList.add(name.replaceAll(' ', '_'));
		filter[i].innerHTML = name;
		filter[i].onclick = function () {press_check_cat(p_work, i + 1)};

		document.getElementById("filter").appendChild(filter[i]);
	}
}

function set_works(data, id) {
	var lenght = Object.keys(data).length;
	var gallery = [lenght];

	if (!lenght)
		console.log("NO DATA_WORK");

	for (let i = 0; i < lenght; i++) {
		if (id == data[i].categoryId || !id) {
			gallery[i] = document.createElement("figure");
			gallery[i].innerHTML = `<img crossorigin="anonymous" src="${data[i].imageUrl}" alt="${data[i].title}"><figcaption>${data[i].title}</figcaption>`;
			document.getElementById("gallery").appendChild(gallery[i]);

			gallery[i].categoryId = data[i].categoryId;
			gallery[i].imageUrl = data[i].imageUrl;
			gallery[i].title = data[i].title;
		}
	}
	return (gallery);
}

fetch(api + '/categories')
	.then(res => {
		if (res.ok) {
			res.json().then(data => {
				set_categories(data);
			})
		} else {
			console.log("ERROR_CAT");
		}
	})

function f_work(id) {
	return fetch(api + '/works')
		.then(res => {
			if (res.ok) {
				return res.json().then(data => {
					return (set_works(data, id));
				})
			} else {
				console.log("ERROR_WORKS");
				return (0);
			}
		})
	}
// function filter(button)
// {
// 	button
// }