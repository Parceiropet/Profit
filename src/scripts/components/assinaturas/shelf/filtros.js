import React, { Component } from 'react';
import SVGInline from 'react-svg-inline';
import { icones } from '../../../variables/icones';

class Filtros extends Component{
	render(){
		const { clickFilter } = this.props;
		const { active } = this.props;
		const { showFiltros } = this.props;
		const { filtrosReturn } = this.props;
		if(!this.props.filters.length){
			return null
		}
		const renderItens = this.props.filters.map(function(filtros, index){
			return (
				<li key={filtros.id}
					onClick={clickFilter.bind(this, index)}
					data-texto = {filtros.name}
					data-items = {filtros.items}
				    className={active === index ?  'assinaturas__filtros-list--item filterActive' : 'assinaturas__filtros-list--item'}
				>
					<span>{filtros.name}</span>
					{filtros.items ?
				        <small>
				          {filtros.items} {filtros.items > 1 ? 'itens' : 'item'}
				        </small> : null
				    }
				</li>
			)
		})
		return(
			<div>
				<ul className="assinaturas__filtros-list">
					<li className="assinaturas__filtros--title">
						<span>Período</span>
					</li>
					{renderItens}
				</ul>
				{this.props.showFiltros ? 
					<div className="filtros">
						<div className="filtros__header">
							<span className="return" onClick={filtrosReturn.bind(this)}>
								<SVGInline svg={icones['back']} />
							</span>
							<span>Período</span>
						</div>
						<div className="filtros__list">
						<ul>
							{renderItens}
						</ul>
						</div>
					</div> : null}
				</div>
		)
	}
}

export default Filtros;