import gql from 'graphql-tag';

const QUERY_SUMMARY = gql`
  query fetch_summary {
    summaries(where: { url: { _eq: $url } }) {
      id
      url
      summary
      sentiment
      created_on
    }
  }
`;

const MUTATION_SUMMARY_ADD = gql`
  mutation insert_summaries($objects: [summaries_input!]) {
    insert_summaries(objects: $objects) {
      affected_rows
      returning {
        summary
        sentiment
      }
    }
  }
`;

export { QUERY_SUMMARY, MUTATION_SUMMARY_ADD };
