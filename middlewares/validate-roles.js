

const validateWithAlwRoles = ( role ) => {
    
    if(!['SUPER_ADMIN', 'ADMIN', 'STAFF', 'CLIENT'].includes(role)) {
        throw new Error('El rol ingresado no es permitido');
    }

    return true;
}

const validateSuperAdminRole = (req = request, res = response, next) => {

    if(!req.user) {
        return res.status(500).json({
            msg: 'Internal server error - User not validated'
        });
    }

    const { role, name } = req.user; 

    if(role !== 'SUPER_ADMIN') {
        return res.status(401).json({
            msg: `User ${name} does not have permissions`
        });
    }

    next();
}


export {
    validateWithAlwRoles,
    validateSuperAdminRole
}