import React from 'react';
import PropTypes from 'prop-types';
import {
	List,
	Datagrid,
	TextField,
	ImageField,
	EditButton,
	DeleteWithConfirmButton,
} from 'react-admin';

const TechnologiesList = ({ basePath, resource, hasCreate, hasEdit, hasList, hasShow }) => (
	<List
		basePath={basePath}
		resource={resource}
		hasCreate={hasCreate}
		hasEdit={hasEdit}
		hasList={hasList}
		hasShow={hasShow}
		perPage={30}
	>
		<Datagrid>
			<TextField source="id" />
			<TextField source="title" />
			<ImageField source="thumbnail" title="title" />
			<TextField source="status" />
			<EditButton />
			<DeleteWithConfirmButton />
		</Datagrid>
	</List>
);
TechnologiesList.propTypes = {
	resource: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	hasCreate: PropTypes.bool.isRequired,
	hasEdit: PropTypes.bool.isRequired,
	hasList: PropTypes.bool.isRequired,
	hasShow: PropTypes.bool.isRequired,
};

export default TechnologiesList;
