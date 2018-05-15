import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import Header from './components/header/HeaderComponent.js';
import LeftMenu from './components/body/leftLayout/LeftMenuComponent.js';
import MainBody from '../route/router.js';

export default class RenderingMain extends React.Component {
	render()
	{
		return (
			<React.Fragment>
				<Header />
				<Layout>
					<LeftMenu />
					<Layout style={{ padding: '0 24px 24px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}/>
						<MainBody />
					</Layout>
				</Layout>
			</React.Fragment>
		)
	}
}