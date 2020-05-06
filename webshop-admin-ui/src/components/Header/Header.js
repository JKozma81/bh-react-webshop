import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

export default class Header extends Component {
	render() {
		return (
			<Navbar bg="light" expand="lg" className="w-100 main-header">
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<NavLink
						className="nav-link"
						exact
						activeClassName="selected"
						to="/"
					>
						Dashboard
					</NavLink>
					<NavLink
						className="nav-link"
						activeClassName="selected"
						to="/products"
					>
						Products
					</NavLink>
					{/* Temporary navlink to product upload form */}
					<NavLink
						className="nav-link"
						activeClassName="selected"
						to="/products-upload"
					>
						Termék feltöltés
					</NavLink>
					{/* --- */}
				</Navbar.Collapse>
			</Navbar>
		);
	}
}
