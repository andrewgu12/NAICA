var React = require('react');

var DirectorTextBox = React.createClass({
	// Arguments passed in: Description
	render: function() {
		var text = {this.props.description};
		return <div></div>;
	}
})

DirectorTextBox.styles = {
	scrollbox: {
		// Place CSS animation for entering here
	}
}

var Director = React.createClass({
	// Arguments passed in: Name, Description, Image
	render: function() {
		return (
			<div>
				<img src={this.props.profile}>
				<DirectorTextBox description={this.props.description}>
			</div>)

	}
	mouseOver: function() {
		// Change DirectorTextBox display

	} 
	mouseOut: function() {
		// Change DirectorTextBox display to none
	}
});