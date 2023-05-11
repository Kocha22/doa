const sectionCenter = document.querySelector('.section-center');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

form.addEventListener('submit', addItem);

window.addEventListener('DOMContentLoaded', setupItem);
clearBtn.addEventListener('click', clearItem);

function addItem(e) {
	e.preventDefault();
	let value = grocery.value;
	let id = new Date().getTime().toString();

	if(value != '') {
		let element = document.createElement('article');
		let attr = document.createAttribute('data-id');
		attr.value = id;
		element.setAttributeNode(attr);
		element.classList.add('grocery-item');
		element.innerHTML = `<p class="title">${value}</p>
	            <div class="btn-container">
	              <!-- edit btn -->
	              <button type="button" class="edit-btn">
	                <i class="fas fa-edit"></i>
	              </button>
	              <!-- delete btn -->
	              <button type="button" class="delete-btn">
	                <i class="fas fa-trash"></i>
	              </button>
	            </div>`;
	    list.appendChild(element);
	    container.classList.add('show-container');


	    const deleteBtn = element.querySelector('.delete-btn');
	    deleteBtn.addEventListener('click', deleteItem);

	    const editBtn = element.querySelector('.edit-btn');
	    editBtn.addEventListener('click', editItem);

	    addLocalStorage(id, value);

	    grocery.value = ''
	}
}

function setupItem() {
	let items = getLocalStorage();

	if(items.length > 0) {
		items.forEach(function(item) {
			createArticle(item.id, item.value)
		})
	}
}

function createArticle(id, value) {
	let element = document.createElement('article');
	let attr = document.createAttribute('data-id');
	attr.value = id;
	element.setAttributeNode(attr);
	element.classList.add('grocery-item');
	element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>`;
    list.appendChild(element);
    container.classList.add('show-container');


    const deleteBtn = element.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', deleteItem);

    const editBtn = element.querySelector('.edit-btn');
    editBtn.addEventListener('click', editItem);
}


function addLocalStorage(id, value) {
	let items = getLocalStorage();
	let grocery = {id, value};
	items.push(grocery)
	localStorage.setItem('books', JSON.stringify(items));
}

function getLocalStorage() {
	return localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
}

function deleteItem(e) {
	e.preventDefault();
	let element = e.currentTarget.parentElement.parentElement;
	let id = element.dataset.id;

	list.removeChild(element);
	removeLocalStorage(id);
}

function removeLocalStorage(id) {
	let items = getLocalStorage();
	let elements = items.filter(function(item) {
		if(item.id !== id) {
			return item;
		}
	});
	localStorage.setItem('books', JSON.stringify(elements));
}

function editItem(e) {

}

function clearItem(e) {
	e.preventDefault();
	let items = document.querySelectorAll('.grocery-item');
	if(items.length > 0) {
		items.forEach(function(item) {
			list.removeChild(item);
		});
		localStorage.removeItem('books');
	}
}