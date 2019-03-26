import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Filtros from './filtros';
import Produtos from './produtos';
import Cancelar from './cancelar';

class Shelf extends Component{
	constructor(props){
	    super(props);
	    this.state = {
	    	vtexId: Cookies.get('VtexIdclientAutCookie_parceiropet'),
	    	produtos: [],
	    	filters: [
			    { id: '01', name: 'todos', items: 0 },
			    { id: '02', name: 'semanal', items: 0},
			    { id: '03', name: 'quinzenal', items: 0},
			    { id: '04', name: 'mensal', items: 0},
			    { id: '05', name: 'trimestral', items: 0},
			    { id: '06', name: 'semestral', items: 0},
			    { id: '07', name: 'anual', items: 0}
			],	
			active: 0,
			recId: '',
			recItemId: '',
			activeProduct: '',
			data: {
				status: "inactive"
			},
			dataPlay: {
				status: "active"
			},
			isPause: '',
			empty: true,
			infosActive: '',
			editActive: '',
			qtdy: 1,
			periodoActive: '',
			editPeriodo: '',
			textoFiltro: 'todos',
			dataEdit: {
				quantity: [],
				"frequency": [{
		          "periodicity": "weekly",
		          "interval": 1
		        }]
			}, 
			showFiltros: false,
			showModal: false
	    }	    
	}
	searchRequest() {
    	const url = 'http://www.parceiropet.com/api/parceiropet/subscriptions/me';
	    let self = this;
	    const id = self.state.vtexId;
	    axios.get(url, {
	      headers: {  
	        'Content-Type': 'application/json',
	        'VtexIdclientAutCookie': id 
	      }
	    })
	    .then(function(response) {
	    	console.log('axios');
	    	console.log(response);
	    	self.setState({ 
	    		produtos: response.data.items,
	    		recId: response.data.id ,
	    		empty: false
	    	});
	    })
	    .catch(function (error) {
	    	console.log(error);
	    })
  	}
  	clickFilter = (index, e)=>{
	    this.setState({
	    	active: index,
	    	textoFiltro: e.target.getAttribute('data-texto'),
	    	showFiltros: true

	    });
  	}
  	componentWillMount(){
  		this.searchRequest();
  	}
  	pause(i, e){
  		console.log('pause');
	    this.setState({ recItemId: e.target.parentNode.getAttribute('data-id')}, function () {
			let self = this;
		    const idRec = self.state.recId;
		    const url = 'http://www.parceiropet.com/api/parceiropet/subscriptions/'+this.state.recId+'/items/'+this.state.recItemId;
		    axios.patch(url, this.state.data, {
		      headers: {  
		        'Content-Type': 'application/json',
		        'X-VTEX-API-AppKey': 'vtexappkey-useorganico-BOHCVQ',
		        'X-VTEX-API-AppToken': 'MXQORFYJKMFDYVPZFTFBMRKIEHAWTKDBXLZSMUHLPPFMEJVIUYZMCVIUNHKJEBPZIDGMWXNKLTLXMXEVMSCVLRZBCEFFKYGOAFEADIMXLOAIKLIPCPWMZTORDEKRRIAN'
		      },
		    })
			self.searchRequest();
        }); 	
  	}
  	play(i, e){
  		console.log('play')
	     this.setState({ recItemId: e.target.parentNode.getAttribute('data-id')}, function () {
			let self = this;
		    const idRec = self.state.recId;
		    const url = 'http://www.parceiropet.com/api/parceiropet/subscriptions/'+this.state.recId+'/items/'+this.state.recItemId;
		    axios.patch(url, this.state.dataPlay, {
		      headers: {  
		        'Content-Type': 'application/json',
		        'X-VTEX-API-AppKey': 'vtexappkey-useorganico-BOHCVQ',
		        'X-VTEX-API-AppToken': 'MXQORFYJKMFDYVPZFTFBMRKIEHAWTKDBXLZSMUHLPPFMEJVIUYZMCVIUNHKJEBPZIDGMWXNKLTLXMXEVMSCVLRZBCEFFKYGOAFEADIMXLOAIKLIPCPWMZTORDEKRRIAN'
		      },
		    })
			self.searchRequest(); 
        }); 	
  	}
  	edit(i, e){
  		console.log('edit');
  		this.setState({ recItemId: e.target.parentNode.getAttribute('data-id'), editActive: i}, function () {
			console.log(this.state.recItemId);
        }); 
  	}
  	cancelar(){
  		this.setState({
  			showModal: true
  		})
  	}
  	cancel(){
	    this.setState({ recItemId: e.target.parentNode.getAttribute('data-id')}, function () {
			let self = this;
		    const idRec = self.state.recId;
		    const url = 'http://www.parceiropet.com/api/parceiropet/subscriptions/'+this.state.recId;
		    axios.delete(url, {
		      headers: {  
		        'Content-Type': 'application/json',
		        'X-VTEX-API-AppKey': 'vtexappkey-useorganico-BOHCVQ',
		        'X-VTEX-API-AppToken': 'MXQORFYJKMFDYVPZFTFBMRKIEHAWTKDBXLZSMUHLPPFMEJVIUYZMCVIUNHKJEBPZIDGMWXNKLTLXMXEVMSCVLRZBCEFFKYGOAFEADIMXLOAIKLIPCPWMZTORDEKRRIAN'
		      }
		    })
			self.searchRequest(); 
        }); 
  	}
  	infos(index, el){
  		console.log('infos')
  		this.setState({
	    	itemActive: index
	    });
  	}
  	close(){
  		this.setState({
	    	itemActive: '',
	    	showModal: false
	    });
  	}
  	closeEdit(){
  		this.setState({
	    	editActive: ''
	    });
  	}
  	changeQtyNumbr(event) {
	  	this.setState({ qtdy: event.target.value });
	}
	plusQty() {
		let self = this;

		let data = self.state.dataEdit;
		if (this.state.qtdy === 99) {
	  		return ;
	  	}

	  	this.setState({ qtdy: this.state.qtdy + 1 });
	  	data.quantity = self.state.qtdy;
	}
	minusQty() {
		let self = this;

		let data = self.state.dataEdit;
	  	if (this.state.qtdy === 1) {
	  		return;
	  	}

	  	this.setState({ qtdy: this.state.qtdy - 1 });
	  	data.quantity = self.state.qtdy;
	}
	//solução provisoria
	periodoItem(event){
	    this.setState({ periodoActive: event.currentTarget.getAttribute('data-index'), editPeriodo: event.currentTarget.getAttribute('data-text')}, function () {
			let self = this;

			let data = self.state.dataEdit;

		    const newQuery = {"periodicity": self.state.editPeriodo, "interval": 1};

			var queryFiltered = data.frequency.filter(function(item) {
		      	return item.periodicity === self.state.editPeriodo
		    })

		    data.frequency = queryFiltered;

			data.frequency.push({"periodicity": self.state.editPeriodo, "interval": 1})
	
			console.log(data.quantity);

			data.quantity = self.state.qtdy;

			console.log(this.state.dataEdit);
 
        });
	}
	confirmEdit(){
		console.log('clicou para confirmar');
		let self = this;
		console.log(this.state.dataEdit);
	   	const url = 'http://www.parceiropet.com/api/parceiropet/subscriptions/'+this.state.recId+'/items/'+this.state.recItemId;
	    axios.patch(url, self.state.dataEdit, {
	      headers: {  
	        'Content-Type': 'application/json',
	        'X-VTEX-API-AppKey': 'vtexappkey-useorganico-BOHCVQ',
	        'X-VTEX-API-AppToken': 'MXQORFYJKMFDYVPZFTFBMRKIEHAWTKDBXLZSMUHLPPFMEJVIUYZMCVIUNHKJEBPZIDGMWXNKLTLXMXEVMSCVLRZBCEFFKYGOAFEADIMXLOAIKLIPCPWMZTORDEKRRIAN'
	      },
	    })
		.then(function() {
	    	alert('Assinatura atualizada com sucesso!')
			self.searchRequest(); 
	    })
	    .catch(function (error) {
	    	console.log(error);
	    })
	}
	filtrosReturn(){
		this.setState({
	    	showFiltros: false
	    });
	}
	render(){
		return(
			<div>
				{this.state.showModal ? 
					<div className="assinaturas__overlay"></div> : null }
				<div className="assinaturas__filtros">
					<Filtros
						filters={this.state.filters}
						showFiltros = {this.state.showFiltros}
						filtrosReturn = {this.filtrosReturn.bind(this)}
						clickFilter={this.clickFilter.bind(this)}
						active={this.state.active} />
				</div>
				<div className="assinaturas__cancelar">
					<Cancelar 
					showModal ={this.state.showModal}
					cancelar ={this.cancelar.bind(this)}
					cancel = {this.cancel.bind(this)}
					close = {this.close.bind(this)}/>
				</div>
				<div className={"assinaturas__shelf "+ this.state.textoFiltro}>
						{this.state.empty ? 
						<div className="empty">
							<span>Você não tem assinaturas :( </span>
						</div> :
				       	<Produtos 
				        	produtos={this.state.produtos} 
				        	pause={this.pause.bind(this)}
				        	infos={this.infos.bind(this)}
				        	edit={this.edit.bind(this)}
				        	close={this.close.bind(this)}
				        	closeEdit={this.closeEdit.bind(this)}
				        	isPause = {this.state.isPause}
				        	infosActive = {this.state.itemActive}
				        	editActive = {this.state.editActive}
				        	changeQtyNumbr = {this.changeQtyNumbr.bind(this)}
				        	plusQty = {this.plusQty.bind(this)}
				        	minusQty = {this.minusQty.bind(this)}
				        	qtdy = {this.state.qtdy}
				        	play={this.play.bind(this)}
				        	periodoItem={this.periodoItem.bind(this)}
				        	confirmEdit={this.confirmEdit.bind(this)}
				        	periodoActive={this.state.periodoActive} />
				        }
				</div> 
			</div>
		)
	}
}

export default Shelf;