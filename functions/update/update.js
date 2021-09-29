const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_ADMIN_SECRET,
});

exports.handler = async (event) => {
  try {
    const { id, newTodo } = JSON.parse(event.body);

    const result = await client.query(
      q.Update(q.Ref(q.Collection("todos"), id), {
        newTodo,
      })
    );

    console.log("update todo", result);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
