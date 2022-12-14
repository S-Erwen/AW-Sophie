let api = "http://localhost:5678/api";

function set_categories(data_cat) {
	var lenght = Object.keys(data_cat).length;
	var filter = [lenght];
	var data_gallery = f_work(0);
	let name;

	if (!lenght)
		console.log("NO DATA_CAT");
	for (let i = 0; i < lenght + 1; i++) {
		filter[i] = document.createElement("button");
		if (!i)
			name = "Tous";
		else
			name = data_cat[i - 1].name;
		filter[i].classList.add(name.replaceAll(' ', '_'));
		filter[i].innerHTML = name;
		filter[i].onclick = function () {
			if (data_gallery) {
				data_gallery.then((data_g) => {
					for (let i = 0; data_g[i]; i++)
						data_g[i].remove();
					data_g = [];
				});
				data_gallery = f_work(i);
			}
		};
		document.getElementById("filter").appendChild(filter[i]);
	}
}

function set_works(data_work, id) {
	var lenght = Object.keys(data_work).length;
	var gallery = [lenght];

	if (!lenght)
		console.log("NO DATA_WORK");
	let y = 0;
	for (let i = 0; i < lenght; i++) {
		if (id == data_work[i].categoryId || !id) {
			gallery[y] = document.createElement("figure");
			gallery[y].imageUrl = data_work[i].imageUrl;
			gallery[y].title = data_work[i].title;

			gallery[y].innerHTML = `<img crossorigin="anonymous" src="${gallery[y].imageUrl}" alt="${gallery[y].title}"><figcaption>${gallery[y].title}</figcaption>`;
			document.getElementById("gallery").appendChild(gallery[y]);
			y++;
		}
	}
	return (gallery);
}

fetch(api + '/categories')
	.then(res => {
		if (res.ok) {
			res.json().then(data_cat => {
				set_categories(data_cat);
			})
		} else {
			console.log("ERROR_CAT");
		}
	})

function f_work(id) {
	return fetch(api + '/works')
		.then(res => {
			if (res.ok) {
				return res.json().then(data_work => {
					return (set_works(data_work, id));
				})
			} else {
				console.log("ERROR_WORKS");
				return (0);
			}
		})
	}
