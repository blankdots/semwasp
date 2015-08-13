console.log('it works!!');
$('.ui.menu .ui.dropdown').dropdown on: 'hover'
$('.ui.menu a.item').on 'click', ->
  $(this).addClass('active').siblings().removeClass 'active'
  return
$('.ui.dropdown').dropdown()
$('.ui.buttons .dropdown.button').dropdown action: 'combo'
$('.ui.dropdown').dropdown on: 'click'
$('.special.card .image').dimmer on: 'hover'
$('.star.rating').rating()
$('.card .dimmer').dimmer on: 'hover'
$('.ui:not(.container, .grid)').each ->
  $(this).popup
    on: 'hover'
    variation: 'small inverted'
    exclusive: true
    content: $(this).attr('class')
  return