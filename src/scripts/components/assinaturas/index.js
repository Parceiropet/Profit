import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Shelf from './shelf';

class Index extends Component{
	render(){
		return(
			<div className="assinaturas">	
				<Shelf />			
			</div>
		)
	}
}

ReactDOM.render(
  <Index />,
  document.getElementById('react-app')
);