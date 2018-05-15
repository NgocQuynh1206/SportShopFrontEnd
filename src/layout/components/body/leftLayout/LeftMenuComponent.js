import React from 'react';
import {Menu, Layout, Input} from 'antd';
const {Sider} = Layout;
const {Search} = Input;
export default class LeftMenu extends React.Component {
	render () 
	{
		return (
			<Sider width={200} style={{ background: '#fff' }}>
				<Search
			      placeholder="Search"
			      onSearch={value => console.log(value)}
			      enterButton
			      style={{marginTop: '4%', marginLeft: '2.5%', width: '95%'}}
			    />
				<Menu
				mode="inline"
				style={{ height: '100%', borderRight: 0 }}
				>
				 <Menu.Item>Item 1</Menu.Item>
				 <Menu.Item>Item 2</Menu.Item>
				 <Menu.Item>Item 3</Menu.Item>
				</Menu>
			</Sider>
		)
	}
}