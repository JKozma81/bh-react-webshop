import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';

export default class ErrorDisplay extends Component {
	render() {
		return (
			<Container className="p-3">
				{this.props.errors.length > 0 &&
					this.props.errors.map((err, idx) => {
						if (
							err.type === 'application' ||
							err.type === 'validation'
						) {
							return (
								<p className="error" key={`err_text_${idx}`}>
									{err.message}
								</p>
							);
						}
						return <p key={`err_text_${idx}`}>{err.message}</p>;
					})}
				{this.props.missingFields.length > 0 && (
					<ul className="error">
						{this.props.missingFields.map((missingField, idx) => (
							<li key={`missing_${idx}`}>
								{`${missingField} is missing!`}
							</li>
						))}
					</ul>
				)}
			</Container>
		);
	}
}
