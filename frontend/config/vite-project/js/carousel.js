const allToys = document.querySelector('#all-toys');
const navbarCart = document.querySelector('.fa-shopping-cart');
const cartContainer = document.querySelector('.cart-container');
const checkout = document.querySelector('#checkout');
const cartTotal = document.querySelector('.cart-total');

let cartPressed = false;
let currCartCount = 0;
let results;
let prodDetails = new Map();
const currentPage = window.location.pathname;

const getProducts = async () => {
	const url = `http://localhost:5000/get_all_products`;
	try {
		const response = await fetch(url, {
			method: 'GET',
		});
		if (response.status === 200) {
			const output = await response.json();
			return output.json_list;
		}
		return 'Nu exista produse';
	} catch (err) {
		console.log(err);
	}
};
const orderProducts = async (product_id, qty, price) => {
	const url = `http://localhost:5000/add_product`;
	const payload = {
		product_id,
		qty,
		price,
	};
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});
		if (response.status === 201) {
			const output = await response.json();
			return output.message;
		}
	} catch (err) {
		console.log(err);
	}
};
// Display 20 toys
async function displayAllToys() {
	results = await getProducts();
	console.log(results);
	for (let i = 0; i < results.length; i++) {
		const div = document.createElement('div');
		div.innerHTML = `
		<div class = "card cursor">
          <div>
            <img
              src="/src/imgs/toy_placeholder.jpeg"
              class="card-img-top"
            />
        	</div>
          	<div class="card-body">
            	<h5 class="card-title">${results[i].name}</h5>
            	<p class="card-text"> </p>
          	</div>
		</div>
			<span class="close">&times;</span>	
			<div class="modal">
				<div class="image-container">
					<img  src="/src/imgs/toy_placeholder.jpeg">
				</div>
				<div class="info-container">
  					<h2 class="title">${results[i].name}</h2>
  					<p class="description">${results[i].description}</p>
 					<p class="price">${results[i].price}.99$</p>
 				    <button class="add-to-cart">Add to Cart</button>
     			</div>
			</div>
        `;
		const modal = div.querySelector('.modal');
		const closeModal = div.querySelector('.close');
		const card = div.querySelector('.card');
		const addToCart = div.querySelector('.add-to-cart');
		card.addEventListener('click', myZoom(modal, closeModal, 'flex'));
		closeModal.addEventListener('click', myZoom(modal, closeModal, 'none'));

		addToCart.addEventListener('click', () => {
			currCartCount++;
			cartTotal.textContent = currCartCount;
			const cartItem = document.createElement('li');
			cartItem.innerHTML = `<li class="cart-item ">
			<div class="product-image">
			  <img src="/src/imgs/toy_placeholder.jpeg" alt="Product Image">
			</div>
			<div class="product-details">
				<div class ="product-id">${results[i].id}</div>
				<div class="product-name">${results[i].name}</div>
			  	<p class="product-price">${results[i].price}.99$</p>
			</div>
		  </li>`;
			cartContainer.appendChild(cartItem);
		});

		allToys.appendChild(div);
	}
}
const myZoom = (myModal, myCloseModal, type) => {
	return function () {
		myModal.style.display = type;
		myCloseModal.style.display = type;
	};
};

// Init App
function init() {
	switch (currentPage) {
		case '/':
		case '/carouselpage.html':
			// displaySlider();
			displayAllToys();
			break;
	}
}

const mainEvents = () => {
	document.addEventListener('DOMContentLoaded', init);
	navbarCart.addEventListener('click', (e) => {
		e.preventDefault();
		if (!cartPressed) {
			cartPressed = true;
			cartContainer.style.display = 'flex';
		} else {
			cartPressed = false;
			cartContainer.style.display = 'none';
		}
	});
	checkout.addEventListener('click', async (e) => {
		if (cartContainer.childElementCount === 0) {
			window.alert("Can't ordeer an empty shopping cart");
			return;
		}
		console.log(cartContainer);
		const foo = cartContainer.childElementCount;
		let qty = 1;
		for (let i = 0; i < foo; i++) {
			const currProdLi = cartContainer.children[i];
			const currProdID =
				currProdLi.querySelector('.product-id').textContent;
			let currPrice =
				currProdLi.querySelector('.product-price').textContent;
			currPrice = currPrice.slice(0, currPrice.length - 1);

			if (i === 0) {
				prodDetails.set(currProdID, { price: currPrice, quant: qty });
				continue;
			}

			if (prodDetails.has(currProdID)) {
				let details = prodDetails.get(currProdID);
				qty++;
				details.quant = qty;
				prodDetails.set(currProdID, details);
			} else {
				qty = 1;
				prodDetails.set(currProdID, { price: currPrice, quant: qty });
			}
		}
		for (let [key, value] of prodDetails) {
			await orderProducts(key, value.quant, value.price);
		}
		prodDetails.clear();
		window.alert('Order placed!');
		cartContainer.innerHTML = '';
		currCartCount = 0;
		cartTotal.textContent = currCartCount;
	});
};
mainEvents();
