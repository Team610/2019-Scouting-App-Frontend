import React, {Component} from 'react';
import PieMenu, { Slice } from "react-pie-menu";

export default class Menu extends Component {
	constructor(props) {
		super(props);
		this.sliceList = [];
		for (let i=0; i<this.props.slices.length; i++) {
			let slice = this.props.slices[i]
			if (slice.blank) {
				this.sliceList.push(<Slice key={i} />);
				continue;
			}
			this.sliceList.push(
				<Slice
					key={i}
					onSelect={() => {
						// console.log(slice.logMsg);
						this.props.func(slice.val);
					}}
				>
					<span className="nonSelectable">{slice.label}</span>
				</Slice>
			);
		}
	}
	render() {
		return (
			<PieMenu
				radius="125px"
				centerRadius="25px"
				centerX={`${this.props.mouseX}px`}
				centerY={`${this.props.mouseY}px`}
			>
				{this.sliceList}
			</PieMenu>
		);
	}
}
