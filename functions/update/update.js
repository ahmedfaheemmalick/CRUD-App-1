const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_ADMIN_SECRET,
  domain: "db.eu.fauna.com",
});

exports.handler = async (event) => {
  try {
    const { id, newTodo } = JSON.parse(event.body);
    console.log(id, newTodo)

    const result = await client.query(
      q.Update(q.Ref(q.Collection("todos"), id), {
        data: { todoName: newTodo },
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
