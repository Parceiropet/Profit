import React, { Component } from 'react';

class Editar extends Component {
	render(){
		return(
			<div className="card__side card__side--back card__side--back-infos">
				<div className="card__header">
					<span className="title">Mais informações</span>
					<SVGInline svg={icones['close']} />
				</div>	
				<div className="card__content">
					<div className="card__price">
						<ul>
							<li>
								<span>Preço (und)</span>
								<span>R$ {produto.price}</span>
							</li>
							<li>
								<span>Preço (total)</span>
								<span>R$ {produto.price}</span>
							</li>
						</ul>
					</div>
					<div className="card__data">
						<span> Iniciada em {produto.startTime}</span>
					</div>
				</div>
			</div>
		)
	}
}

export default Editar;