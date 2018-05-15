import React from 'react';
import {Layout, Table, Popconfirm} from 'antd';
import urlConfig from '../../../../route/urlConfig';
const {Content} = Layout
const url = `${urlConfig}/api/user`;

export default class User extends React.Component {
	constructor(){
		super();
		this.state = {
			users: []
		}
	}
	componentDidMount() {
		fetch(url)
		.then(res => res.json())
		.then(data => {
			data.map(element => element.key = element.id);
			this.setState({users: data})
		})
		.catch(err => console.log(err))
	}

	onDelete = (key) => {
		fetch(`${url}/${key}`, {
			method: "DELETE"
		})
		.then(res => res.json())
		.then(data => {
			const {users} = this.state;
			this.setState({ users: users.filter(item => item.key !== key) });
		})
		.catch(err => console.log(err))	
	}

	render() {
		const columns = [{
			title: 'Email',
			dataIndex: 'email',
			key: 'email'
		}, {
			title: 'FirstName',
			dataIndex: 'firstname',
			key: 'firstname'
		}, {
			title: 'LastName',
			dataIndex: 'lastname',
			key: 'lastname'
		}, {
			title: 'Address',
			dataIndex: 'address',
			key: 'address'
		}, {
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone'
		}, {
			title: 'Action',
			dataIndex: '',
			key: 'x',
			render: (text, record) => {
				return (
					this.state.users.length > 0 ?
					(
						<Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
							<a>Delete</a>
						</Popconfirm>
						) : null
					);
			},
		}]

		return (	
			<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
				<Table dataSource={this.state.users} columns={columns} />
			</Content>
			)
	}
}