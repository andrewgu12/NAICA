require('babel-register');

var React = require('react');
var EventBox = require('../generic/event.react');

var EventsList = React.createClass({
	render: function() {
		var eventNodes = this.props.events.map((event) => {
			return (
				<EventBox event={event} />
			);
		});
		return (
			<div className="events-list">
				{eventNodes}
			</div>
		);
	}
});

module.exports = EventsList;