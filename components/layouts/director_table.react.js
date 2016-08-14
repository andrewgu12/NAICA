require('babel-register');

var React = require('react');
var DirectorBox = require('../generic/director.react');
var DirectorTable = React.createClass({
	render: function() {
		

		var directorBoxes = this.props.directors.map((director) => {
			return (
				<DirectorBox director={director} />
			);
		});
		return (
			<div className="director-container">
				{directorBoxes}
			</div>
		);
	}
});

module.exports = DirectorTable;