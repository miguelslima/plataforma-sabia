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

const AlgoliaSearchProvider = ({
	children,
	useProxy,
	searchState,
	onSearchStateChange,
	createURL,
}) => (
	<InstantSearch
		indexName="searchable_data"
		searchClient={useProxy ? searchClient : algoliaClient}
		onSearchStateChange={onSearchStateChange}
		searchState={searchState}
		createURL={createURL}
	>
		{children}
	</InstantSearch>
);

AlgoliaSearchProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
		.isRequired,
	useProxy: PropTypes.bool,
	searchState: PropTypes.shape({}),
	onSearchStateChange: PropTypes.func,
	createURL: PropTypes.func,
};

AlgoliaSearchProvider.defaultProps = {
	useProxy: true,
	searchState: undefined,
	onSearchStateChange: undefined,
	createURL: undefined,
};

export default AlgoliaSearchProvider;
