const http = require('http')
const fs = require('fs')
const soap = require('soap')

const wsdlXml = fs.readFileSync('./service.wsdl', 'utf8')

const books = [
  { id: 1, title: 'Node Basics', author: 'A. Student' },
  { id: 2, title: 'SOAP Essentials', author: 'B. Student' },
  { id: 3, title: 'JavaScript Patterns', author: 'C. Student' },
  { id: 4, title: 'RESTful APIs', author: 'D. Student' },
  { id: 5, title: 'Async Programming', author: 'E. Student' },
  { id: 6, title: 'Express in Action', author: 'F. Student' },
  { id: 7, title: 'Testing Node Apps', author: 'G. Student' },
  { id: 8, title: 'Node Streams', author: 'H. Student' },
  { id: 9, title: 'Deploying Node', author: 'I. Student' },
  { id: 10, title: 'Node Security', author: 'J. Student' },
]

const service = {
  BookService: {
    BookPort: {
      // Operation name MUST match WSDL operation name
      getBook: function (args) {
        let book
        if (args.id !== undefined && args.id !== null) {
          const id = Number(args.id)
          book = books.find((b) => b.id === id)
        } else if (args.title !== undefined && args.title !== null) {
          const title = String(args.title)
          book = books.find(
            (b) => b.title.toLowerCase() === title.toLowerCase(),
          )
        } else if (args.author !== undefined && args.author !== null) {
          const author = String(args.author)
          book = books.find(
            (b) => b.author.toLowerCase() === author.toLowerCase(),
          )
        }

        return {
          id: book ? book.id : args.id || -1,
          title: book ? book.title : args.title || 'Not found',
          author: book ? book.author : args.author || 'Not found',
        }
      },
    },
  },
}

const server = http.createServer((req, res) => {
  res.end('SOAP server running')
})

server.listen(8000, () => {
  console.log('SOAP service WSDL: http://localhost:8000/wsdl?wsdl')
})

soap.listen(server, '/wsdl', service, wsdlXml)
