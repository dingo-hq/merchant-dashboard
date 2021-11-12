import { statusCodes } from '../constants';

export default function isUnauthorized(error) {
    return error.response.status === statusCodes.UNAUTHORIZED;
}
