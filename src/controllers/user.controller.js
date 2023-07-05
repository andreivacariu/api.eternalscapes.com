
const UserModel = require('../models/user.model');


// get all user list
exports.getVerifyString = (req, res)=> {
    UserModel.getVerifyString((err, string) =>{
        if(err)
        res.send(err);
        else
        res.send(string)
    })
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Get Server Info ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// get all user list
exports.getAllUsers = (req, res)=> {
    UserModel.getAllUsers((err, users) =>{
        if(err)
        res.send(err);
        else
        res.send(users)
    })
}

//get capes from DB
exports.getCapes = (req, res)=>{
    UserModel.getCapes((err, capes)=>{
        if(err)
        res.send(err);
        else
        res.send(capes);
    })
}

//get cosmetics 
exports.getCosmetics = (req, res)=>{
    UserModel.getCosmetics((err, cosmetics)=>{
        if(err)
        res.send(err);
        else
        res.send(cosmetics);
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Get User Info ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// get user by ID
exports.getUserByUsername = (req, res)=>{
    UserModel.getUserByUsername(req.params.id, (err, user)=>{
        if(err)
        res.send(err);
        else
        res.send(user);
    })
}

//get inventory from db
exports.getInventory = (req, res)=>{
    UserModel.getInventory(req.params.id, (err, inventory)=>{
        if(err)
        res.send(err);
        else
        res.send(inventory);
    }
    )
}

//get currentCosmetics from DB
exports.getCurrentCosmetics = (req, res)=>{
    UserModel.getCurrentCosmetics(req.params.id, (err, currentCosmetics)=>{
        if(err)
        res.send(err);
        else
        res.send(currentCosmetics);
    }
    )
}

//get current cape from db
exports.getCape = (req, res)=>{
    UserModel.getCape(req.params.id, (err, capeUrl)=>{
        if(err)
        res.send(err);
        else
        res.redirect(capeUrl);
    }
    )
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Change User Info ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//get otp and link minecraft account
exports.checkOTP = (req, res)=>{
    UserModel.checkOTP(req.params.uuid, req.params.otp,(err, user)=>{
        if(err)
        res.send(err);
        else
        res.json(user);
    }
    )
}


//change currentcAPE FROM DB
exports.changeCape = (req, res)=>{
    UserModel.changeCape(req.params.id, req.body.cape, (err, user)=>{
        if(err)
        res.send(err);
        else
        res.json({success:true, message: 'Cape changed successully!'});
    }
    )
}

//add a element to currentCosmetics
exports.equipCosmetic = (req, res)=>{
    UserModel.equipCosmetic(req.params.id, req.params.cosmetic, (err, user)=>{
        if(err)
        res.send(err);
        else
        res.json({success:true, message: 'Cosmetic changed successully!'});
    }
    )
}

//remove cosmetic from currentCosmetics
exports.removeCosmetic = (req, res)=>{
    UserModel.removeCosmetic(req.params.id, req.params.cosmetic, (err, user)=>{
        if(err)
        res.status(err).send("dang son, something went wrong");
        else
        res.json({success:true, message: 'Cosmetic removed successully!'});
    }
    )
}


// create new user
exports.createNewUser = (req, res) =>{
    const userReqData = new UserModel(req.body);
    console.log('userReqData', userReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        UserModel.createUser(userReqData, (err, user)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'User Created Successfully', data: user.insertId})
        })
    }
}

// update user
exports.updateUser = (req, res)=>{
    const userReqData = new UserModel(req.body);
    console.log('userReqData update', userReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        UserModel.updateUser(req.params.id, userReqData, (err, user)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'User updated Successfully'})
        })
    }
}

// delete user
exports.deleteUser = (req, res)=>{
    UserModel.deleteUser(req.params.id, (err, user)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'User deleted successully!'});
    })
}

