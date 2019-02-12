import React, { Component } from 'react';
import { render } from 'react-dom';

import Accordion from './Accordion';

class Team extends Component {
  render() {
    return(
      <div>
      <h1>Robot Information</h1>
      <Accordion allowMultipleOpen>
        <div label='Overall' isOpen>
          <p><strong>Common Name:</strong> American Alligator</p>
          <p><strong>Distribution:</strong> Texas to North Carolina, US</p>
          <p><strong>Endangered Status:</strong> Currently Not Endangered</p>
        </div>
        <div label='Cycles'>
          <p><strong>Common Name:</strong> Chinese Alligator</p>
          <p><strong>Distribution:</strong> Eastern China</p>
          <p><strong>Endangered Status:</strong> Critically Endangered</p>
        </div>
        <div label='Pregame'>
          <p><strong>Common Name:</strong> Chinese Alligator</p>
          <p><strong>Distribution:</strong> Eastern China</p>
          <p><strong>Endangered Status:</strong> Critically Endangered</p>
        </div>
        <div label='Endgame'>
          <p><strong>Common Name:</strong> Chinese Alligator</p>
          <p><strong>Distribution:</strong> Eastern China</p>
          <p><strong>Endangered Status:</strong> Critically Endangered</p>
        </div>
        <div label='Miscellaneous'>
          <p><strong>Common Name:</strong> Chinese Alligator</p>
          <p><strong>Distribution:</strong> Eastern China</p>
          <p><strong>Endangered Status:</strong> Critically Endangered</p>
        </div>
        <div label='Comments'>
          <p><strong>Common Name:</strong> Chinese Alligator</p>
          <p><strong>Distribution:</strong> Eastern China</p>
          <p><strong>Endangered Status:</strong> Critically Endangered</p>
        </div>
      </Accordion>
    </div>
    );
  }
}

export default Team;
