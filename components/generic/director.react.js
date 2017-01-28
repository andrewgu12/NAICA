var React = require('react');

var DirectorTextBox = React.createClass({
	// Arguments passed in: Description
	render: function() {
		return <div className='director-hover'><div className='director-description'>{this.props.description}</div></div>;	
	}
})

var DirectorBox = React.createClass({
	// Arguments passed in: Name, Description, Image
	render: function() {
		return (
			<div className="director">
				<img className="director-profile" src={this.props.director.imgSource}></img>
				<DirectorTextBox description={this.props.director.description} />
			</div>
		);

	}
});

module.exports = DirectorBox;