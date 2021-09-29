const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_ADMIN_SECRET,
});

console.log(process.env.FAUNADB_ADMIN_SECRET);

exports.handler = async (event) => {
  try {
    const newTodo = JSON.parse(event.body);

    const result = await client.query(
      q.Create(q.Collection("todos"), {
        data: { newTodo },
      })
    );

    console.log("add todo", result);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
