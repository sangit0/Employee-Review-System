import fetchGraphQL from "../_helpers/fetchGraphQL";

export const employeeService = {
  create,
  getAll,
  update,
  remove,
  getAllAssignedEmployee,
  getAllAssignedEmployeeFeedbackFilter,
  assignEmployee,
};

function create({ email, password, name }) {
  return fetchGraphQL(`
                mutation {
                  createEmployee(employeeInput:{email:"${email}",password:"${password}",,name:"${name}"}){
                    id name role
                }
            }
    `);
}
function update({ id, email, name }) {
  return fetchGraphQL(`
                mutation {
                  updateEmployee(id:"${id}",employeeInput:{email:"${email}",name:"${name}"}){
                    id name role
                }
            }
    `);
}

function remove({ id }) {
  return fetchGraphQL(`
                mutation {
                  deleteEmployee(id:"${id}"){
                    id name role
                }
            }
    `);
}

function getAll() {
  return fetchGraphQL(`
                 {
                  Employees{
                    id name email role
                  }
                }
    `);
}
function getAllAssignedEmployee(id) {
  return fetchGraphQL(`
                 {
                  UserAssignedEmployee(_id:"${id}"){
                    assigned_employee {
                      _id 
                      employee_id { id name}
                    }
                  }
                }
    `);
}
function getAllAssignedEmployeeFeedbackFilter(id, feedback) {
  return fetchGraphQL(`
                 {
                  UserAssignedEmployeeOnlyFeedBack(_id:"${id}",assignedEmployee:{feedback:${feedback}}){
                    assigned_employee {
                      _id 
                      employee_id { id name}
                    }
                  }
                }
    `);
}
function assignEmployee(id, employee_to_assign) {
  return fetchGraphQL(
    `
              mutation( $_id: String!
                $assigned_employee: [InputAssignedEmployee]) {
                  assignEmployee(_id:$_id,assigned_employee:$assigned_employee){
                      assigned_employee {
                        _id 
                      }
              }
            }
    `,
    true,
    { _id: id, assigned_employee: employee_to_assign }
  );
}
