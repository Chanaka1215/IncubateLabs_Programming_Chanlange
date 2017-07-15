/**
 * Created by         : Chanaka Fernando.
 * Date               : Thu, 7/13/2017 .
 * Email              : nuwan.c.fernando@gmail.com.
 * LinkedIn           : https://www.linkedin.com/in/n-chanaka-fernando
 * Belongs to Project : backend.
 * Package            : .
 */

var utills = require('../utills');
var userModel = require('../models/userModel');


// main controller module for User Model
module.exports.userControler = function (app) {


    /**
     * The end point for get user by e user name
     */
    app.get('/get/user/:userName',function (req,res) {
        console.log("access the end point get user "+ req.url);
        utills.DBConnection();
        var selection  ={eMail:req.params.userName};
        var projection ={__v:false,_id:false};
        userModel.User.find(selection,projection,function (err,user) {
            if(err){
                console.log('eror occur when geting a user ==>' err.message );
                res.status(400).send({message:'internal error',status:400,content:err});
            }else {
                console.log('sucessfully retreved user data');
                res.status(200).send({message:'success',status:200,content:user});
            }
        });
    });


    
    /**
     * assign new user data to the user model
     */
    app.post('/post/register',function (req,res) {
        utills.DBConnection();
        console.log(req.body);
        var newUser = userModel.User({
            userName :req.body.userName,
            password :req.body.password,
            eMail    :req.body.email,
            regDate  :new Date().toString()
        });
        console.log('rea');
        newUser.save(function (err) {
            if(err){
                if(err.code == 11000){
                    res.status(200).send({message:err.message,status: 202, content:''});
                }else {
                    console.log('error occur**** '+err.message+"****"+err.code +"**"+err.collection)
                    res.status(500).send({message:err.message,status:500,content:''})
                }

            }else {
                console.log('Sucesfully saved new user');
                res.status(200).send({message:'successfully  saved new user',status:200,content:''})

            }
        });
    });


    app.post('/post/login',function (req,res) {
        utills.DBConnection();
        console.log(req.body);
        var selection  ={
            userName:req.body.name,
            password:req.body.password
        };
        var projection ={__v:false,_id:false};

        userModel.User.find(selection,projection,function (err,users) {
            var mess ;
            console.log(' geting a user' + users);

            if(err){
                mess=500;
                console.log('eror occur when geting a user ***' + err.message );
                res.status(400).send({message:'internal error',status:mess,content:err});
            }else {
                if(users.length == 0){
                    mess = 400;
                }else if(users.length ==1){
                    mess = 200;
                } else {
                    mess = 500;
                }
                console.log('sucessfully retreved user data'+mess);
                res.status(200).send({message:'success',status:mess,content:''});
            }
        });


    });


    var findaUserByUserName= function(enterdBy,callback){
        console.log("User controller accesed");
        utills.DBConnection();
        var selection  ={userName:enterdBy};
        var projection ={__v:false,_id:false,password:false};

        userModel.User.find(selection,projection,function (err,user) {
            if(err){
                console.log('eror occur when geting a user data');
            }else {
                console.log('sucessfully retreved user data and finished ' + user[0]);
                callback(user[0]);
            }
        });
    };

    exports.FindaUserByUserName = findaUserByUserName;


    // /**
    //  * This method save the user object
    //  * @param userObject
    //  * @param callback
    //  */
    // exports.addNewUser= function(userName,callback){
    //     console.log(" FindaUserByUserName mehod accesed");
    //     var newUser = userModel.User({
    //         userName :req.body.userName,
    //         password :req.body.password,
    //         eMail    :req.body.email,
    //         regDate  :new Date().toString()
    //     });
    //     utills.DBConnection();
    //     var error ;
    //     var message;
    //     userObject.save(function (err) {
    //         if(err){
    //             console.log('error occur while saving User ==> '+err.message);
    //             error =err;
    //         }else {
    //             console.log('Sucesfully saved new User ');
    //         }
    //         callback(err,message);
    //     });
    //
    //
    // };






};