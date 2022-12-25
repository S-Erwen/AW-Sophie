let api = "http://localhost:5678/api";

function log_err() {
	var err = document.createElement("a");

	if (document.getElementById("err")) return ;

	err.setAttribute("id", "err");
	err.innerHTML = `Erreur dans l'identifiant ou le mot de passe`;
	document.getElementById("main").appendChild(err);
	document.getElementById("email").style.border = "1px solid red";
	document.getElementById("password").style.border = "1px solid red";

	return (null);
}

async function log_res(res) {
	if (res.status != "200")
		return (log_err());
	console.log("CONNECTED");

	document.getElementById("log").textContent = "logout";
	// document.getElementById("log").value = "logout";

	var edit = document.createElement("div");

	// edit.setAttribute("id", "edit");
	// edit.innerHTML = `<img crossorigin="anonymous" src="/assets/icons/icon-edit.png">\
	// 	<p>Mode édition</p><button id="save" type="submit">publier les changements</button>`;
	// console.log(document.getElementById("header"));
	// document.getElementById("header").appendChild(edit);
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
