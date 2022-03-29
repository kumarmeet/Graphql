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
        getAllUser: [User]
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

const allUser = [];


const root = {
    getUser: ({id}) => {
        return new User(id, userHolder.id)
    },
    
    createUser: ({input}) => {
        let id = uuid();
        userHolder.id = input;
        allUser.push(new User(id, input));
        // console.log(allUser);
        return new User(id, input);
    },

    getAllUser: () => {
        return allUser;
    }
};

module.exports = {
    typeDefs,
    root
};