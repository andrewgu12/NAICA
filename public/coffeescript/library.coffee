$ ->
	$(document).foundation()
	# dynamically change the height of the home page image
	$('#homepage-container').css('height', $(document).height() - $('.top-bar').height())
