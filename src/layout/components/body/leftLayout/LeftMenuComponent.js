import React from 'react';
import {Layout, Input} from 'antd';
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
			</Sider>
		)
	}
}