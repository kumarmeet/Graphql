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
        getAllEmail: [Email]
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

const allUser = [];

const root = {
    getUser: ({id}) => {
        return allUser.find((users) => {
               return users.id === id;
        })
    },
    
    createUser: ({input}) => {
        let id = uuid();
        const user = new User(id, input);
        allUser.push(user);
        return user;
    },

    getAllUser: () => {
        return allUser;
    },

    getAllEmail: () => {
        const allEmails = allUser.map((user) => {
            return user.emails.map((email) => email)
        })

        console.log(allEmails.map((email)=>email).flat(email.length));

        return allEmails;
    }
};

module.exports = {
    typeDefs,
    root
};