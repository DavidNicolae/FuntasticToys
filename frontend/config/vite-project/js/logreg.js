const mySubmitButton = document.querySelector('.submit-button');
const mySignIn = document.querySelector('.sign-in');
const mySignUp = document.querySelector('.sign-up');
const myFormSwitch = document.querySelector('.form-switch');
const myIcon = document.querySelector('.icon');
const myWrongPassAlert = document.querySelector('#wrong_pass_alert');
myWrongPassAlert.style.color = 'red';

let currForm = 'login';
const authPort = 5000;

const loginForm = `<form class="form-switch">
<div class="fullname">
	<input
		type="text"
		id="numecomplet"
		name="numecomplet"
		placeholder="Full Name"
		required
	/>
</div>
<div class="pass">
	<input
		type="text"
		id="password"
		name="password"
		placeholder="Password"
		required
	/>
</div>
<span id="wrong_pass_alert"></span>
<div>
	<button class=" cursor submit submit-button" type="submit">
		Log in
	</button>
</div>
</form>`;
const registerForm = `<form class="form-switch">
<div class="full-name">
	<input
		type="text"
		id="full-name"
		name="name"
		placeholder="Full Name"
		required
	/>
</div>
<div class="address">
	<input
		type="text"
		id="address"
		name="name"
		placeholder="Your Address"
		required
	/>
</div>
<div class="email">
	<input
		type="text"
		id="email"
		name="email"
		placeholder="Email"
		required
	/>
</div>
<div class="pass">
	<input
		type="text"
		id="password"
		name="password"
		placeholder="Password"
		required
	/>
	<input
		type="text"
		id="confirm-password"
		name="confirm-password"
		placeholder="Confirm Password"
		required
	/>
</div>
<span id="wrong_pass_alert"></span>
<div>
	<button class="cursor submit submit-button" type="submit">
		Register
	</button>
</div>
</form>`;
const iconForm = `<div class=" icon">
<div class="icon-text">Funtastic</div>
<img
	src="/src/imgs/icon.jpeg"
	id="icon"
	alt="User Icon"
/>
<div class="icon-text">Toys</div>
</div>`;

///// Functions
const switchActive = (activ, inactiv) => {
	if (!activ.classList.contains('active')) {
		activ.classList.remove('inactive');
		activ.classList.remove('underlineHover');
		activ.classList.add('active');
		inactiv.classList.remove('active');
		inactiv.classList.add('inactive');
		inactiv.classList.add('underlineHover');
	}
};
const validateEmail = (email) => {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
};
const validatePassword = (password) => {
	errors = [];
	if (password.length < 8) {
		errors.push('Parola dvs. trebuie să aibă cel puțin 8 caractere');
	}
	if (password.search(/[a-z]/i) < 0) {
		errors.push('Parola dvs. trebuie să conțină cel puțin o literă');
	}
	if (password.search(/[0-9]/) < 0) {
		errors.push('Parola dvs. trebuie să conțină cel puțin o cifră');
	}
	if (errors.length > 0) {
		return errors;
	}
	return true;
};

const validateLogin = async (full_name, password) => {
	const payload = {
		full_name,
		password,
	};
	const url = `http://127.0.0.1:5000/login`;
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify(payload),
		});
		console.log(response);
		if (response.status === 200) {
			return true;
		}
		return false;
	} catch (err) {
		console.log(err);
	}
};

const registerUser = async (full_name, password, mail, address) => {
	const payload = {
		full_name,
		password,
		mail,
		address,
		active_token: '',
		role: 'user',
	};
	const url = `http://localhost:5000/register`;
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});
		console.log(response);
		if (response.status === 201) {
			return true;
		}
		return false;
	} catch (err) {
		console.log(err);
	}
};
///// Events
const mainEvents = () => {
	mySignIn.addEventListener('click', () => {
		switchActive(mySignIn, mySignUp);
		myFormSwitch.innerHTML = loginForm;
		myIcon.innerHTML = iconForm;
		currForm = 'login';
	});
	mySignUp.addEventListener('click', () => {
		switchActive(mySignUp, mySignIn);
		myFormSwitch.innerHTML = registerForm;
		myIcon.innerHTML = '';
		currForm = 'register';
	});
	myFormSwitch.addEventListener('submit', async (e) => {
		e.preventDefault();

		switch (currForm) {
			case 'login':
				const nameLog = myFormSwitch.querySelector('#numecomplet');
				const passwordLog = myFormSwitch.querySelector('#password');
				const myWrongPassAlertLog =
					document.querySelector('#wrong_pass_alert');
				const loginRes = await validateLogin(
					nameLog.value,
					passwordLog.value
				);
				console.log(loginRes);
				if (loginRes === true) {
					myWrongPassAlertLog.innerHTML =
						'Se pregătește autentificarea...';
					myWrongPassAlertLog.style.color = 'green';
					window.location.href = './carouselpage.html';
				} else {
					myWrongPassAlertLog.innerHTML = 'Nume sau parolă greșită';
					myWrongPassAlertLog.style.color = 'red';
				}

				break;
			case 'register':
				const fullnameReg = myFormSwitch.querySelector('#full-name');
				const addressReg = myFormSwitch.querySelector('#address');
				const emailReg = myFormSwitch.querySelector('#email');
				const passwordReg = myFormSwitch.querySelector('#password');
				const confpasswordReg =
					myFormSwitch.querySelector('#confirm-password');
				const myWrongPassAlertReg =
					document.querySelector('#wrong_pass_alert');
				myWrongPassAlertReg.style.color = 'red';

				const myValidMail = validateEmail(emailReg.value);
				const myValidPass = validatePassword(passwordReg.value);
				if (!myValidMail) {
					myWrongPassAlertReg.innerHTML = 'Înserați un mail valid!';
					break;
				}
				if (myValidPass.length > 0) {
					let passErors = '';
					for (let i = 0; i < myValidPass.length; i++) {
						passErors += myValidPass[i] + '\n';
					}
					passErors = passErors.split('\n').join('<br>');
					myWrongPassAlertReg.innerHTML = passErors;
					break;
				}
				if (!(confpasswordReg.value === passwordReg.value)) {
					myWrongPassAlertReg.innerHTML = 'Parolele nu se potrivesc';
					break;
				}
				myWrongPassAlertReg.innerHTML = '';

				const registerRes = await registerUser(
					fullnameReg.value,
					passwordReg.value,
					emailReg.value,
					addressReg.value
				);
				if (registerRes === true) {
					myWrongPassAlertReg.innerHTML = 'Utilizator Inregistrat';
					myWrongPassAlertReg.style.color = 'green';
					break;
				}
				myWrongPassAlertReg.innerHTML =
					'Numele de utilizator este deja folosit';
				break;
		}
	});
};
mainEvents();
