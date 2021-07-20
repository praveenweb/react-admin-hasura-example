import React from "react";

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
	)
}

export const ProductCreate = (props) => (
	<Create {...props}>
	    <SimpleForm>
		<TextInput source="name" />
		<TextInput source="image_url" />
		<TextInput source="price" />
		<BooleanInput source="is_active" label="Is Active?"/>
	    </SimpleForm>
	</Create>
    );