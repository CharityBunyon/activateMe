import PropTypes from 'prop-types';

const badgeShape = PropTypes.shape({
    badgeId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    pointValue: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
})

export default { badgeShape };