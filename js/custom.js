(function() {
	'use strict';

	var tinyslider = function() {
		var el = document.querySelectorAll('.testimonial-slider');

		if (el.length > 0) {
			var slider = tns({
				container: '.testimonial-slider',
				items: 1,
				axis: "horizontal",
				controlsContainer: "#testimonial-nav",
				swipeAngle: false,
				speed: 700,
				nav: true,
				controls: true,
				autoplay: true,
				autoplayHoverPause: true,
				autoplayTimeout: 3500,
				autoplayButtonOutput: false
			});
		}
	};
	tinyslider();

	


	var sitePlusMinus = function() {

		var value,
    		quantity = document.getElementsByClassName('quantity-container');

		function createBindings(quantityContainer) {
	      var quantityAmount = quantityContainer.getElementsByClassName('quantity-amount')[0];
	      var increase = quantityContainer.getElementsByClassName('increase')[0];
	      var decrease = quantityContainer.getElementsByClassName('decrease')[0];
	      increase.addEventListener('click', function (e) { increaseValue(e, quantityAmount); });
	      decrease.addEventListener('click', function (e) { decreaseValue(e, quantityAmount); });
	    }

	    function init() {
	        for (var i = 0; i < quantity.length; i++ ) {
						createBindings(quantity[i]);
	        }
	    };

	    function increaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        console.log(quantityAmount, quantityAmount.value);

	        value = isNaN(value) ? 0 : value;
	        value++;
	        quantityAmount.value = value;
	    }

	    function decreaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        value = isNaN(value) ? 0 : value;
	        if (value > 0) value--;

	        quantityAmount.value = value;
	    }
	    
	    init();
		
	};
	sitePlusMinus();


})()

//user
const storedUser = JSON.parse(localStorage.getItem('user'));

if (storedUser && storedUser.name) {
    const userElement = document.querySelector('.user1');  
    if (userElement) {  
        userElement.textContent = storedUser.name;
	
    }
	
}

const userElement = document.querySelector('.user1');
if (userElement) {
    userElement.addEventListener('click', function() {
        localStorage.removeItem('user');
        userElement.textContent = 'Login';
    });
} else {
    console.warn("Element with class 'user1' not found.");
}


// login

document.addEventListener("DOMContentLoaded", () => {
    const userIcon = document.querySelector("#user-icon");
    const formPopup = document.querySelector(".form-popup");
    const blurBgOverlay = document.querySelector(".blur-bg-overlay");

    if (!userIcon || !formPopup || !blurBgOverlay) {
        console.warn("One or more elements (user-icon, form-popup, blur-bg-overlay) are missing.");
        return;
    }

    const hidePopupBtn = formPopup.querySelector(".close-btn");

    if (userIcon) {
        userIcon.addEventListener("click", (e) => {
            e.preventDefault();
            formPopup.classList.add("active");
            blurBgOverlay.classList.add("active");
        });
    }

    if (hidePopupBtn) {
        hidePopupBtn.addEventListener("click", () => {
            formPopup.classList.remove("active");
            blurBgOverlay.classList.remove("active");
        });
    }

    if (blurBgOverlay) {
        blurBgOverlay.addEventListener("click", () => {
            formPopup.classList.remove("active");
            blurBgOverlay.classList.remove("active");
        });
    }
});




      
	   let user = {
		name: "",
		email: "",
		password: ""
	};

	
	const userValidator = new Proxy(user, {
		set(target, property, value) {
			let errorMessage = "";
			let isValid = true;

			if (property === "name") {
				if (value.trim().length < 3) {
					errorMessage = "Name must be at least 3 characters long.";
					isValid = false;
				}
			} 
			else if (property === "email") {
				let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
				if (!emailPattern.test(value)) {
					errorMessage = "Invalid email format.";
					isValid = false;
				}
			} 
			else if (property === "password") {
				if (value.length < 6) {
					errorMessage = "Password must be at least 6 characters.";
					isValid = false;
				}
			}

		
			let errorSpan = document.getElementById(`${property}-error`);
			if (!isValid) {
				errorSpan.textContent = errorMessage;
				errorSpan.style.display = "block";
			} else {
				errorSpan.style.display = "none";
				target[property] = value;
			}

			return true; 
		}
	});


	document.getElementById("login-form").addEventListener("submit", function (event) {
		event.preventDefault();

		let name = document.getElementById("name").value.trim();
		let email = document.getElementById("email").value.trim();
		let password = document.getElementById("password").value.trim();
		let confirmPassword = document.getElementById("confirm-password").value.trim();

		
		userValidator.name = name;
		userValidator.email = email;
		userValidator.password = password;

		
		let confirmPasswordError = document.getElementById("confirm-password-error");
		if (password !== confirmPassword) {
			confirmPasswordError.textContent = "Passwords do not match!";
			confirmPasswordError.style.display = "block";
		} else {
			confirmPasswordError.style.display = "none";
		}

	
		let errors = document.querySelectorAll(".error-message");
		let hasError = Array.from(errors).some(error => error.style.display === "block");

		if (!hasError) {
			localStorage.setItem("user", JSON.stringify(user));
			
			alert("Account created successfully!");
			location.reload();
		}
	});



// slider
document.addEventListener('DOMContentLoaded', function() {
	const slides = document.querySelectorAll('.hero-slide');
	const prevBtn = document.querySelector('.prev-btn');
	const nextBtn = document.querySelector('.next-btn');
	let currentSlide = 0;
  
	function showSlide(index) {
	  slides.forEach((slide, i) => {
		slide.classList.remove('active');
		if (i === index) {
		  slide.classList.add('active');
		}
	  });
	}
  
	function nextSlide() {
	  currentSlide = (currentSlide + 1) % slides.length;
	  showSlide(currentSlide);
	}
  
	function prevSlide() {
	  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
	  showSlide(currentSlide);
	}
  
	nextBtn.addEventListener('click', nextSlide);
	prevBtn.addEventListener('click', prevSlide);
  

	setInterval(nextSlide, 5000); 
  });





  document.addEventListener("DOMContentLoaded", function () {
    const productLinks = document.querySelectorAll('.product-item'); 

    
    function saveProductToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || []; 
        const productExists = cart.find(item => item.title === product.title); 
        if (!productExists) {
            cart.push(product); 
            localStorage.setItem("cart", JSON.stringify(cart)); 
            alert("تم إضافة المنتج إلى العربة!");
        } else {
            alert("المنتج موجود بالفعل في العربة!");
        }
    }

    
    productLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); 

            
            const title = link.dataset.title;
            const price = parseFloat(link.dataset.price);
            const image = link.dataset.image;

            
            if (isNaN(price)) {
                alert("السعر غير صالح!");
                return;
            }

            const product = {
                title: title,
                price: price, 
                image: image,
                quantity: 1 
            };

            saveProductToCart(product); 
        });
    });
});



// go to top 

let goTopBtn = document.getElementById("goTopBtn");

        window.onscroll = function () {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                goTopBtn.classList.add("show");
                goTopBtn.classList.remove("hide");
            } else {
                goTopBtn.classList.add("hide");
                setTimeout(() => goTopBtn.classList.remove("show"), 300);
            }
        };

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }