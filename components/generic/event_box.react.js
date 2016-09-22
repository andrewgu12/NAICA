var React            = require('react');
var Event            = require('./event.react');
var EventInformation = Event.EventInformation;
var EventButton      = Event.EventButton;


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
