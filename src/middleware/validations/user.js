import Joi from 'joi'

export default {
    create: {
        body: {
            givenName: Joi.string().required().max(50),
            familyName: Joi.string().required().max(50),
            email: Joi.string().required().email(),
            password: Joi.string().alphanum().min(6).max(50)
        }
    },
    update: {
        body: {
            givenName: Joi.string().max(50),
            familyName: Joi.string().max(50),
            email: Joi.string().email(),
            password: Joi.string().min(6).max(50)
        },
        params: {
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        } 
    },
    fetchMany: {
        query: {
            limit: Joi.number().max(100),
            cursor: Joi.string().min(10).max(150)
        }
    },
    specific: {
        params: {
          id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }         
    },
    login: {
        body: {
            email: Joi.string().email(),
            password: Joi.string().min(6).max(50)
        }
    }
}