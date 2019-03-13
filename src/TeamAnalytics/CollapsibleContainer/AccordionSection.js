import React, { Component } from 'react';

export default class AccordionSection extends Component {
	render() {
		const { onClick, isOpen, label } = this.props;
		return (
			<div className="analytics-section">
				<h1 onClick={() => onClick(label)} className='comp'>
					{label}
					<span
						style={{
							float: 'right',
							fontWeight: 'normal',
							fontSize: '0.7em',
							padding: '6px'
						}}
						className={''}
					>
						{isOpen ? '\u25b2' : '\u25bc'}
					</span>
				</h1>
				{isOpen && (
					<div>
						{this.props.children}
					</div>
				)}
			</div>
		);
	}
}
