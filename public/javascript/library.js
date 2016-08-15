$(document).ready(function() {
  // foundation ready
  $(document).foundation();

  // adjust homepage height based on background image size
  $('#homepage-container').css('height', $(document).height() - $('.top-bar').height());


  // admin events modal
  $('.edit_event').on('click', function(e){
    e.preventDefault();
    var id = $(this).parent().parent().attr('id');
    $.ajax({
      type: 'GET',
      url: '/admin/events/'+id,
    }).done(function(data) {
      var eventOrganizer = (data.naicaEvent) ? 'NAICA' : 'other';
      $('input#event_id').text(data._id);
      $('input#event_title').val(data.description);
      $('input#event_location').val(data.location);
      console.log(data.dateStamp);
      $('input#event_date').val(data.dateStamp);
      $('select#event_group').val(eventOrganizer);
      $('input#event_time_start').val(data.eventTimeStart);
      $('input#event_time_end').val(data.eventTimeEnd);
      $('input#event_rsvp_link').val(data.rsvpLink);
      $('input#event_more_info').val(data.moreInfo);
      $('textarea#event_description').val(data.description);
      $('#edit_modal').foundation('open');
      console.log(data);
    });
  });
});
