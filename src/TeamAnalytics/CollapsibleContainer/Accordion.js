import React, { Component } from 'react';
import AccordionSection from './AccordionSection';

export default class Accordion extends Component {
	constructor(props) {
		super(props);
		this.state = { openSections: { Overall: true } };
	}
	handleClick = label => {
		let openList = this.state.openSections;
		openList[label] = !!!openList[label];
		this.setState({
			openSections: openList
		});
	}
	render() {
		const openSections = this.state.openSections;
		let sections = [];
		for (let child of this.props.children) {
			if (child)
				sections.push(
					<AccordionSection
						key={child.props.label}
						isOpen={!!openSections[child.props.label]}
						label={child.props.label}
						onClick={this.handleClick}
					>
						{child.props.children ? child.props.children : child}
					</AccordionSection>
				);
		}
		return (
			<div>
				{sections}
			</div>
		);
	}
}
