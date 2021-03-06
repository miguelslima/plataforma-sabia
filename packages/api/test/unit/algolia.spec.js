const { test, trait } = use('Test/Suite')('Algolia');
const AlgoliaSearch = use('App/Services/AlgoliaSearch');
const Factory = use('Factory');

trait('DatabaseTransactions');

const TechnologyFaker = Factory.model('App/Models/Technology');

test('algoliasearch.deleteObject is called when destroying a technology', async ({ assert }) => {
	const technology = await TechnologyFaker.create();
	await technology.delete();
	assert.isTrue(
		AlgoliaSearch.initIndex().deleteObject.withArgs(technology.toJSON().objectID).calledOnce,
	);
});
