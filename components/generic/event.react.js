var React  = require('react');
var moment = require('moment');

// event information - pass in date, time and location
var EventInformation = React.createClass({
	render: function() {
		var timeStamp  = this.props.eventDate,
		dateString     = moment.unix(timeStamp).format('dddd, MMMM D, YYYY'),
		eventTimeStart = (this.props.eventTimeStart.split(':')[0] > 12) ? ((this.props.eventTimeStart.split(':')[0] - 12) + ':' + this.props.eventTimeStart.split(':')[1] + ' PM'): (this.props.eventTimeStart + ' AM'),
		eventTimeEnd   = (this.props.eventTimeEnd.split(':')[0] > 12) ? ((this.props.eventTimeEnd.split(':')[0] - 12) + ':' + this.props.eventTimeEnd.split(':')[1] + ' PM'):       (this.props.eventTimeEnd + ' AM'),
		time           = eventTimeStart + ' - ' + eventTimeEnd,
		location       = this.props.eventLocation;

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

var EventBox = React.createClass({
	render: function() {
	    return (
	      <div className="event-box row">
	      	<div className="large-8 columns">
		        <EventInformation eventDate={this.props.event.eventDate} eventTimeStart={this.props.event.eventTimeStart} eventTimeEnd={this.props.event.eventTimeEnd} eventLocation={this.props.event.location}/>
		        <h3>{this.props.event.title}</h3>
		        <p className="event-description">{this.props.event.description}</p>
		    </div>
		    <div className="large-4 columns buttons-column">
		    	<EventButton buttonText="RSVP" url={this.props.event.rsvpLink} /> <br />
		    	<EventButton buttonText="More Info" url={this.props.event.moreInfo} />
		    </div>
	      </div>
	    );
	}
});

module.exports = EventBox;
