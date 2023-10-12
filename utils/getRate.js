// const GET_RATES = gql`
//   query GetRate(
//     $country: String!
//     $service: String!
//     $carrier: String!
//     $weight: Float!
//   ) {
//     getRate(
//       country: $country
//       service: $service
//       carrier: $carrier
//       weight: $weight
//     ) {
//       result
//     }
//   }
// `;

// const fetchRates = async (variablesData) => {
//   const { country, service, carrier, weight } = variablesData;
//   const { data } = await client.query({
//     query: GET_RATES,
//     variables: { country, service, carrier, weight },
//   });
//   return data.getRate.result;
// };

// export default fetchRates;
