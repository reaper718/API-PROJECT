const books = [
    {
        ISBN: "12345book",
        title: "TEsla",
        pubDate: "2021-06-03",
        language: "en",
        numPage: 250,
        author:[1,2],
        publication: [1],
        category: ["tech","space","education"]
    }
]

const author = [
    {
        id: 1,
        Name:"Rudra",
        book:["12345book","secretBook"]
    },
    {
        id: 2,
        Name:"elon musk",
        book:["12345book"]
    }
]

const publication = [
    {
        id: 1,
        Name:"writex",
        book:["12345book"]
    },
    {
        id: 2,
        Name:"writex",
        book:[]
    }
]

module.exports = {books,author,publication};