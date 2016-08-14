var React = require('react');
var moment = require('moment');

var EventRow = React.createClass({
  render: function() {
    var timeStamp    = this.props.event.eventDate,
      dateString     = moment.unix(timeStamp).format('MM/DD/YYYY'),
      eventTimeStart = (this.props.event.eventTimeStart.split(':')[0] > 12) ? ((this.props.event.eventTimeStart.split(':')[0] - 12) + ':' + this.props.event.eventTimeStart.split(':')[1] + ' PM'): (this.props.event.eventTimeStart + ' AM'),
      eventTimeEnd   = (this.props.event.eventTimeEnd.split(':')[0] > 12) ? ((this.props.event.eventTimeEnd.split(':')[0] - 12) + ':' + this.props.event.eventTimeEnd.split(':')[1] + ' PM'):       (this.props.event.eventTimeEnd + ' AM'),
      time           = eventTimeStart + ' - ' + eventTimeEnd,
      location       = this.props.event.location,
      eventName      = this.props.event.title,
      eventID        = this.props.event._id;
      
    return(
      <tr id={eventID}>
        <td>{eventName}</td>
        <td>{dateString}</td>
        <td>{time}</td>
        <td>{location}</td>
        <td><a href="#" className="edit_event">Edit</a></td>
        <td><a href="#" className="delete_event">Delete</a></td>
      </tr>
    );
  }
});

module.exports = EventRow;
