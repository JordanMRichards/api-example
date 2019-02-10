import app from './express.js';
import mongoose from 'mongoose';
import config from './config/config.js';
import faker from 'faker';
import User from './models/user.model'
mongoose.connect(config.mongodbUrl, {useNewUrlParser: true, useCreateIndex: true});

mongoose.connection.on("error", (err) => {
    throw new Error(err);
});

if(config.seedDBWithExampleUsers){
    User.deleteMany({}).then(res => {
        console.log("Cleared database.");
        function seedUsers(){
            return new Promise((resolve, reject)=>{
                for(let i=0;i<15;i++){
                    User.create({ 
                        "givenName": faker.name.firstName(),
                        'familyName': faker.name.lastName(),
                        "email": faker.internet.email(),
                        "password": "example_password123"
                    }).then(()=>{
                        if (i==14) resolve('yes');
                    });
                }
            });
        };
        seedUsers().then(res =>{
            console.log('Inserted dummy users.');
        }).catch(err =>{
            throw new Error("Could not insert dummy users.");
        });
    });
}

app.listen(config.httpPort, function(){
    console.log("Listening on port " + config.httpPort);
})


