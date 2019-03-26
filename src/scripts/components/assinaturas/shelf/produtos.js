import React, { Component } from 'react';
import SVGInline from 'react-svg-inline';
import { icones } from '../../../variables/icones';
import { parseImageUrl } from '../../utils/index';
import { dataFormatada } from '../../utils/index';
import Pausar from './pause';
import Infos from './infos';

class Produtos extends Component{
	render(){ 
		if (!this.props.produtos.length) {
			return null;
		}	 
		const { pause, play, infos, edit, close, closeEdit, infosActive, editActive, changeQtyNumbr, qtdy, minusQty, plusQty, periodoItem, periodoActive, confirmEdit} = this.props;
		const renderItems = this.props.produtos.map(function(produto, index) {
			const imageUrl = parseImageUrl(produto.imageUrl);
			const data = dataFormatada(produto.nextDelivery); 
			const periodicity = produto.frequency.periodicity;
			return (
				<li key={produto.id} className={produto.status == 'INACTIVE' ?  'assinaturas__shelf-list--item '+periodicity+' showPause' : 'assinaturas__shelf-list--item '+periodicity}>
					<div className="card">
						<div className="card__side card__side--front">
							
							<div className="product">
								<div className="product-image">
									<img src={imageUrl} className="img" />
								</div>
								<div className="product-actions">
									<div className="product-infos">
										<span className="product-name">{produto.name}</span>
										<span className="product-qtd">qtd
											<strong className="number">{produto.quantity}</strong>
										</span>
									</div>
									<div className="product-buttons" data-id={produto.id}>
										{
											produto.status == 'INACTIVE' ?
											<a className="btn btn--play" onClick={play.bind(this, index)}>
												<SVGInline svg={icones['play']} />
												<span className="text">Reiniciar</span>
											</a> :
											<a className="btn btn--pause" onClick={pause.bind(this, index)}>
												<SVGInline svg={icones['pause']} />
												<span className="text">Pausar</span>
											</a>
										}
										<a className="btn btn--edit" onClick={edit.bind(this, index)}>
											<SVGInline svg={icones['edit']} />
											<span className="text">Editar</span>
										</a>
									</div>
								</div>
							</div>
							<div className="product-data">
								<span>Próxima entrega dia <span className="data">{data}</span></span>
							</div>
							<a className="product-more" onClick={infos.bind(this, index)}>
								<span>Mais informações sobre a assinatura</span>
							</a>
						</div>
						<Pausar />
						<div className={infosActive === index ?  'card__side card__side--back card__side--infos active' : 'card__side card__side--back card__side--infos'}>
							<div className="card__header">
								<span className="title">Mais informações</span>
								<SVGInline svg={icones['close']} onClick={close.bind(this, index)}/>
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
						<div className={editActive === index ?  'card__side card__side--back card__side--edit active' : 'card__side card__side--back card__side--edit'}>
							<div className="card__header">
								<span className="title">Editar</span>
								<SVGInline svg={icones['close']} onClick={closeEdit.bind(this, index)}/>
							</div>	
							<div className="card__content">
								<div className="quantidade">
									<span>Quantidade</span>
									<div className="quantidade__input">
										<button className="quantidade__btn controle-qt-minus" onClick={minusQty.bind(this)}>-</button>
								        <input  type="text"
							            	min="1"
							              	pattern="[0-9]+"
							              	className="quantidade__val"
							              	aria-label="qtd"
							              	value={qtdy}
							              	onChange={changeQtyNumbr.bind(this)}
							            />
								        <button className="quantidade__btn controle-qt-plus" onClick={plusQty.bind(this)}>+</button>
									</div>
								</div>
								<div className="periodo">
									<span>Periodicidade</span>
									<div className="periodo-list">
										
										<a data-index="0"  data-text="daily" className={periodoActive == 0 ?  'periodo-ativo' : ''} onClick={periodoItem.bind(this)}>Diário</a>
									
									
										<a data-index="1" data-text="weekly" className={periodoActive == 1 ?  'periodo-ativo' : ''} onClick={periodoItem.bind(this)}>Semanal</a>
									
									
										<a data-index="2" data-text="monthly" className={periodoActive == 2 ?  'periodo-ativo' : ''} onClick={periodoItem.bind(this)}>Mensal</a>
									
									
										<a data-index="4" data-text="yearly" className={periodoActive == 4 ?  'periodo-ativo' : ''} onClick={periodoItem.bind(this)}>Anual</a>
										
									</div>
								</div>
								<div className="card__button">
									<span onClick={confirmEdit.bind(this)}>Confirmar</span>
								</div>
							</div>
						</div>
					</div> 
				</li>
			)
		})

		return (
			<div>
			<ul className="assinaturas__shelf-list semanal">
				<div className="assinaturas__shelf--title">
					<span>Assinaturas Semanais</span>
				</div>
				{renderItems}
			</ul>
			<ul className="assinaturas__shelf-list quinzenal">
				<div className="assinaturas__shelf--title">
					<span>Assinaturas Quinzenais</span>
				</div>
				{renderItems}
			</ul>
			<ul className="assinaturas__shelf-list mensal">
				<div className="assinaturas__shelf--title">
					<span>Assinaturas Mensais</span>
				</div>
				{renderItems}
			</ul>
			<ul className="assinaturas__shelf-list trimestral">
				<div className="assinaturas__shelf--title">
					<span>Assinaturas Trimestrais</span>
				</div>
				{renderItems}
			</ul>
			<ul className="assinaturas__shelf-list semestral">
				<div className="assinaturas__shelf--title">
					<span>Assinaturas Semestrais</span>
				</div>
				{renderItems}
			</ul>
			<ul className="assinaturas__shelf-list anual">
				<div className="assinaturas__shelf--title">
					<span>Assinaturas Anuais</span>
				</div>
				{renderItems}
			</ul>
			</div>
		)
	}
}

export default Produtos;