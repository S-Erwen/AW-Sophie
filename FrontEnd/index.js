let api = "http://localhost:5678/api";

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

	if (!lenght)
		console.log("NO DATA_CAT");
	for (let i = 0; i < lenght + 1; i++) {
		filter[i] = document.createElement("button");
		if (!i)
		{
			name = "Tous";
			filter[i].classList.add("set");
		}
		else
			name = data_cat[i - 1].name;
		filter[i].classList.add(name.replaceAll(' ', '_'));
		filter[i].innerHTML = name;
		filter[i].onclick = function () {
			set_color_cat(filter, i);
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
		console.log("NO_DATA_WORK");
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

function add_custom() {
	var edit = document.createElement("div");

	document.getElementById("header").style.marginTop = "100px";
	edit.setAttribute("id", "edit");
	edit.innerHTML = `<img crossorigin="anonymous" src="assets/icons/icon-edit.png">\
		<p>Mode édition</p><button id="save" type="submit">publier les changements</button>`;
	document.getElementById("header").insertBefore(edit, document.getElementById('title'));
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
	add_custom();
	return (res);
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
