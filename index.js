// importing ApolloServer and gql (graphql) from apollo-server
const { ApolloServer, gql } = require('apollo-server')

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
// resolvers take in the request and work on resolving. It kind of middleware in processing
const resolvers = {
    Query: {
        books: () => books,
//        book: (parent, args, context, info) => books.find(book => book.id == args.id)
        // above line works same as below line
        book: (_, { id }) => books.find(book => book.id == id)
    }
}

// creating an ApolloServer
const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`Server is running at ${url}`)
})

// to run the server command is
////  node index.js
// Above command shows a message saying server started at running port 4000 which is a default port

// Now we can launch http://localhost:4000/ url and run query server.. where in we can create our queries


// Queries -

//// 1. All books

//query ExampleQuery {
//  books {
//    id
//    title
//    author
//  }
//}


//// 2. Search a book via an ID

//query ExampleQuery {
//  book (id: 1) {
//    id
//    title
//    author
//  }
//}
