import gql from 'graphql-tag';

const QUERY_SUMMARY = gql`
  query fetch_summary {
    todo {
      id
      task
      completed
    }
  }
`;

const MUTATION_SUMMARY_ADD = gql`
  mutation insert_todo($objects: [todo_input]) {
    insert_todo(objects: $objects) {
      affected_rows
      returning {
        id
        task
        completed
      }
    }
  }
`;

const MUTATION_SUMMARY_UPDATE = gql`
  mutation update_todo($todoId: Int, $set: todo_input) {
    update_todo(where: { id: { _eq: $todoId } }, _set: $set) {
      affected_rows
    }
  }
`;

const MUTATION_SUMMARY_DELETE = gql`
  mutation delete_todo($todoId: Int) {
    delete_todo(where: { id: { _eq: $todoId } }) {
      affected_rows
    }
  }
`;

export {
  QUERY_SUMMARY,
  MUTATION_SUMMARY_ADD,
  MUTATION_SUMMARY_UPDATE,
  MUTATION_SUMMARY_DELETE
};
