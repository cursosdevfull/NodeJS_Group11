interface ParametersRequest {
  headers: string;
  body: string;
}

interface IBody {
  body: {
    name: string;
  };
}

function request(parameters: Omit<ParametersRequest, "body"> & IBody) {
  console.log(parameters);
}

const evento = {
  headers: "authorization bearer abcde",
  body: '{"name":"Jorge"}',
};
const parameters = { headers: evento.headers, body: JSON.parse(evento.body) };
request(parameters);
