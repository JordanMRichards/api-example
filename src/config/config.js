const environments = {};

environments.default = {
    mongodbUrl: 'mongodb://'+(process.env.MONGO_HOST || "localhost")+':27017/ApiProject',
    httpPort:3000,
    jwtSecret: "This is a secret phrase.",
    jwtDuration: "1 hour"
}

environments.staging = {
    mongodbUrl: 'mongodb://'+(process.env.MONGO_HOST || "localhost")+':27017/ApiProject_Test',
    seedDBWithExampleUsers: true
}

environments.production = {
    seedDBWithExampleUsers: false
}


const environment = {...environments.default, ...environments[(process.env.NODE_ENV || "staging")]};

export default environment;
