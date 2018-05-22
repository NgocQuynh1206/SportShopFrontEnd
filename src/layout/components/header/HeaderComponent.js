import React from 'react';
import {Menu, Icon, Layout, Form } from 'antd';
import {Link} from 'react-router-dom';
import Modal from './LoginModal'
import urlConfig from '../../../route/urlConfig';
const {Header} = Layout;
const url = `${urlConfig}/api/login`;
class HeaderComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			visible: false,
		};
	}

	showModal = () => {
		this.setState({
			visible: true,
		});
	}

	handleCancel = () => {
		this.setState({
			visible: false,
		});
	}
	handleLogin = () => {
		const form = this.formRef.props.form;

		form.validateFields((err, values) => {
			if (err) {
				return;
			}
			console.log(values)

			fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			})
			.then(response => response.json())
			.then(data => {
				console.log(data)
			});
		});
	}

	saveFormRef = formRef => {
		this.formRef = formRef;
	};

	render () {
		return (
			<Header className="header">
				<div className="logo" />

				<Modal
					wrappedComponentRef={this.saveFormRef}
					visible={this.state.visible}
					onCancel={this.handleCancel}
					onOk={this.handleLogin}
				/>

				<Menu
				theme="dark"
				mode="horizontal"
				defaultSelectedKeys={['1']}
				style={{ lineHeight: '64px' }}
				>
					<Menu.Item key="1">
						<span>Home</span>
						<Link to='/' />
					</Menu.Item>
					<Menu.Item key="2">
						<span>Products</span>
						<Link to='/product' />
					</Menu.Item>
					<Menu.Item key="3">
						<span>Producers</span>
						<Link to='/producer' />
					</Menu.Item>
					<Menu.Item key="4">
						<span>User</span>
						<Link to='/user' />
					</Menu.Item>

					<Menu.Item key="5" style={{float: 'right'}}>
						<span><Icon type="user"/>Admin</span>
						<Link to='/admin' />
					</Menu.Item>
					<Menu.Item onClick={this.showModal} key="6" style={{float: 'right'}}>
						<span>Log in</span>
					</Menu.Item>

				</Menu>
			</Header>
		);
	}
}
export default Form.create()(HeaderComponent);