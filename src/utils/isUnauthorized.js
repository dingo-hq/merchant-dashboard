import statusCodes from '../constants/statusCodes';

export default function isUnauthorized(error) {
    return error.response.status === statusCodes.UNAUTHORIZED;
}
