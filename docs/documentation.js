const swaggerdocumentation=
{
    "openai":"3.2.0",
    "info":
    {
        "title":" ReadNow",
        "description":"This is the API Specification for the library app backend.",
        "contact":{"email":"tecyrose30@gmail.com"},
        "license":{
            "name":"MIT",
            "url":"https://opensource.org/licenses/mit"
        },
        "version": "1.0.0"
    },
    "extrenalDocs":{
        "description":"Get source code",
        "url":"https://github.com/Hoga30/ReadNow"
    },
    "basePath":"/api/library",
    "servers":
    [
        {
            "url":"http://localhost:8000",
            "description":"Local server"
        },
        {
            "url":"https://libraryApp.onrender.com",
            "description":"production server"
        }
    ],
    "schemes":["http","https"],
    "tags":[
        {
            "name":"book",
            "description":"Operation pertaining to books"
        }
    ],
    "paths":{
"/books/add":{
"post":
{
    "tags":["book"],
    "summary":"Add a new book",
    "description":"Creates a new book with  the provided details",
    "requestBody":{
        "content":{
            "application/json":
            {
                "schema":{
                    "$ref": "#/definitions/Book"
                }
            }
        }
    },
    "response":{
        "201":
        {
            "description":"book added successfully",
            "content":{
                "application/json":
                {
                    "schema":{
                        "$ref":"#/definitions/Book"
                    }
                }
            }
        },
        "400":
        {
            "description":"bad request -Validation error",
            "content":{
                "application/json":{
                    "schema":{
                        "type": "object",
                        "properties":{
                            "message":{
                                "type":"string"
                            }
                        }
                    }
                }
            }
        }
    }
}

}
    },
    "definition":
    {
"schemas":
{
    "book":
    {
        "type":"object",
        "properties":
        {
            "_id":
            {
                "type":"string",
                "description":"Unique identifier of the book"
            },
            "bookName":
            {
                "type":"string",
                "required":true
                
            },

            "authorName":
            {
                "type":"string",
                "required":true
                
            },
            "description":{
                "type":"string",
              
            },
            "category":
            {
                "type":"string",
                "required":true,
                "enum":["Novels","History", "Science", "Poetry", "Recipe", "Comic","Religious"]
            },
            "default": "Novels",

            "link":{
                "type":"string",
                "required":false
            },

            "checkBook":{
                "completed":{
                    "type":"Boolean",
                   "require":false
                }
            }
            
                
                }
            }
        }
    }
}
    
export default swaggerdocumentation;