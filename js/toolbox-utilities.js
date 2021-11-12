//==================================================
// TESTS
//==================================================
/* let test = setRed;

function setRed() {
  let elem = document.getElementById('check3');
  elem.style.display = 'none';
}

document.getElementById('check3').addEventListener("click", test);



//or 
let test2 = function () {
  let elem = document.getElementById('check2');
  elem.style.display = 'none';
}
document.getElementById('check2').addEventListener("click", test2); */
// and call test2 instead of test

//==================================================
// EXPORTS
//==================================================

outlineIfFieldsAreDifferent("text1", "text2");



//============================================================
// FUNCTIONS
//============================================================
/**
 * @description Function that searches for all the checkboxes in the DOM and sets them to unchecked.
 * @returns void
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
 * @param {string} inputId the checkbox you don't want unchecked (string)
 * @returns void
 * @author c0rb0c4l
 */
function uncheckAllCheckboxesExcept(inputId) {
  let inputs = document.getElementsByTagName('input');
  for (const input of inputs) {
    if (input.id != inputId.toString() && input.type == 'checkbox') {
      input.checked = false;
    }
  }
}
/**
 * @description Function that completely removes the options from target select tag (except the placeholder).
 * @param {string} selectId The select tag ID (string)
 * @returns void
 * @author c0rb0c4l
 */
function deleteOptionsfromTargetSelect(selectId) {
  let targetSelect = document.getElementById(selectId.toString());
  if (targetSelect != null) {
    while (targetSelect.lastChild) {
      if (targetSelect.lastChild.value != "")
        targetSelect.lastChild.remove();
    }
  }
}
/**
 * @description Function that hides the options from target select tag (except the placeholder).
 * @param {string} selectId The select tag ID (string)
 * @returns void
 * @author c0rb0c4l
 */
function hideOptionsfromTargetSelect(selectId) {
  let targetSelect = document.getElementById(selectId.toString());
  if (targetSelect != null) {
    for (let i = targetSelect.options.length; i > 1; i--) {
      if (targetSelect.options[i - 1].value != "")
        targetSelect.options[i - 1].style.display = 'none';
    }
  }
}
/**
 * @description Function that restores the hidden options from target select tag.
 * @param {string} selectId The select tag ID (string)
 * @returns void
 * @author c0rb0c4l
 */
function revealOptionsfromTargetSelect(selectId) {
  let targetSelect = document.getElementById(selectId.toString());
  if (targetSelect != null) {
    for (let i = targetSelect.options.length; i > 1; i--) {
      targetSelect.options[i - 1].style.display = 'block';
    }
  }
}
/**
 * @description Creates an overlay effet on the zone wrapped around a \<div> with ID as parameter.
 * Use with removeOverlay();
 * @param {string} divId The \<div id=" ">
 * @param {string} overlayColor The color css property (i.e. "black", "purple"... "white" by default)
 * @param  {string|number} overlayOpacity The css opacity property value ("0.6" by default);
 * @returns void
 * @author c0rb0c4l
 */
function createOverlay(divId, overlayColor = "white", overlayOpacity = '0.6') {
  let targetDiv = document.getElementById(divId.toString());
  targetDiv.style.position = 'relative';
  const overlayDiv = document.createElement('div');
  const overlayId = 'js-' + divId.toString() + '-overlay-zone';
  overlayDiv.style.width = '100%';
  overlayDiv.style.height = '100%';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.opacity = overlayOpacity.toString();
  overlayDiv.style.backgroundColor = overlayColor.toString();
  overlayDiv.setAttribute('id', overlayId);
  targetDiv.insertAdjacentElement('afterbegin', overlayDiv);
}
/**
 * @description Removes the previously created overlay on the zone. 
 * Use with createOverlay();.
 * @param {string} divId The \<div id=" ">
 * @returns void
 * @author c0rb0c4l
 */
function removeOverlay(divId) {
  const overlayId = 'js-' + divId.toString() + 'overlay-zone';
  document.getElementById(overlayId).remove();
}
/**
 * @description returns a number between the min and max values, both included
 * @param {number} min included; the lowest desired value (Int)
 * @param {number} max included; this highest desired value (Int)
 * @returns value between min and max
 * @author c0rb0c4l
 */
function getRandomNumberBetween(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
/**
 * @description will set to "inactive" all the remaining unchecked inputs from a desired group.
 * It adds an event listener to all the checkbox in the targeted element, count how many are checked each time
 * one is checked and will disable all the remaining checkboxes that are unchecked when a certain amount is reached.
 * @param {string} divId The \<div id=" ">
 * @param {string|number} max included; this highest desired amount of checked checkboxes
 * @returns value between min and max
 * @author c0rb0c4l
 */
function enableToggleRemainingCheckboxesInactive(divId, max) {
  const inputGroup = document.getElementById(divId);
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
 * @description will outline desired inputs fields if their content are strictly different
 * @param {string} firstInputId
 * @param {string} secondInputId
 * @returns void
 * @author c0rb0c4l
 */
function outlineIfFieldsAreDifferent(firstInputId, secondInputId) {
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
 * @description will outline desired inputs fields if their content are strictly different
 * @param {string} elementId the 
 * @param {string} eventNature
 * @param {function} callback function to callback
 * @param {number} delay the time after which the function will be called
 * @returns void
 * @author c0rb0c4l
 */
function callbackAfterDelayOnEvent(elementId, eventNature, callback, delay) {
  elementId.addEventListener(eventNature, function () {
    let timedCallback = null;
    clearTimeout(timedCallback);
    timedCallback = setTimeout(callback, delay);
  });
}




/**
 * timer pattern / delay function
 *
 * let timer = null;
 * let delay = 500;
 *
 *    *on event* {
 *  clearTimeout(timer);
 *  timer = setTimeout(timedfunction(), delay);
 * }
 *
 * this way, each time the event is trigerred, the function is cancelled / delayed
 *
 */