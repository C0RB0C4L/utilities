//============================================================
// SOLID OVERLAY TOGGLER
//============================================================


/**
* @description Creates an overlay effect inside an \<element> box.
* @param {HTMLElement|string} element The element or a valid javascript selector.
* @param {string} overlayStatus 
* * __"on"__ to create the overlay 
* * __"off"__ to remove it
* @param {string} overlayColor The color css property (i.e. "black", "purple"... "white" by default).
* @param  {string|number} overlayOpacity The css opacity property value ("0.6" by default).
* @return void
* @author c0rb0c4l
*/
function toggleOverlayOnElement(target, overlayStatus, overlayColor = "white", overlayOpacity = "0.6") {
	let element = target;
	if (typeof (element) === "string") {
		let element = document.querySelector(target);
	}
	if (document.body.contains(element)) {
		const overlayId = element.getAttribute('id') + '-overlay';
		if (overlayStatus === "on") {
			element.style.position = 'relative';
			if (document.getElementById(overlayId) === null) {
				const overlayElement = document.createElement('div');
				overlayElement.setAttribute('id', overlayId);
				overlayElement.style.width = '100%';
				overlayElement.style.height = '100%';
				overlayElement.style.position = 'absolute';
				overlayElement.style.zIndex = '100';
				overlayElement.style.opacity = overlayOpacity.toString();
				overlayElement.style.backgroundColor = overlayColor.toString();
				element.insertAdjacentElement('afterbegin', overlayElement);

				return;
			}
		}
		if (overlayStatus === "off") {
			let overlayElement = document.getElementById(overlayId);
			overlayElement !== null ? overlayElement.remove() : null;
			element.style.position = '';

			return;
		}
		console.error('%c' + toggleOverlayOnElement.name + " - bad overlayStatus argument : '" + arguments[1] + "'", 'color: white;');
	} else {
		console.error('%c' + toggleOverlayOnElement.name + " - bad selector / not an HTMLElement : '" + arguments[0] + "'", 'color: white;');
	}
}


//==================================================
// TOOLTIP SYSTEM
//==================================================


/**
 * @description Will display or hide a tooltip window when a click is done on a desired element having the className.\
 * The tooltip window has to be the next direct sibling and to have a "`className`-container class".
 * @param {string} className the className that will allow an element with it to trigger the display of the tooltip box.
 * @return void 
 * @author c0rb0c4l
 */
function enableTooltip(className) {
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
		if (e.target.classList.contains(className + '-close')) {
			closeAllTooltips();
		} else if (!(e.target.classList.contains(className))
			&& !(e.target.classList.contains(className + '-container'))
			&& !(e.target.parentElement.classList.contains(className + '-container'))
			&& !(e.target.parentElement.classList.contains(className))) {
			closeAllTooltips();
		}
	});

	function closeAllTooltips() {
		const tooltipContainers = document.getElementsByClassName(className + '-container');
		for (const container of tooltipContainers) {
			container.style.setProperty("visibility", "");
		}
	}
}