import {DecodeToken} from "../utilities/tokenUtls.js";

export default (req, res, next) => {
    let token = req.cookies['Token'];
    let decoded = DecodeToken(token)

    if (decoded === null) {
        res.status(401).json({status: 'fail', message: 'Unauthorized.'});
    } else {
        let options = {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        };
        res.cookie('Token', decoded.RefreshToken, options);
        let email = decoded.email;
        req.headers.email = email;
        next();
    }
}