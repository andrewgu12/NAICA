$(function() {
  $(document).foundation();
  return $('#homepage-container').css('height', $(document).height() - $('.top-bar').height());
});
