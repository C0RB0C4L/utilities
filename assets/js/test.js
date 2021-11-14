console.log('oui');

let $ = jQuery;


toggleTooltipOnClick();
closeTooltipsOnDOMClick();


function toggleTooltipOnClick() {
  $('.tooltip').click(function() {
    let tooltipBox = $(this).next('.tooltip-container');    
    if(tooltipBox.hasClass('visible')) {
      tooltipBox.removeClass('visible');
    } else {
      closeEachTooltip();
      tooltipBox.addClass('visible');
    }
  })
}

function closeTooltipsOnDOMClick() {
  $(document).click(function(e) {
    if($(e.target).hasClass('tooltip') || $(e.target).hasClass('tooltip-container') || $(e.target).parents().hasClass('tooltip-container')) {
    } else {
      closeEachTooltip();
    }
  })
}

function closeEachTooltip() {
  let tooltips = $('.tooltip-container');
  tooltips.each(function() {
    $(this).removeClass('visible');
  })
}