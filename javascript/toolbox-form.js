//============================================================
// SELECT
//============================================================

/**
 * @description Function that toggles the options from target \<select> element but leaves the placeholder untouched, if any.
 * @param {HTMLElement|string} target The \<select> element or a valid javascript selector.
 * @param {string} status 
 * * __"on"__ to display (display:block) the options
 * * __"off"__ to hide (display:none) them.
 * @return void
 */
function toggleOptionsFromSelect(target, status) {
	let element = target;
	if (typeof (element) === "string") {
		element = document.querySelector(target);
	}
	if (document.body.contains(element) && element.tagName === "SELECT") {
		if (status === "on") {
			for (let i = element.options.length; i > 1; i--) {
				if (element.options[i - 1].value !== "")
					element.options[i - 1].style.display = "none";
			}
			return;
		}
		if (status === "off") {
			for (let i = element.options.length; i > 1; i--) {
				element.options[i - 1].style.display = "block";
			}
			return;
		}
		console.error('%c' + toggleOptionsFromSelect.name + " - bad status argument : '" + arguments[1] + "'", 'color: white;');
	} else {
		console.error('%c' + toggleOptionsFromSelect.name + " - bad selector / not a <select> HTMLElement " + arguments[0], 'color: white;');
	}
}

/**
 * @description Function that completely removes the options from target \<select> element except for its placeholder if any.
 * @param {HTMLElement|string} target The \<select> element or a valid javascript selector.
 * @return void
 */
function deleteOptionsFromSelect(target) {
	let element = target;
	if (typeof (element) === "string") {
		element = document.querySelector(target);
	}
	if (document.body.contains(element)) {
		while (element.lastChild && element.lastChild.value !== "") {
			if (element.lastChild.value !== "")
				element.lastChild.remove();
		}
	} else {
		console.error('%c' + toggleOptionsFromSelect.name + " - bad selector / not a <select> HTMLElement " + arguments[0], 'color: white;');
	}
}


//============================================================
// CHECKBOX
//============================================================


/**
 * @description Function that searches for all the checkboxes in the DOM and sets them to unchecked.
 * @return void
 */
function uncheckAllCheckboxes() {
	let inputs = document.querySelectorAll("input[type='checkbox']");
	for (const input of inputs) {
		input.checked = false;
	}
}


/**
 * @description Will disable all the remaining checkboxes in the DOM after a certain amount have been checked.
 * @param {string|number} max The highest desired amount of checked checkboxes (inclusive)
 * @return void
 */
function enableSetMaximumCheckboxes(max) {
	if (typeof (parseInt(max)) !== undefined) {
		const inputs = document.querySelectorAll("input[type='checkbox']");
		let count = 0;
		for (const child of inputs) {
			child.checked === true ? count++ : null;
			if (count >= parseInt(max)) {
				for (const child of inputs) {
					if (child.checked === false) {
						child.disabled = true;
					}
				}
			}
			child.addEventListener("click", function (e) {
				(e.target.checked === true) ? count++ : count--;
				if (count >= parseInt(max)) {
					for (const child of inputs) {
						if (child.checked === false) {
							child.disabled = true;
						}
					}
				} else {
					for (const child of inputs) {
						child.disabled = false;
					}
				}
			});
		}
	}
}


//============================================================
// FIELDS
//============================================================


/**
 * @description Will highlight two inputs if their content are different.
 * @param {HTMLElement|string} firstElement DOM element or a valid javascript selector.
 * @param {HTMLElement|string} secondElement DOM element or a valid javascript selector.
 * @return void
 */
