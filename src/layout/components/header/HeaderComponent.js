import React from 'react';
import {Menu, Icon, Layout, Modal, message, Form} from 'antd';
import {Link} from 'react-router-dom';
import LoginModal from './LoginModal'
import urlConfig from '../../../route/urlConfig';
const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const url = `${urlConfig}/api/login`;

class HeaderComponent extends React.Component {
	constructor() {
		super()
		this.state = {
			visible: false,
			login_visible: false,
			email: '',
		}
	}
	onChangeEmail = (e) => {
		this.setState({email: e.target.value})
	}
	cancel = () => {
		this.setState({visible: false, check: false});
	}
	handleOk = () => {
		fetch(`${urlConfig}/api/createbyadmin`, {
			method: 'POST', 
			headers: {'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.token}`},
			body: JSON.stringify({email: this.state.email}),
  		})
  		.then(res => res.json())
		.then(result => {
			if (result.error) {
				message.error(result.error,2);
			}
			else {
				message.success('Invitation successful!',2);
			}
		})
		.catch(err => console.log(err));
		this.setState({visible: false});
	}

	showModal = () => {
		this.setState({
			login_visible: true,
		});
	}

	handleCancel = () => {
		this.setState({
			login_visible: false,
		});
	}
	handleLogin = () => {
		const form = this.formRef.props.form;

		form.validateFields((err, values) => {
			if (err) {
				return;
			}

			fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			})
			.then(response => response.json())
			.then(data => {
				if (data.token) {
					localStorage.setItem("token", data.token);
					this.props.setToken();
					message.success('Login success!');
				}
				else {
					message.error('Login fail!');
				}
				this.setState ({
					login_visible: false
				})
			});
		});
	}

	saveFormRef = formRef => {
		this.formRef = formRef;
	};

	logOut = () => {
		this.props.removeToken();
		message.success('Logout success!');
	}
	render () {
		return (
			<Header className="header">
				<div className="logo" />

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

					{(this.props.token) ? (
				        	<SubMenu key="sub1" style={{float: 'right'}} title={<span><Icon style={{ fontSize: 24 }} type="contacts"/></span>}>
				        		<Menu.Item key="7">Details</Menu.Item>
					            <Menu.Item key="8" onClick={this.logOut}>Log out</Menu.Item>
				        	</SubMenu>
			        	) : (
			        	<Menu.Item onClick={this.showModal} key="7" style={{float: 'right'}}>
							<span>Log in</span>
						</Menu.Item>
						
			        )}

					{(this.props.token) ? (<Menu.Item key="6" style={{float: 'right'}} onClick={() => this.setState({visible: true})}>
						<span><Icon type="user-add"/>Invite</span>
					</Menu.Item>) : null}
					<Modal
			          title="Invitation"
			          style={{marginLeft: '60%'}}
			          visible={this.state.visible}
			          onOk={() => this.handleOk()}
			          onCancel={() => this.cancel()}
			        >
			        	<div>Email {' '}<input value={this.state.email} type="email" style={{width: '80%', marginLeft: '20px'}} onChange={this.onChangeEmail}/>
			        	</div>
			        </Modal>
			        
			        <LoginModal
							wrappedComponentRef={this.saveFormRef}
							visible={this.state.login_visible}
							onCancel={this.handleCancel}
							onOk={this.handleLogin}
					/>

				</Menu>
			</Header>
		);
	}
}
export default Form.create()(HeaderComponent);