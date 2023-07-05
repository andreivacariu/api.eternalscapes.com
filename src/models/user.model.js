const { Console } = require('console');
var dbConn  = require('../../config/db.config');
fs = require('fs');
var User = function(user){
    this.minecraftUsername     =   user.minecraftUsername;
    this.currentCape      =   user.currentCape;
    this.inventory          =   user.inventory;
}

//get verify string
User.getVerifyString = (result) => {

            result(null, 'loaderio-71e135707a6991edf3f91216759b5268');
        
}



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Get Server Info ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// get all users
User.getAllUsers = (result) => {
    dbConn.query('SELECT * FROM users', (err, res) => {
        if (err) {
            console.log('Error while fetching users', err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

//get all capes
User.getCapes = (result) => {
    dbConn.query('SELECT * FROM capes', (err, res) => {
        if (err) {
            console.log('Error while fetching capes', err);
            result(null, err);
        } else {
            result(null, res);
        }
    }
    )
}

//get all cosmetics
User.getCosmetics = (result) => {
    dbConn.query('SELECT * FROM cosmetics', (err, res) => {
        if (err) {
            console.log('Error while fetching cosmetics', err);
            result(null, err);
        } else {
            result(null, res);
        }
    }
    )
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Get User Info ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// get user by Username from DB
User.getUserByUsername = (id, result) => {
    dbConn.query('SELECT * FROM users WHERE minecraftUsername=?', id, (err, res) => {
        if (err) {
            console.log('Error while fetching user by minecraftUsername', err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

//get inventory from db
User.getInventory = (id, result) => {
    dbConn.query('SELECT inventory FROM users WHERE minecraftUsername=?', id, (err, res) => {
        if (err) {
            console.log('Error while fetching user by minecraftUsername', err);
            result(null, err);
        } else {
            var inventory = JSON.parse(res[0].inventory);
            result(null, inventory);
        }
    }
    )
}

//get current cosmetics from db
User.getCurrentCosmetics = (id, result) => {
    dbConn.query('SELECT currentCosmetics FROM users WHERE minecraftUsername=?', id, (err, res) => {
        if (err) {
            console.log('Error while fetching cosmetics by minecraftUsername', err);
            result(null, err);
        } else if (res && res[0] && res[0].currentCosmetics) {
            var cosmetics = JSON.parse(res[0].currentCosmetics);
            cosmeticlist = '{\n "items": [\n';
            cosmetics.forEach(function(cosmetic) {
                if (fs.existsSync('./assets/cosmetics/' + cosmetic + '/texture.png')) {
                    cosmeticlist += '{\n';
                    cosmeticlist += '"type": "' + cosmetic + '",\n';
                    cosmeticlist += '"model": "assets/items/' + cosmetic + '/model.cfg",\n';
                    cosmeticlist += '"texture": "assets/items/' + cosmetic + '/custom/'+id+'.png",\n';
                    cosmeticlist += '"active": "true" }\n';
                    if (cosmetic !== cosmetics[cosmetics.length - 1]) {
                    cosmeticlist += ',\n';
                    }
                }else
                    cosmeticlist = cosmeticlist + '\t{ "type": "' + cosmetic + '", "model": "assets/items/' + cosmetic + '/model.cfg", "texture": "assets/items/' + cosmetic + '/texture.png", "active": "true" }';
                    if (cosmetic !== cosmetics[cosmetics.length - 1]) {
                        cosmeticlist += ',\n';
                        }
            }, this);
            cosmeticlist = cosmeticlist + "\n]\n}";
            result(null, cosmeticlist);
        }else {
            result(null, '{"items": []}');
        }

    }
    )
}

//get current cape from db
User.getCape = (id, result) => {
    dbConn.query('SELECT currentCape FROM users WHERE minecraftUsername=?', id, (err, res) => {
        if (err) {
            console.log('Error while fetching capes by minecraftUsername', err);
            result(null, err);
        } else {
            if (res && res[0] && res[0].currentCape)
                result(null,"/assets/capes/" + res[0].currentCape + ".png" );
            else
                result(null,`http://s.optifine.net/capes/${id}.png`);
            
        }
    }
    )
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Change User Info ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//equip cosmetic to user
User.equipCosmetic = (id, cosmetic, result) => {
    dbConn.query('SELECT currentCosmetics FROM users WHERE minecraftUsername=?', id, (err, res) => {
        var cosmetics = JSON.parse(res[0].currentCosmetics);
        if (err) {
            console.log('Error while fetching cosmetics by minecraftUsername', err);
            result(400, err);
        } else if(cosmetics.includes(cosmetic)) {
            result(418);
        }else {
//add the new cosmetic to the cosmetics array
            cosmetics.push(cosmetic);
            //upload the array to the db
            dbConn.query('UPDATE users SET currentCosmetics=? WHERE minecraftUsername=?', [JSON.stringify(cosmetics), id], (err, res) => {
                if (err) {
                    console.log('Error while updating cosmetic', err);
                    result(null, err);
                }});
            result(null, cosmetics);
        }
    }
    )
}

//remove cosmetic from user
User.removeCosmetic = (id, cosmetic, result) => {

    dbConn.query('SELECT currentCosmetics FROM users WHERE minecraftUsername=?', id, (err, res) => {
        if (err) {
            console.log('Error while fetching cosmetics by minecraftUsername', err);
            result(null, err);
        } else {
            var cosmetics = JSON.parse(res[0].currentCosmetics);
            //remove the cosmetic from the cosmetics array
            //check if cosmetic is included in the array
            if (cosmetics.includes(cosmetic)) {
                //remove the cosmetic from the array
                cosmetics.splice(cosmetics.indexOf(cosmetic), 1);
            //upload the array to the db
            dbConn.query('UPDATE users SET currentCosmetics=? WHERE minecraftUsername=?', [JSON.stringify(cosmetics), id], (err, res) => {
                if (err) {
                    console.log('Error while updating cosmetic', err);
                    result(null, err);
                }
            }
            )
            result(null, cosmetics);
        }else{
            result(400);
      
        }}
    }
    )
}

//change currentCape from db    
User.changeCape = (id, cape, result) => {
    dbConn.query('UPDATE users SET currentCape=? WHERE minecraftUsername=?', [cape, id], (err, res) => {
        if (err) {
            console.log('Error while updating the user');
            result(null, err);
        } else {
            result(null, res);
        }
    }
    )
}

//link mc
User.checkOTP = (uuid, otp,result) => {
    dbConn.query('SELECT code FROM otps WHERE account =? AND issued >= CURRENT_TIMESTAMP - INTERVAL 5 MINUTE;', [uuid], (err, res) => {

        if (err) {
            result(null, err);
        
        } else {
            if(res[0] && otp==JSON.parse(res[0].code))
                result(null, {success:true});
            else
            result(null, {success:false});
        }
    }
    )
}

// update user by cape
User.updateUser = (id, userReqData, result) => {
    dbConn.query("UPDATE users SET currentCape=? WHERE id = ?", [userReqData.currentCape, id], (err, res) => {
        if (err) {
            console.log('Error while updating the user');
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

// create new user
User.createUser = (userReqData, result) => {
    dbConn.query('INSERT INTO users SET ? ', userReqData, (err, res) => {
        if (err) {
            console.log('Error while inserting data');
            result(null, err);
        } else {
            result(null, res)
        }
    })
}

// delete user
User.deleteUser = (id, result) => {
    dbConn.query('DELETE FROM users WHERE minecraftUsername=?', [id], (err, res) => {
        if (err) {
            console.log('Error while deleting the user');
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

setInterval(async function () {
    dbConn.query('SELECT * from users', ()=>{});
  }, 30000)

module.exports = User;