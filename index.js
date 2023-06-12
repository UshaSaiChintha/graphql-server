const { ApolloServer, gql } = require('apollo-server')

// Make changes to below data and the server gets automatically refreshed with data changes if index.js is run via nodemon
const books = [
    {
      id: 1,
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      id: 2,
      title: 'City of Glass',
      author: 'Paul Auster',
    },
    {
      id: 3,
      title: 'RRR',
      author: 'Rajamouli',
    },
];

const typeDefs = gql`

    type Book {
        id: ID!
        title: String!
        author: String
    }

    type Query {
        books: [Book],
        book(id: ID!): Book
    }
`
const resolvers = {
    Query: {
        books: () => books,
        book: (_, { id }) => books.find(book => book.id == id)
    }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`Server is running at ${url}`)
})

// to run nodemon, the command is
////  nodemon index.js
