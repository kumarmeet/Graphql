const { buildSchema } = require('graphql');
const uuid = require("uuid").v4;

const typeDefs = buildSchema(`
    type User{
        id: ID
        name: String
        auth: Auth
        emails: [Email]
    }

    type Email{
        email: String
    }

    enum Auth{
        AUTHERIZED
        AUTHENTICATE
        OTHERS
    }

    type Query{
        getUser(id: ID): User
    }

    input EmailInput{
        id:ID
        email: String!
    }

    input UserInput{
        id: ID
        name: String
        auth: Auth
        emails: [EmailInput]
    }

    type Mutation{
        createUser(input: UserInput): User
    }
`
)

class User{
    constructor(id, {name,auth,emails}){
        this.id = id;
        this.name = name;
        this.auth = auth;
        this.emails = emails;
    }
}

const userHolder = {}


const root = {
    getUser: ({id}) => {
        return new User(id, userHolder.id)
    },
    
    createUser: ({input}) => {
        let id = uuid();
        userHolder.id = input;
        console.log(input);
        return new User(id, input);
    }
};

module.exports = {
    typeDefs,
    root
};