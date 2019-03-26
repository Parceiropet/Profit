import React, { Component } from 'react';
import SVGInline from 'react-svg-inline';
import { icones } from '../../../variables/icones';

class Cancelar extends Component {
	render(){
		const { cancelar, cancel, close, showModal }  = this.props;
		return(
			<div>
				<span className="assinaturas__cancelar--title" onClick={cancelar.bind(this)}> Cancelar minha assinatura</span>
				{this.props.showModal ? 
					<div className="assinaturas__modal">
						<div className="assinaturas__modal--header">
							<SVGInline svg={icones['close']} onClick={close.bind(this)}/>
						</div>
						<div className="assinaturas__modal--content">
							<span> Deseja cancelar a assinatura de todos os seus itens?</span>
						</div>
						<div className="assinaturas__modal--buttons">
							<span className="btn btn--close" onClick={close.bind(this)}>Não</span>
							<span className="btn btn--confirmar" onClick={cancel.bind(this)}>Confirmar</span>
						</div>
					</div>
				: null }
			</div>
			
		)
	}
}

export default Cancelar;