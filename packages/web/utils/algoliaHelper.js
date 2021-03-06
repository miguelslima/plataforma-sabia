import qs from 'query-string';
import { findResultsState as algoliaFindResultsState } from 'react-instantsearch-dom/server';
import { algoliaDefaultConfig } from '../components/Algolia/provider';

const encodedCategories = {
	'agricultura-sequeiro': 'Agricultura de Sequeiro',
	'agricultura-irrigada': 'Agricultura Irrigada',
	aquicultura: 'Aquicultura',
	'areas-degradadas': 'Áreas Degradadas',
	'atividades-agricolas': 'Atividades Agrícolas',
	educacao: 'Educação',
	pecuaria: 'Pecuária',
	'recursos-hidricos': 'Recursos Hídricos',
	'recursos-naturais': 'Recursos Naturais',
	'saneamento-basico': 'Saneamento Básico',
	'sistemas-producao': 'Sistemas de Produção',
};

const decodedCategories = Object.keys(encodedCategories).reduce((acc, key) => {
	const newKey = encodedCategories[key];
	const newValue = key;

	return {
		...acc,
		[newKey]: newValue,
	};
}, {});

const createURL = (state) => {
	const isDefaultRoute =
		!state.query &&
		state.page === 1 &&
		state.refinementList &&
		state.refinementList.category.length === 0;

	if (isDefaultRoute) {
		return '/search';
	}

	const queryParameters = {};

	if (state?.query) {
		queryParameters.query = encodeURIComponent(state.query);
	}
	if (state?.page !== 1) {
		queryParameters.page = state.page;
	}
	if (state?.refinementList?.category) {
		queryParameters.categories = state.refinementList.category
			.map((category) => decodedCategories[category] || category)
			.map(encodeURIComponent);
	}

	const queryString = qs.stringifyUrl(
		{ url: '', query: queryParameters },
		{ arrayFormat: 'comma' },
	);

	return `/search${queryString}`;
};

export const searchStateToURL = (searchState) => (searchState ? createURL(searchState) : '');

export const urlToSearchState = (path) => {
	const url = path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {};
	const { query = '', page = 1 } = url;
	const allCategories = url?.categories ? url.categories.split(',') : [];

	return {
		query: decodeURIComponent(query),
		page: Number(page),
		refinementList: {
			category: allCategories
				.map((category) => encodedCategories[category] || category)
				.map(decodeURIComponent),
		},
	};
};

export const findResultsState = async (app, initialSearchState) => {
	const resultsState = await algoliaFindResultsState(app, {
		...algoliaDefaultConfig,
		searchState: initialSearchState,
	});
	return resultsState;
};
