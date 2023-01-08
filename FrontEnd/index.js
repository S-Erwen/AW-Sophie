let api = "http://localhost:5678/api";
var removeList = [];
// get cat and fitlers

function set_color_cat(filter, i) {
	let y = 0;
	for (; y < i; y++)
		filter[y].classList.remove("set");
	filter[y].classList.add("set");
	y++;
	for (; filter[y]; y++)
		filter[y].classList.remove("set");
}

function set_categories(data_cat) {
	var lenght = Object.keys(data_cat).length;
	var filter = [lenght];
	var data_gallery = f_work(0);
	let name;
	var option = document.createElement("select");

	option.setAttribute("id", "cat");
	option.setAttribute("name", "cat");
	if (!lenght)
		console.log("NO DATA_CAT");
	for (let i = 0; i < lenght + 1; i++) {
		filter[i] = document.createElement("button");
		if (!i)
		{
			name = "Tous";
			filter[i].classList.add("set");
			filter[i].setAttribute("id", "Tous");
		}
		else {
			name = data_cat[i - 1].name;
			option.innerHTML += `<option value="${name}">${name}</option>`;
		}
		filter[i].classList.add(name.replaceAll(' ', '_'));
		filter[i].innerHTML = name;
		filter[i].onclick = function () {
			set_color_cat(filter, i);
			if (data_gallery) {
				data_gallery.then((data_g) => {
					for (let i = 0; data_g[i]; i++)
						for (let y = 0; data_g[i][y]; y++)
							data_g[i][y].remove();
					data_g = [];
				});
				data_gallery = f_work(i);
			}
		};
		document.getElementById("filter").appendChild(filter[i]);
	}
	document.getElementById("option").appendChild(option);
}

function set_works(data_work, id) {
	var lenght = Object.keys(data_work).length;
	// var gallery = [lenght];
	var gallery = new Array(2);
	gallery[0] = new Array(lenght);
	gallery[1] = new Array(lenght);

	if (!lenght)
		console.log("NO_DATA_WORK");
	var y = 0;
	for (let i = 0; i < lenght; i++) {
		if (id == data_work[i].categoryId || !id) {
			gallery[0][y] = document.createElement("figure");
			gallery[0][y].imageUrl = data_work[i].imageUrl;
			gallery[0][y].title = data_work[i].title;
			gallery[0][y].innerHTML = `<img crossorigin="anonymous" src="${gallery[0][y].imageUrl}" alt="${gallery[0][y].title}"><figcaption>${gallery[0][y].title}</figcaption>`;
			document.getElementById("gallery").appendChild(gallery[0][y]);
			if (!id) {
				gallery[1][y] = gallery[0][y].cloneNode(true);
				gallery[1][y].innerHTML = `<img crossorigin="anonymous" class="trash" id="trash_${y}" src="./assets/icons/icons8-trash-can-48.png" alt="trash">\
				<img crossorigin="anonymous" class="pics" src="${gallery[0][y].imageUrl}" alt="${gallery[0][y].title}"><figcaption>éditer</figcaption>`;
				document.getElementById("picture").appendChild(gallery[1][y]);
				(function(y) {
					document.getElementById(`trash_${y}`).onclick = function() {
						console.log(gallery[0][y]);
						gallery[0][y].remove();
						gallery[1][y].remove();
						removeList.push(y);
					};
				})(y);
			}
			y++;
		}
	}
	document.getElementById("deletep").onclick = function() {
		removeList = [];
		for (let d = 0; d < lenght; d++) {
			removeList.push(d);
			gallery[0][d].remove();
			gallery[1][d].remove();
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

// =========== Put =========== //

function put_call(i) {
	if (i) {
		document.getElementById("index").style.display = "none";
		document.getElementById("login").style.display = "block";
		document.getElementById("logi").style.fontWeight = "600";
	} else {
		document.getElementById("index").style.display = "block";
		document.getElementById("login").style.display = "none";
		document.getElementById("email2").style.border = "none";
		document.getElementById("password").style.border = "none";
		document.getElementById("logi").style.fontWeight = "400";
		if (document.getElementById("err"))
			document.getElementById("err").remove();
	}
}

// ============================= //
// =========== LOGIN =========== //

function log_err() {
	var err = document.createElement("a");

	if (document.getElementById("err")) return ;

	err.setAttribute("id", "err");
	err.innerHTML = `Erreur dans l'identifiant ou le mot de passe`;
	document.getElementById("login").appendChild(err);
	document.getElementById("email2").style.border = "1px solid red";
	document.getElementById("password").style.border = "1px solid red";

	return (null);
}

function modal_p(res) {
	if (!res) {
		setTimeout(() => {
			window.location.href = "index.html";
		}, 5000)
		return (alert("NO TOKEN AVAILABLE"));
	}
	
	var modal = document.getElementById("modal");

	modal.showModal();
	document.getElementById('quit').addEventListener('click', () => {
		modal.close();
	})
}

function createMod(i, res) {

	let mod = document.createElement("div");
	let parentDiv;
	let el;
	
	if (!i) {
		parentDiv = document.getElementById("title_article").parentNode;
		el = 'title_article';
	} else if (i == 1) {
		parentDiv = document.getElementById("title_img");
		el = 'title_img';
	} else {
		parentDiv = document.getElementById("projets");
		el = 'projets';
		mod.onclick = function () {modal_p(res)}
	}

	mod.setAttribute("id", "modify");
	mod.setAttribute("class", `id_${i}`);
	mod.innerHTML = ` <img crossorigin="anonymous" src="assets/icons/icon-edit.png">\
		<p id="modif">modifier</p>`;

	if (!i)
		parentDiv.insertBefore(mod, document.getElementById(el));
	else
		parentDiv.appendChild(mod);
}

// setTimeout(() => {
// 	add_custom();
// 	}, 2000)

// add_custom();

function add_custom(res) {
	document.getElementById('Tous').click();
	document.getElementById('filter').style.display = 'none';
	document.getElementById('projets').style.marginBottom = '100px';

	let edit = document.createElement("div");

	document.getElementById("header").style.marginTop = "100px";
	edit.setAttribute("id", "edit");
	edit.innerHTML = `<img crossorigin="anonymous" src="assets/icons/icon-edit.png">\
		<p>Mode édition</p><button id="save" type="submit">publier les changements</button>`;
	document.getElementById("header").insertBefore(edit, document.getElementById('title'));

	edit.addEventListener('click', () => {
		// delete first
		console.log(removeList);
	})
	createMod(0, null);
	createMod(1, null);
	createMod(2, res);
}

async function log_res(res) {
	if (res.status != "200")
		return (log_err());
	console.log("CONNECTED");
	put_call(0);

	document.getElementById("logi").textContent = 'logout';
	document.getElementById("logi").onclick = function() {
		window.location.href = "index.html";
	}
	add_custom(res);
}

const log = document.getElementById('log');

log.addEventListener('submit', async (event) => {
	event.preventDefault();
	const info = new FormData(log);
	const payload = new URLSearchParams(info);

	fetch(api + '/users/login', {
		method: "POST",
		body: payload,
	})
		.then(res => {
			res.json();
			console.log(res);
			log_res(res);
		})
		.catch(error => console.error(error));
});

// email: sophie.bluel@test.tld
// password: S0phie
