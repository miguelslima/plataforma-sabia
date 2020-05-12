import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link } from '../components/Link';

const Error = ({ statusCode }) => {
	const { t } = useTranslation(['error']);
	return (
		<Container>
			{statusCode ? (
				<>
					<h1>{statusCode}</h1>
					<h2>
						{statusCode === 404
							? t('notFoundPageError')
							: t('serverError', { statusCode })}
					</h2>
				</>
			) : (
				<h1>{t('clientError')}</h1>
			)}
			<Link href="/">
				<AiOutlineArrowLeft /> {t('backButton')}
			</Link>
		</Container>
	);
};

Error.propTypes = {
	statusCode: PropTypes.number.isRequired,
};

const Container = styled.div`
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.gray98};
	text-align: center;

	h1 {
		color: ${({ theme }) => theme.colors.darkGray};
		font-size: 3.6rem;
		margin-bottom: 1.5rem;
	}

	h2 {
		font-size: 2rem;
	}

	a {
		margin-top: 6rem;
		padding: 1.5rem 3rem;
		display: flex;
		align-items: center;
		background-color: ${({ theme }) => theme.colors.primary};
		color: ${({ theme }) => theme.colors.white};
		text-transform: uppercase;
		border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;

		svg {
			margin-right: 1rem;
		}

		:hover {
			background-color: ${({ theme }) => theme.colors.darkGray};
			color: ${({ theme }) => theme.colors.white};
			cursor: pointer;
		}
	}
`;

Error.getInitialProps = async ({ res, err }) => {
	let statusCode;
	if (res) {
		statusCode = res.statusCode;
	} else if (err) {
		statusCode = err.statusCode;
	} else {
		statusCode = 404;
	}
	return { statusCode, namespacesRequired: ['error'] };
};

export default Error;