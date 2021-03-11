import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { cityToCoords } from '../Utils/api-utils.js';
import { setCoordsInLocalStorage } from '../Utils/local-storage-utils.js';

export default class LocationPrompt extends Component {
	state = {
		city: '',
		coords: '',
	};
	handleLocationSubmit = async (e) => {
		e.preventDefault();

		const coords = await cityToCoords(this.state.city, this.props.token);
		await this.setState({ coords });
		setCoordsInLocalStorage(coords);
		this.setCookies();
	};

	setCookies = () => {
		this.props.cookies.set('city', `${this.state.city}`, {
			path: '/skyview',
		});
	};

	handleCityChange = (e) => {
		this.setState({ city: e.target.value });
	};

	render() {
		const {
			props: { name },
			state: { city },
		} = this;

		return (
			<Form onSubmit={this.handleLocationSubmit}>
				<Form.Group controlId='locationInput'>
					<Form.Label>
						Welcome, {name}! Enter your city to get started.
					</Form.Label>
					<Form.Control
						type='text'
						placeholder='Portland'
						value={city}
						onChange={this.handleCityChange}
					/>
				</Form.Group>
				<Button type='submit'>Go Explore!</Button>
			</Form>
		);
	}
}
