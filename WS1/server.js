const http = require('http')
const fs = require('fs')
const path = require('path')
const soap = require('soap')

const wsdlPath = path.join(__dirname, 'service 1.wsdl')
const wsdlXml = fs.readFileSync(wsdlPath, 'utf8')

let authors = [
  { id: 1, name: 'Deo Borg' },
  { id: 2, name: 'Kyle Scicluna' },
  { id: 3, name: 'Jerome Cachia' },
]

let nextAuthorId = authors.length + 1

const service = {
  AuthorService: {
    AuthorPort: {
      getAuthorById(args) {
        const id = parseInt(args.id, 10)
        const author = authors.find((a) => a.id === id)

        if (!author) {
          return {
            id,
            name: '',
            found: false,
          }
        }

        return {
          id: author.id,
          name: author.name,
          found: true,
        }
      },

      getAllAuthors() {
        return {
          authors: {
            author: authors.map((a) => ({
              id: a.id,
              name: a.name,
            })),
          },
        }
      },

      createAuthor(args) {
        const name = args.name
        const newAuthor = {
          id: nextAuthorId++,
          name,
        }
        authors.push(newAuthor)

        return {
          id: newAuthor.id,
          name: newAuthor.name,
        }
      },
    },
  },
}

const server = http.createServer((req, res) => {
  res.end('SOAP server running')
})

server.listen(8001, () => {
  console.log('SOAP service WSDL: http://localhost:8001/wsdl?wsdl')
})

soap.listen(server, '/wsdl', service, wsdlXml)
