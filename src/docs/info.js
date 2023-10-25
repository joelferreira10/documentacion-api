export const info={
    definition:{
        openapi:"3.0.0",
        info:{
            title: "API Documentation",
            version: "1.0.0",
            description: "This is the documentation of my e-commerce"
        },
        servers:[
            {
                url:'http://localhost:8080/api'
            }
        ],
    },
    apis:['./src/docs/*.yml']
};