//src/Root.js

import React from 'react';
import $ from 'jquery';
import './jquery.changeStyle';

export default class Root extends React.Component {
    componentDidMount() {
        $("#hello").text('change to other text');
        $("#hello").changeStyle('pink');
    }
    render() {
        return (
        <div style={{textAlign: 'center'}}>
            <h1 id="hello">Hello World11</h1>
        </div>);
        
    }
}