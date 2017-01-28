require('babel-register');

var React = require('react');
var EventRow = require('../generic/events_row.react');

var EventsTable = React.createClass({
  render: function() {
    var eventNodes = this.props.events.map((event) => {
      return(
        <EventRow event={event} />
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {eventNodes}
        </tbody>
      </table>
    );
  }
});

module.exports = EventsTable;
