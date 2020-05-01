import React from 'react';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';

export const algoliaClient = algoliasearch(
	process.env.ALGOLIA_APPLICATION_ID,
	process.env.ALGOLIA_SEARCH_KEY,
);

const searchClient = {
	search(requests) {
		if (requests.every(({ params }) => params.query.length < 3)) {
			return Promise.resolve({
				results: requests.map(() => ({
					hits: [],
					nbHits: 0,
					nbPages: 0,
					processingTimeMS: 0,
				})),
			});
		}
		return algoliaClient.search(requests);
	},
};

const AlgoliaSearchProvider = ({ children, useProxy }) => (
	<InstantSearch
		indexName="searchable_data"
		searchClient={useProxy ? searchClient : algoliaClient}
	>
		{children}
	</InstantSearch>
);

AlgoliaSearchProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
		.isRequired,
	useProxy: PropTypes.bool,
};

AlgoliaSearchProvider.defaultProps = {
	useProxy: true,
};

export default AlgoliaSearchProvider;
