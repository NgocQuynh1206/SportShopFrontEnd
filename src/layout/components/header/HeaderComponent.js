import React from 'react';
import {Menu, Icon, Layout} from 'antd';
import {Link} from 'react-router-dom';
const {Header} = Layout;
export default class HeaderComponent extends React.Component {
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

					<Menu.Item key="5" style={{float: 'right'}}>
						<span><Icon type="user"/>Admin</span>
						<Link to='/admin' />
					</Menu.Item>
				</Menu>
			</Header>
		);
	}
}