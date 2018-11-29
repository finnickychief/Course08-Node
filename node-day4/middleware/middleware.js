function queryParam(req, res, next) {
  let { url } = req;
  // /?name=Jeff&role=Teacher
  // { name: 'Jeff', role: 'Teacher' }

  // Determine if there is a query
  if (url.includes('?')) {
    let splitUrl = url.split('?'); // Split the path and the query
    let queryString = splitUrl[splitUrl.length - 1]; // Get the query

    let terms = queryString.split('&'); // Get all terms

    let queryObj = {};

    for (let i = 0; i < terms.length; i++) {
      let term = terms[i].split('=');
      console.log(term);
      let key = term[0];
      let value = term[1];
      queryObj[key] = value;
    }
    req.query2 = queryObj;
  }
  console.log('We just finished our query middleware');
  next();
}

module.exports = { queryParam };
