const { ApolloServer, gql, UserInputError, AuthenticationError} = require('apollo-server')
const jwt = require('jsonwebtoken')

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const mongoose = require('mongoose')
const Book = require('./models/book')
const User = require('./models/user')
const Author = require('./models/author')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })



const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Token {
    value: String!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    allUsers: [User!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) =>{
      if(args.author && args.genre){
        const foundAuthor = await Author.findOne({name: args.author})
        return await Book.find(
          {author: foundAuthor.id,
          genres: { $in: [args.genre]}}).populate('author')
      }
      if(args.author){
        const foundAuthor = await Author.findOne({name: args.author})
        return await Book.find({author: foundAuthor.id}).populate('author')
      }
      if(args.genre){
        return await Book.find({genres: { $in: [args.genre]}}).populate('author')
      }
      return await Book.find({}).populate('author')
    },
    allAuthors: () => Author.find({}).populate('bookCount'),
    allUsers: () => User.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      root.bookCount.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      try {
        const foundAuthor = await Author.findOne({ name: args.author });

        if (!foundAuthor) {
          foundAuthor = new Author({ name: args.author });
        }

        const newBook = new Book({ ...args, foundAuthor });
        const savedBook = await newBook.save();

        foundAuthor.books = author.books.concat(savedBook._id);
        await newAuthor.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

      return newBook;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const authorFound = await Author.findOne({name: args.name})
      if(!authourFound){
        return null
      }
      authorFound.born = args.setBornTo

      try{
        await authourFound.save()
      } catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }


      return authorFound
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})