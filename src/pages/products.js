import React from 'react';

import { List, Datagrid, TextField, BooleanField, Create, SimpleForm, TextInput, BooleanInput } from 'react-admin';

export const ProductList = (props) => {
	return (
		<List {...props}>
			<Datagrid>
				<TextField source="id" />
				<TextField source="name" />
				<BooleanField source="is_active" />
			</Datagrid>
		</List>
	);
};

export const ProductCreate = (props) => {
	return (
		<Create {...props}>
			<SimpleForm>
				<TextInput label="Enter product name" source="name" />
				<TextInput label="Enter price" source="price" />
				<TextInput label="Enter image path" source="image_path" />
				<BooleanInput label="Is Active?" source="is_active" />
			</SimpleForm>
		</Create>
	)
}
