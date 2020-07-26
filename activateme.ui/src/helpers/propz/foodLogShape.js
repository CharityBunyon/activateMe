import PropTypes from 'prop-types';

const foodLogShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    foodTypeId: PropTypes.number.isRequired,
})

export default { foodLogShape };