function enableHighlightIfFieldsAreDifferent(firstTarget, secondTarget) {
	let firstElement = firstTarget;
	if (typeof (firstElement) === "string") {
		firstElement = document.querySelector(firstTarget);
	}
	let secondElement = secondTarget;
	if (typeof (secondElement) === "string") {
		secondElement = document.querySelector(secondTarget);
	}
	if (document.body.contains(firstElement) && document.body.contains(secondElement)) {

		secondElement.addEventListener("input", function () {
			if (secondElement.value !== "" && firstElement.value !== secondElement.value) {
				secondElement.removeAttribute("style");
				firstElement.removeAttribute("style");
				secondElement.style.boxShadow = "0 0 0 0.2rem rgba(255, 25, 25)";
				firstElement.style.boxShadow = "0 0 0 0.2rem rgba(255, 25, 25)";
			} else if (firstElement.value === secondElement.value) {
				secondElement.removeAttribute("style");
				firstElement.removeAttribute("style");
			}
		});

		firstElement.addEventListener("input", function () {
			if (firstElement.value !== "" && firstElement.value !== secondElement.value) {
				secondElement.removeAttribute("style");
				firstElement.removeAttribute("style");
				secondElement.style.boxShadow = "0 0 0 0.2rem rgba(255, 25, 25)";
				firstElement.style.boxShadow = "0 0 0 0.2rem rgba(255, 25, 25)";
			} else if (firstElement.value === secondElement.value) {
				secondElement.removeAttribute("style");
				firstElement.removeAttribute("style");
			}
		});
	}
}


/**
 * @param {HTMLElement|string} element DOM element or a valid javascript selector.
 * @return void
 */
function putAsterisksOnMandatoryField(target) {
	let element = target
	if (typeof (element) === "string") {
		element = document.querySelector(target);
	}
	if (document.body.contains(element)) {
		if (element.getAttribute('required') !== null) {
			let label = document.querySelector('label[for=' + element.getAttribute('id') + ']');
			if (label !== null) {
				label.innerHTML += '<span style="color:red;"> * </span>';
			}
		}
	}
}


/**
 * @param {HTMLElement|string} element DOM element or a valid javascript selector.
 * @return void
 */
function putAsterisksOnFormMandatoryFields() {
	const forms = document.querySelectorAll("form");
	if (forms.length > 0) {
		for (const form of forms) {
			const mandatoryInputs = form.querySelectorAll("[required]");
			for (const input of mandatoryInputs) {
				let label = document.querySelector('label[for=' + input.getAttribute('id') + ']');
				if (label !== null) {
					label.innerHTML += '<span style="color:red;"> * </span>';
				}
			}
		}
	}
}


/**
 * @param {HTMLElement|string} target DOM element or a valid javascript selector.
 * @return void
 */
function putBulletOnMandatoryField(target) {
	let element = target;
	if (typeof (element) === "string") {
		element = document.querySelector(target);
	}
	if (document.body.contains(element)) {
		if (element.getAttribute('required') !== null) {
			let label = document.querySelector('label[for=' + element.getAttribute('id') + ']');
			if (label !== null) {
				let styleTag = document.createElement("style");
				cssText = 'label[for=' + element.getAttribute('id') + ']::after{content:"";display:inline-block;width:5px;height:5px;background-color:red;vertical-align:top;border-radius:50%;}';
				styleTag.appendChild(document.createTextNode(cssText));
				document.getElementsByTagName("head")[0].appendChild(styleTag);
			}
		}
	}
}


/**
 * @param {HTMLElement|string} element DOM element or a valid javascript selector.
 * @return void
 */
function putBulletOnFormMandatoryFields() {
	const forms = document.querySelectorAll("form");
	if (forms.length > 0) {
		let styleTag = document.createElement("style");
		let cssSelectors = "";
		for (const form of forms) {
			const mandatoryInputs = form.querySelectorAll("[required]");
			for (const input of mandatoryInputs) {
				let label = document.querySelector('label[for=' + input.getAttribute('id') + ']');
				if (label !== null) {
					cssSelectors += 'label[for=' + input.getAttribute('id') + ']::after,';
				}
			}
		}
		if (cssSelectors !== "") {
			cssSelectors = cssSelectors.slice(0, cssSelectors.length - 1);
			let cssText = '{content:"";display:inline-block;width:5px;height:5px;background-color:red;vertical-align:top;border-radius:50%;}';
			styleTag.appendChild(document.createTextNode(cssSelectors + cssText));
			document.getElementsByTagName("head")[0].appendChild(styleTag);
		}
	}
}