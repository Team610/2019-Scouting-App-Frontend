import React, { Component } from 'react';
import AccordionSection from './AccordionSection';

export default class Accordion extends Component {
	constructor(props) {
		super(props);
		this.sections = this.props.sections;
	}
	handleClick = label => {
		this.sections[label] = !!!this.sections[label];
		this.props.changeSections(this.sections);
	}
	render() {
		const openSections = this.sections;
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
