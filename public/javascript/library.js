$(document).ready(function() {
  // foundation ready
  $(document).foundation();

  // adjust homepage height based on background image size
  $('#homepage-container').css('height', $(document).height() - $('.top-bar').height());

  // sign up for newsletter
  $('#submit_email_button').on('click', function(e) {
      e.preventDefault();
      email = $('#email-address').val();
      console.log(email);
      $.ajax({
        type: 'POST',
        url: '/newsletter',
        data: {
          email_address: email
        }
      }).done(function(data) {
        console.log(data);
        $('label[for="email-address"]').text('Thank you for signing up!');
        $('#email-address').val('');
      });
  });

  // admin events modal
  $('.edit_event').on('click', function(e){
    e.preventDefault();
    var id = $(this).parent().parent().attr('id');
    $.ajax({
      type: 'GET',
      url: '/admin/events/edit/'+id,
    }).done(function(data) {
      var eventOrganizer = (data.naicaEvent) ? 'NAICA' : 'other';
      $('input#event_id').val(data._id);
      $('input#event_title').val(data.title);
      $('input#event_location').val(data.location);
      $('input#event_date').val(data.dateStamp);
      $('select#event_group').val(eventOrganizer);
      $('input#event_time_start').val(data.eventTimeStart);
      $('input#event_time_end').val(data.eventTimeEnd);
      $('input#event_rsvp_link').val(data.rsvpLink);
      $('input#event_more_info').val(data.moreInfo);
      $('textarea#event_description').val(data.description);
      $('#edit_modal').foundation('open');
    });
  });

  // throw up confirm modal to make sure they actually want to delete
  $('.delete_event').on('click', function(e) {
    var parentRow  = $(this).parent().parent(),
        eventID    = $(parentRow).attr('id'),
        eventTitle = $($(parentRow).find('td')[0]).text(),
        deleteLink = '/admin/events/delete/' + eventID;

    $('p.confirm_message').text('Are you sure you want to delete (' + eventTitle + ')?');
    $('a.delete-event-modal').attr('href', deleteLink);
    $('#delete_modal').foundation('open');
  });

  // close reveal modal
  $('.close-reveal-modal').on('click', function() {
    $('#delete_modal').foundation('close');
  });

  // contact form
  $('#submit-contact-button').on('click', function() {
    $(this).attr('disabled', 'disabled');

    var contactName  = $('#contact-name').val(),
        contactEmail = $('#contact-email').val(),
        message      = $('#contact-message').val();

    $.ajax({
      type: 'POST',
      url: '/contact/submit',
      data: {
        name: contactName,
        email: contactEmail,
        message: message
      }
    }).done(function(response) {
      $('#submit-contact-button').removeAttr('disabled');
      $('#contact-text').text('Thank you for sending us the message! We will try and get back to you as soon as we can!');
      $('#contact-name').val('');
      $('#contact-email').val('');
      $('#contact-message').val('');
    });
  })
});
