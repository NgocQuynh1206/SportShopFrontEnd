import React from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;

class FormModal extends React.Component {
	render() {
		const { getFieldDecorator } = this.props.formField;
		return (
			<Form layout="vertical">
				<FormItem label="Name">
					{getFieldDecorator('tensanpham', {
						rules: [
							{
								required: true,
								message:
									'Please input the name of product!',
							},
						],
					})(<Input />)}
				</FormItem>
				<FormItem label="Price">
					{getFieldDecorator('gia')(
						<Input type="textarea" />
					)}
				</FormItem>
				<FormItem label="Amount">
					{getFieldDecorator('soluong')(
						<Input type="textarea" />
					)}
				</FormItem>
				<FormItem label="Image URL">
					{getFieldDecorator('hinhanh')(<Input type="textarea" />)}
				</FormItem>
				<FormItem label="Category">
					{getFieldDecorator('loaisanpham')(<Input type="textarea" />)}
				</FormItem>
			</Form>
		);
	}
}

export default FormModal;
