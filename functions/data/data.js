const faunadb = require("faunadb");
const q = faunadb.query;

exports.handler = async (event) => {
  try {
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_ADMIN_SECRET,
      domain: "db.eu.fauna.com",
    });

    const result = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("todos"))),
        q.Lambda((x) => q.Get(x))
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
