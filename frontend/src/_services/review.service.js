import fetchGraphQL from "../_helpers/fetchGraphQL";

export const reviewService = {
  getAll,
  addEmployeeReview,
  getEmployeeReviewSubmittedByParticularUser,
};

function getAll() {
  return fetchGraphQL(`
                 {
                  Employees{
                    id name email role
                  }
                }
    `);
}
function getEmployeeReviewSubmittedByParticularUser(
  feedback_from_employee_id,
  feedback_to_employee_id
) {
  return fetchGraphQL(`
                 {
                  EmployeeReview(feedback_from_employee_id: "${feedback_from_employee_id}"
                    feedback_to_employee_id: "${feedback_to_employee_id}"){
                      id
                      performance_reviews {
                        performance_type
                        feedback
                        performance
                      }
                  }
                }
    `);
}
function addEmployeeReview({
  feedback_from_employee_id,
  feedback_to_employee_id,
  performance_reviews,
}) {
  return fetchGraphQL(
    `
              mutation( $feedback_from_employee_id: String!
                $feedback_to_employee_id: String!
                $performance_reviews: [Review]) {
                  addEmployeeReview(feedback_from_employee_id:$feedback_from_employee_id,feedback_to_employee_id:$feedback_to_employee_id,performance_reviews:$performance_reviews){
                      id
              }
            }
    `,
    true,
    { feedback_from_employee_id, feedback_to_employee_id, performance_reviews }
  );
}
