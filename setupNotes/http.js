/*
  HTTP
    Hyper Text Transfer Protocol

    Communication flow between two machines
      - Client establishes a connection
      - It sends a request, awaits the answer
      - Server processes request, then sends back the answer/response

    Message structure:
      Requests:
        - URL
          - domain/ip
          - port number
          - query params
        - Method
          - GET(read)
          - POST(create)
          - PUT(update)
          - DELETE(delete)
        - Body
          - For all methods except GET, a way to send along an additional batch of content without exposing it to the url
        - Headers
          - Used for tying in additional pieces of information about how a server should handle requests, such as Authorization rules and Policies for allowing scripts to be run
      Responses: 
        - Status
        - Body(typically an HTML page or a JSON object)
        - Headers

      RESTful APIs:
        Typically just a word to mean APIs that follow the HTTP standard.

        Representational State Transfer
          A way to represent the state of a request
          restfulapi.net
          www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.html

      


*/
