import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { AiFillDollarCircle, AiOutlineGlobal, AiFillHeart } from 'react-icons/ai';
import { FaBatteryFull, FaCalendarAlt, FaLock, FaUnlock } from 'react-icons/fa';
import { GiRibbonMedal, GiSandsOfTime } from 'react-icons/gi';
import { Link } from '../Link';
import { useTheme } from '../../hooks';
import { formatDistance, getPeriod } from '../../utils/helper';

import {
	CardContainer,
	ImageContainer,
	Badge,
	Content,
	UpContent,
	PrivateContainer,
	LikesContainer,
	MainTitle,
	TextContainer,
	CalendarText,
	PatentText,
	IconsContainer,
} from './styles';

const Card = ({
	title,
	category,
	privateTechnology,
	patent,
	thumbnail,
	date,
	likes,
	installation_time,
	url,
}) => {
	const { colors } = useTheme();
	const { t } = useTranslation(['card', 'helper']);
	return (
		<Link href={url}>
			<CardContainer>
				<ImageContainer>
					<img src={thumbnail} alt={title} />
					<Badge bottom>{category}</Badge>
				</ImageContainer>
				<Content>
					<UpContent>
						<PrivateContainer>
							{privateTechnology ? (
								<>
									<FaLock color={colors.primary} />
									<span>{t('card:privateTechnology')}</span>
								</>
							) : (
								<>
									<FaUnlock color={colors.primary} />
									<span>{t('card:publicTechnology')}</span>
								</>
							)}
						</PrivateContainer>
						<LikesContainer>
							<AiFillHeart color={colors.primary} />
							<span>{likes}</span>
						</LikesContainer>
					</UpContent>
					<MainTitle>{title}</MainTitle>
					<TextContainer>
						<PatentText>
							{patent ? t('card:patented') : t('card:notPatented')}
						</PatentText>
						<CalendarText>
							<FaCalendarAlt color={colors.mediumGray} />
							<span>{formatDistance(t, date)}</span>
						</CalendarText>
					</TextContainer>
					<IconsContainer>
						<div className="left">
							<GiSandsOfTime color={colors.lightGray} />
							<span>{getPeriod(t, installation_time)}</span>
						</div>
						<div className="right">
							<AiFillDollarCircle color={colors.green} />
							<GiRibbonMedal color={colors.mediumGray} />
							<AiOutlineGlobal color={colors.green} />
							<FaBatteryFull color={colors.cyan} />
						</div>
					</IconsContainer>
				</Content>
			</CardContainer>
		</Link>
	);
};

Card.propTypes = {
	title: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	privateTechnology: PropTypes.bool.isRequired,
	patent: PropTypes.bool.isRequired,
	thumbnail: PropTypes.string.isRequired,
	date: PropTypes.instanceOf(Date).isRequired,
	likes: PropTypes.number.isRequired,
	installation_time: PropTypes.number.isRequired,
	url: PropTypes.string.isRequired,
};

export default Card;
