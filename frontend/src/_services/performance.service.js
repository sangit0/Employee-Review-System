import fetchGraphQL from "../_helpers/fetchGraphQL";

export const performanceService = {
  create,
  getAll,
  update,
  remove,
};

function create({ email, password, name }) {
  return fetchGraphQL(`
                mutation {
                  addPerformance(name:"${name}"){
                    id name 
                }
            }
    `);
}
function update({ id, email, name }) {
  return fetchGraphQL(`
                mutation {
                  updatePerformance(id:"${id}",name:"${name}"){
                    id name 
                }
            }
    `);
}

function remove({ id }) {
  return fetchGraphQL(`
                mutation {
                  deletePerformance(id:"${id}"){
                    id name 
                }
            }
    `);
}

function getAll() {
  return fetchGraphQL(`
                 {
                  Performances{
                    id name 
                  }
                }
    `);
}
