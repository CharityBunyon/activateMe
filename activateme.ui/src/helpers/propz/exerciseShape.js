import PropTypes from 'prop-types';

const exerciseShape  = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
})

export default { exerciseShape };