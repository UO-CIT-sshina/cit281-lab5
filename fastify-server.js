const fastify = require("fastify")();

const students = [
  {
    id: 1,
    last: "Last1",
    first: "First1",
  },
  {
    id: 2,
    last: "Last2",
    first: "First2",
  },
  {
    id: 3,
    last: "Last3",
    first: "First3",
  },
];

fastify.get("/cit/student", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students);
});

fastify.post("/cit/student", (request, reply) => {
    const newStudent = request.body;
    let maxID = 0;
    for (idValue of students) if (idValue.id > maxID) maxID = idValue.id;
    maxID += 1;
    students.push({id: maxID, first: newStudent.first, last: newStudent.last}); 
    //Using variable maxID as opposed to the array's length would work in case of deleted users, as not to reuse the ID
    reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(students);
})

fastify.get("/cit/student/:id", (request, reply) => {
  const { id = 0 } = request.query;
  for (let idValue of students) {
    if (parseInt(id) === idValue.id) {
      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(idValue);
      break;
    }
  }
  reply
    .code(404)
    .header("Content-Type", "text/html; charset=utf-8")
    .send("<h1>Not Found</h1>");
});
fastify.get("*", (request, reply) => {
  reply
    .code(404)
    .header("Content-Type", "text/html; charset=utf-8")
    .send("<h1>Not Found</h1>");
});

const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});