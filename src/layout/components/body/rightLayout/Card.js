import React from 'react'
import FormModal from './EditModal'
import { Card, Icon, Modal } from 'antd';
import urlConfig from '../../../../route/urlConfig';
const confirm = Modal.confirm;
const { Meta } = Card;
const url = `${urlConfig}/api/sanpham`;

class CardComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			visible: false,
			detail: false,
		};
	}

	showModal = () => {
		this.setState({
			visible: true,
		})
	}

	setFormFields = data => {
		this.formRef.props.form.setFieldsValue({
			tensanpham: data.tensanpham,
			gia: data.gia,
			soluong: data.soluong,
			hinhanh: data.hinhanh,
			loaisanpham: data.loaisanpham,
			luotxem: data.luotxem,
			daban: data.daban,
			ngaynhap: data.ngaynhap
		});
	};

	showEditModal = () => {
		this.setState({ visible: true });
		fetch(`${url}/${this.props.infoCard.masanpham}`, {
			method: 'GET',
		})
			.then(response => response.json())
			.then(data => {
				this.setFormFields(data[0]);
			})
			.catch(err => console.error(err));
	};
	handleEditCancel = e => {
		this.setState({
			visible: false,
			detail: false,
		});
	};
	handleEditOk = () => {
		const form = this.formRef.props.form;
		const id = this.props.infoCard.masanpham;
		form.validateFields((err, values) => {
			if (err) {
				return;
			}
			fetch(`${url}/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.token}`,
				},
				body: JSON.stringify(values),
			})
				.then(response => response.json())
				.then(data => {
					this.props.editCard(data, this.props.index);
				})
				.catch(err => this.openNotification('error', err));
			form.resetFields();
			this.setState({ visible: false });
		});
	};
	saveFormRef = formRef => {
		this.formRef = formRef;
	};

	showDeleteModal = () => {
		const id = this.props.infoCard.masanpham;
		const deleteCard = (id) => this.props.deleteCard(id);
		const name = this.props.infoCard.tensanpham;
		confirm({
		    title: 'Do you Want to delete this product?',
		    content: name,
		    onOk() {
		    	deleteCard(id)
		    },
		    onCancel() {
		      console.log('Cancel');
		    },
		  });
	}


	render () {
		return (
				<Card
					hoverable
					style={{ width: 240 }}
					cover={<img alt={this.props.infoCard.tensanpham} src={this.props.infoCard.hinhanh} height="100%"
					width="100%" onClick={() => this.setState({detail: true})}/>}
					actions={[<Icon onClick={this.showEditModal} type="edit" />, <Icon onClick={this.showDeleteModal} type="delete" />]}
				>
				<Meta
					title={this.props.infoCard.tensanpham}
					description={`Amount: ${this.props.infoCard.gia}`}
				/>

				<FormModal
					wrappedComponentRef={this.saveFormRef}
					visible={this.state.visible}
					onOk={this.handleEditOk}
					onCancel={this.handleEditCancel}
					titleModal="Update"
					editCard={this.props.editCard}
					deleteCard={this.props.deleteCard}
				/>

				<Modal
					title={this.props.infoCard.tensanpham}
          			visible={this.state.detail}
          			onOk={this.handleEditCancel}
          			onCancel={this.handleEditCancel}
				>
				<table>
					<tr>
					<td style={{width: '200px', height: '250px'}}><img alt={this.props.infoCard.tensanpham} src={this.props.infoCard.hinhanh} width="90%%" height="100%"/></td>
					<td>
					<tr>
						<label>ID: </label>
						<span>{this.props.infoCard.masanpham}</span>
					</tr>
					<tr>
						<label>Price: </label>
						<span>{this.props.infoCard.gia}</span>
					</tr>
					<tr>
						<label>Quantity: </label>
						<span>{this.props.infoCard.soluong}</span>
					</tr>
					<tr>
						<label>Looked: </label>
						<span>{this.props.infoCard.luotxem}</span>
					</tr>
					<tr>
						<label>Sold: </label>
						<span>{this.props.infoCard.daban}</span>
					</tr>
					<tr>
						<label>Date: </label>
						<span>{this.props.infoCard.ngaynhap}</span>
					</tr>
					</td>
					</tr>
				</table>
				</Modal>
				</Card>
				
			)
	}
	
}

export default CardComponent