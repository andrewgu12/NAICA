var React  = require('react');
var moment = require('moment');

// event information - pass in date, time and location
var EventInformation = React.createClass({
	render: function() {
		var timeStamp      = this.props.eventDate,
			dateString     = moment.unix(timeStamp).format('dddd, MMMM D, YYYY'),
			eventTimeStart = (this.props.eventTimeStart.split(':')[0] > 12) ? ((this.props.eventTimeStart.split(':')[0] - 12) + ':' + this.props.eventTimeStart.split(':')[1] + ' PM') : (this.props.eventTimeStart + ' AM'),
			eventTimeEnd   = (this.props.eventTimeEnd.split(':')[0] > 12) ? ((this.props.eventTimeEnd.split(':')[0] - 12) + ':' + this.props.eventTimeEnd.split(':')[1] + ' PM') : (this.props.eventTimeEnd + ' AM'),
			time 	       = eventTimeStart + ' - ' + eventTimeEnd,
			location       = this.props.eventLocation;

		return <p className="event-info">{dateString} <br /> {time} <br /> {location} </p>;
	}
});

var EventBox = React.createClass({
	render: function() {
		var rsvpButton = (this.props.event.rsvpLink === '') ? (<a href="#" disabled className="button">RSVP</a>) : (<a href={this.props.rsvpLink} className="button">RSVP</a>),
			infoButton = (this.props.event.moreInfo === '') ? (<a href="#" disabled className="button">More Info</a>) : (<a href={this.props.moreInfo} className="button">More Info</a>);
	    return (
	      <div className="event-box row">
	      	<div className="large-8 columns">
		        <EventInformation eventDate={this.props.event.eventDate} eventTimeStart={this.props.event.eventTimeStart} eventTimeEnd={this.props.event.eventTimeEnd} eventLocation={this.props.event.location}/>
		        <h3>{this.props.event.title}</h3>
		        <p className="event-description">{this.props.event.description}</p>
		    </div>
		    <div className="large-4 columns buttons-column">
		    	{rsvpButton}<br />{infoButton}
		    </div>
	      </div>
	    );
	}
});

module.exports = EventBox;
