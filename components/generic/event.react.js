var React  = require('react');
var moment = require('moment');

// event information - pass in date, time and location
var EventInformation = React.createClass({
	render: function() {
		var timeStamp      = this.props.eventDate,
			dateString     	 = moment.unix(timeStamp).format('dddd, MMMM D, YYYY'),
			eventTimeStart   = (this.props.eventTimeStart.split(':')[0] > 12) ? ((this.props.eventTimeStart.split(':')[0] - 12) + ':' + this.props.eventTimeStart.split(':')[1] + ' PM') : (this.props.eventTimeStart + ' AM'),
			eventTimeEnd     = (this.props.eventTimeEnd.split(':')[0] > 12) ? ((this.props.eventTimeEnd.split(':')[0] - 12) + ':' + this.props.eventTimeEnd.split(':')[1] + ' PM') : (this.props.eventTimeEnd + ' AM'),
			time 	           = eventTimeStart + ' - ' + eventTimeEnd,
			location         = this.props.eventLocation;

		return <p className="event-info">{dateString} <br /> {time} <br /> {location} </p>;
	}
});

var EventButton = React.createClass({
	render: function() {
	 	if (this.props.url === '')
	 		return <a href="#" disabled className="button">{this.props.buttonText}</a>;
	 	else
			return <a href={this.props.url} className="button" target="_blank">{this.props.buttonText}</a>;
	}
});


module.exports = {
	EventInformation: EventInformation,
	EventButton:      EventButton
};
