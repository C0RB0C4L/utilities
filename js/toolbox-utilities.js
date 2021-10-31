//==================================================
// TESTS
//==================================================


//==================================================
// EXPORTS
//==================================================





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
 * @param inputId the checkbox you don't want unchecked (string)
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
 * @param selectId The select tag ID (string)
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
 * @param selectId The select tag ID (string)
 * @returns void
 * @author c0rb0c4l
 */
function hideOptionsfromTargetSelect(selectId) {
  let targetSelect = document.getElementById(selectId.toString());
  if (targetSelect != null) {
    for (let i = targetSelect.options.length; i > 1; i--) {
      if (targetSelect.options[i - 1].value != "")
        targetSelect.options[i - 1].classList.add('app-disp-none');
    }
  }
}
/**
 * @description Function that restores the hidden options from target select tag.
 * @param selectId The select tag ID (string)
 * @returns void
 * @author c0rb0c4l
 */
function revealOptionsfromTargetSelect(selectId) {
  let targetSelect = document.getElementById(selectId.toString());
  if (targetSelect != null) {
    for (let i = targetSelect.options.length; i > 1; i--) {
      targetSelect.options[i - 1].classList.remove('app-disp-none');
    }
  }
}
/**
 * @description Creates an overlay effet on the zone wrapped around a \<div> with ID as parameter.
 * A CSS class 'app-overlay-zone' with the adequate properties needs to be created.
 * If the target div doesn't have a relative position, either create a css class or style it manually
 * Use with removeOverlay();
 * @param divId The \<div id=" ">
 * @returns void
 * @author c0rb0c4l
 */
function createOverlay(divId) {
  let targetDiv = document.getElementById(divId.toString());
  /* */
  targetDiv.classList.add('app-pos-relative');
  const overlayZone = document.createElement('div');
  const overlayZoneId = 'js-' + divId.toString() + '-overlay-zone';
  overlayZone.setAttribute('class', 'app-overlay-zone');
  overlayZone.setAttribute('id', overlayZoneId);
  targetDiv.insertAdjacentElement('afterbegin', overlayZone);
}
/**
 * @description Removes the previously created overlay on the zone. 
 * Use with createOverlay();.
 * @param divId The \<div id=" ">
 * @returns void
 * @author c0rb0c4l
 */
function removeOverlay(divId) {
  const overlayZoneId = 'js-' + divId.toString() + 'overlay-zone';
  document.getElementById(overlayZoneId).remove();
}
/**
 * @description returns a number between the min and max values, both included
 * @param min included; the lowest desired value (Int)
 * @param max included; this highest desired value (Int)
 * @returns value between min and max
 */
function getRandomNumberBetween(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
/**
 * @description sets to inactive all the remaining unchecked inputs from a checkbox group when a certain amount of them are checked
 * @param divId The \<div id=" ">
 * @param max included; this highest desired amount of checked checkboxes (Int)
 * @returns value between min and max
 */
function toggleRemainingCheckboxesInactive(divId, max) {
  const inputGroup = document.getElementById(divId);
  const inputs = inputGroup.querySelectorAll("input[type='checkbox']");
  let count = 0;
  for (const child of inputs) {
    child.addEventListener("click", function(e) {
      if (e.target.checked === true) {
        count++;
      } else {
        count--
      }
      if(count >= max) {
        for(const child of inputs) {
          if(child.checked === false) {
            child.disabled = true;
          }
        }
      } else {
        for(const child of inputs) {
            child.disabled = false;
        }
      }
    });
  }

}