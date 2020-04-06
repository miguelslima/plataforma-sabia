export const technologies = [
	{
		id: 1,
		title: 'Barragem Subterrânea',
		image: '/card-image.jpg',
		place: 'UFERSA/RN',
		date: new Date('2019-06-22'),
		likes: 6,
		weeks: 2,
		region: 'Nordeste',
		url: '/',
	},
	{
		id: 2,
		title: 'Bomba a Energia Solar',
		image: '/card-image2.jpg',
		place: 'INSA/PB',
		date: new Date('2019-06-22'),
		likes: 18,
		weeks: 7,
		region: 'Sudeste',
		url: '/',
	},
	{
		id: 3,
		title: 'Cisterna Pré-moldada',
		image: '/card-image3.jpg',
		place: 'EMATER/RN',
		date: new Date('2019-09-22'),
		likes: 6,
		weeks: 2,
		region: 'Nordeste',
		url: '/',
	},
	{
		id: 4,
		title: 'Cisterna Pré-moldada',
		image: '/card-image3.jpg',
		place: 'EMATER/RN',
		date: new Date('2017-09-22'),
		likes: 6,
		weeks: 2,
		region: 'Nordeste',
		url: '/',
	},
];

export const fullTechnologies = [
	...technologies,
	...technologies.map((technology) => ({ ...technology, id: technology.id * 10 })),
];
