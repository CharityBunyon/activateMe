import PropTypes from 'prop-types';

const workoutLogShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    workoutTypeId: PropTypes.number.isRequired,
})

export default { workoutLogShape };