const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_ADMIN_SECRET,
});

exports.handler = async (event) => {
  try {
    const id = event.body;

    const result = await client.query(
      q.Delete(q.Ref(q.Collection("todos"), id))
    );

    console.log("delete todo", result);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
