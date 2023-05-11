const btns = document.querySelectorAll('.btn');
const value = document.getElementById('value');

let count = 0;

btns.forEach(function(btn) {
	btn.addEventListener('click', function(e) {
		let styles = e.currentTarget.classList;
		if(styles.contains('increase')) {
			count++;
		} else if(styles.contains('decrease')) {
			count--;
		} else {
			count = 0;
		}

		value.textContent = count;

		if(count > 0) {
			value.style.color = 'green';
		}
		if(count < 0) {
			value.style.color = 'red';
		}
		if(count === 0) {
			value.style.color = '#222';
		}
	})
})
