var React  = require('react');
var moment = require('moment');

// event information - pass in date, time and location
var EventInformation = React.createClass({
	render: function() {
		var timeStamp    = this.props.eventDate,
			dateString   = moment.unix(timeStamp).format('dddd, MMMM D, YYYY'),
			time 	     = this.props.eventTimeStart + ' - ' + this.props.eventTimeEnd,
			location     = this.props.eventLocation;

		return <p className="event-info">{dateString} <br /> {time} <br /> {location} </p>;
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
		    	<input type="button" className="button" value="RSVP" /> <br />
		    	<input type="button" className="button" value="More Info" />
		    </div>
	      </div>
	    );
	}
});

module.exports = EventBox;
