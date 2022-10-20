import jwt from 'jsonwebtoken';

const signJwt = (id = '') => {
    return new Promise( (resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, process.env.JWT_TOKEN_KEY_DEV, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject( 'No se pudo generar el JWT' )
            } else {
                resolve( token );
            }
        })
    })
}

export {
    signJwt
}