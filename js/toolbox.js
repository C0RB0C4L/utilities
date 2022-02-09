//==================================================
// EXPORTS
//==================================================
export default {
	getRandomNumberBetween,
	deleteOptionsFromTargetSelectElement,
	deleteOptionsFromTargetSelect,
	hideOptionsfromTargetSelect,
	revealOptionsfromTargetSelect,
	createOverlayOnId,
	removeOverlayFromId,
	createOverlayOnElement,
	removeOverlayFromElement,
	uncheckAllCheckboxes,
	uncheckAllCheckboxesExcept,
	enableToggleRemainingCheckboxesInactive,
	enableOutlineIfFieldsAreDifferent,
	enableCallbackAfterDelayOnEvent,
	enableTooltipOnClick
}



//============================================================
// FUNCTIONS
//============================================================
/**
 * @description return a number between the min and max values, both included.
 * @param {number} min Included; The lowest desired value.
 * @param {number} max Included; The highest desired value.
 * @return {number} Value between min and max.
 */
function getRandomNumberBetween(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
/**
 * @description Function that completely removes the options from target \<select> element (except for the placeholder).
 * @param {HTMLElement} element The \<select> element.
 * @return void
 * @author c0rb0c4l
 */
function deleteOptionsFromTargetSelectElement(element) {
	if (element != null) {
		while (element.lastChild && element.lastChild.value != "") {
			if (element.lastChild.value != "")
				element.lastChild.remove();
		}
	}
}
/**
 * @description Function that completely removes the options from target \<select> element (except the placeholder).
 * @param {string} elementId The \<select> id.
 * @return void
 * @author c0rb0c4l
 */
function deleteOptionsFromTargetSelect(elementId) {
	let targetSelect = document.getElementById(elementId.toString());
	if (targetSelect != null) {
		while (targetSelect.lastChild) {
			if (targetSelect.lastChild.value != "")
				targetSelect.lastChild.remove();
		}
	}
}
/**
 * @description Function that hides the options from target \<select> element (except the placeholder).
 * @param {string} elementId The \<select> id.
 * @return void
 * @author c0rb0c4l
 */
function hideOptionsfromTargetSelect(elementId) {
	let targetSelect = document.getElementById(elementId.toString());
	if (targetSelect != null) {
		for (let i = targetSelect.options.length; i > 1; i--) {
			if (targetSelect.options[i - 1].value != "")
				targetSelect.options[i - 1].style.display = 'none';
		}
	}
}
/**
 * @description Function that restores the hidden options from target \<select> element (except the placeholder).
 * @param {string} elementId The \<select> id.
 * @return void
 * @author c0rb0c4l
 */
function revealOptionsfromTargetSelect(elementId) {
	let targetSelect = document.getElementById(elementId.toString());
	if (targetSelect != null) {
		for (let i = targetSelect.options.length; i > 1; i--) {
			targetSelect.options[i - 1].style.display = 'block';
		}
	}
}
/**
 * @description Creates an overlay effect on the zone wrapped inside an \<element>.\
 * Use with removeOverlay().
 * @param {string} elementId The \<element> id.
 * @param {string} overlayColor The color css property (i.e. "black", "purple"... "white" by default).
 * @param  {string|number} overlayOpacity The css opacity property value ("0.6" by default).
 * @return void
 * @author c0rb0c4l
 */
function createOverlayOnId(elementId, overlayColor = "white", overlayOpacity = '0.6') {
	let targetDiv = document.getElementById(elementId.toString());
	if (targetDiv != null) {
		targetDiv.style.position = 'relative';
		const overlayDiv = document.createElement('div');
		const overlayId = 'js-' + elementId.toString() + '-overlay-zone';
		overlayDiv.style.width = '100%';
		overlayDiv.style.height = '100%';
		overlayDiv.style.position = 'absolute';
		overlayDiv.style.zIndex = '100';
		overlayDiv.style.opacity = overlayOpacity.toString();
		overlayDiv.style.backgroundColor = overlayColor.toString();
		overlayDiv.setAttribute('id', overlayId);
		targetDiv.insertAdjacentElement('afterbegin', overlayDiv);
	}
}
/**
 * @description Removes the previously created overlay on the <element>. 
 * Use with createOverlay().
 * @param {string} elementId The \<element> id.
 * @return void
 * @author c0rb0c4l
 */
function removeOverlayFromId(elementId) {
	const overlayId = 'js-' + elementId.toString() + '-overlay-zone';
	const overlayElement = document.getElementById(overlayId);
	if (overlayElement != null) {
		overlayElement.remove();
	}
}
/**
 * @description Creates an overlay effect on the zone wrapped inside an \<element>.
 * Use with removeOverlay().
 * @param {HTMLElement} element The HTML \<element>.
 * @param {string} overlayColor The color css property (i.e. "black", "purple"... "white" by default).
 * @param  {string|number} overlayOpacity The css opacity property value ("0.6" by default).
 * @return void
 * @author c0rb0c4l
 */
function createOverlayOnElement(element, overlayColor = "white", overlayOpacity = '0.6') {
	element.style.position = 'relative';
	const overlayDiv = document.createElement('div');
	const overlayId = 'js-' + element.id + '-overlay-zone';
	overlayDiv.style.width = '100%';
	overlayDiv.style.height = '100%';
	overlayDiv.style.position = 'absolute';
	overlayDiv.style.zIndex = '100';
	overlayDiv.style.opacity = overlayOpacity.toString();
	overlayDiv.style.backgroundColor = overlayColor.toString();
	overlayDiv.setAttribute('id', overlayId);
	element.insertAdjacentElement('afterbegin', overlayDiv);
}
/**
 * @description Removes the previously created overlay on the \<element>. 
 * Use with createOverlay().
 * @param {HTMLElement} element The HTML \<element>.
 * @return void
 * @author c0rb0c4l
 */
function removeOverlayFromElement(element) {
	const overlayId = 'js-' + element.id + '-overlay-zone';
	const overlayElement = document.getElementById(overlayId);
	if (overlayElement != null) {
		overlayElement.remove();
	}
}
/**
 * @description Function that searches for all the checkboxes in the DOM and sets them to unchecked.
 * You can create an event listener for this function to be fired.
 * @return void
 * @author c0rb0c4l
 */
function uncheckAllCheckboxes() {
	let inputs = document.getElementsByTagName('input');
	for (const input of inputs) {
		if (input.type == 'checkbox') {
			input.checked = false;
		}
	}
}
/**
 * @description Function that search for all the other checkboxes that the desired one in the DOM and sets them to unchecked.
 * You can create an event listener for this function to be fired.
 * @param {string} elementId The \<input> id you don't want unchecked.
 * @return void
 * @author c0rb0c4l
 */
function uncheckAllCheckboxesExcept(elementId) {
	let inputs = document.getElementsByTagName('input');
	for (const input of inputs) {
		if (input.id != elementId.toString() && input.type == 'checkbox') {
			input.checked = false;
		}
	}
}
/**
 * @description Will set to "inactive" all the remaining unchecked inputs from a desired within an \<element>.
 * It adds an event listener to all the checkbox in the targeted element, count how many are checked each time
 * one is checked and will disable all the remaining checkboxes that are unchecked when a certain amount is reached.
 * @param {string} elementId The \<element> id.
 * @param {string|number} max Included; The highest desired amount of checked checkboxes.
 * @return void
 * @author c0rb0c4l
 */
function enableToggleRemainingCheckboxesInactive(elementId, max) {
	const inputGroup = document.getElementById(elementId);
	const inputs = inputGroup.querySelectorAll("input[type='checkbox']");
	let count = 0;
	for (const child of inputs) {
		child.addEventListener("click", function (e) {
			if (e.target.checked === true) {
				count++;
			} else {
				count--;
			}
			if (count >= max) {
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
/**
 * @description Will outline two desired inputs fields if their content are strictly different.
 * @param {string} firstInputId The first \<input> id.
 * @param {string} secondInputId The second \<input> id.
 * @return void
 * @author c0rb0c4l
 */
function enableOutlineIfFieldsAreDifferent(firstInputId, secondInputId) {
	const firstInput = document.getElementById(firstInputId);
	const secondInput = document.getElementById(secondInputId);
	secondInput.addEventListener("keyup", function () {
		if (secondInput.value != '' && firstInput.value != secondInput.value) {
			secondInput.style.boxShadow = "0 0 0 0.2rem rgba(255, 0, 0, 0.5)";
		} else if (firstInput.value === secondInput.value) {
			secondInput.removeAttribute('style');
		}
	});
}
/**
 * @description Will callback a function after a certain delay when a specified event is triggered on a specific element.
 * The timed callback will be reinitialised each time the event is triggered.
 * @param {string} elementId The \<element> id on which the event listener will be attached to.
 * @param {string} eventNature The event nature (click, keyup...).
 * @param {function} callback The function to callback.
 * @param {number} delay The time after which the function will be called.
 * @return void
 * @author c0rb0c4l
 */
function enableCallbackAfterDelayOnEvent(elementId, eventNature, callback, delay) {
	let element = document.getElementById(elementId)
	let timedCallback = null;
	element.addEventListener(eventNature, function () {
		clearTimeout(timedCallback);
		timedCallback = setTimeout(callback, delay);
	});
}
/**
 * @description Will display or hide a tooltip box when a zone is clicked.
 * It has to be used with a custom class name to trigger the event and the tooltip style must be applied to this class name with the\
 * '-container' suffix.
 * @param {string} className the className that will allow an element with it to trigger the display of the tooltip box.
 * @return void
 * @author c0rb0c4l
 */
function enableTooltipOnClick(className) {
	const tooltipElements = document.getElementsByClassName(className);
	let targetSibling;
	for (const element of tooltipElements) {
		element.addEventListener('click', function (e) {
			let target = e.target;
			while (!target.classList.contains(className)) {
				target = target.parentNode;
			}
			targetSibling = target.nextElementSibling;
			if (targetSibling.style.visibility != "visible") {
				closeAllTooltips();
				targetSibling.style.setProperty("visibility", "visible");
			} else if (targetSibling.style.visibility == "visible") {
				closeAllTooltips();
				targetSibling.style.setProperty("visibility", "");
			}
		});
	}
	document.addEventListener('click', function (e) {
		if (!(e.target.classList.contains(className))
			&& !(e.target.classList.contains(className + '-container'))
			&& !(e.target.parentElement.classList.contains(className + '-container'))
			&& !(e.target.parentElement.classList.contains(className))) {
			closeAllTooltips();
		}
	});
	function closeAllTooltips() {
		const tooltipContainers = document.getElementsByClassName(className + '-container');
		for (const container of tooltipContainers) {
			targetSibling.style.setProperty("visibility", "");
		}
	}
}
