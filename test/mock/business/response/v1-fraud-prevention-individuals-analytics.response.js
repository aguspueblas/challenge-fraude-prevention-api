const GET_FRAUD_PREVENTION_ANALYTICS_RESPONSE = {
  SUCCES: {
    statusCode: 200,
    body: {
      page: 1,
      per_page: 10,
      total_pages: 1,
      total_count: 2,
      data: [
        {
          user_id: 1,
          is_new_user: true,
          qty_rejected_1d: 1,
          total_amt_7d: "100.00",
        },
        {
          user_id: 2,
          is_new_user: false,
          qty_rejected_1d: 0,
          total_amt_7d: "0.01",
        },
      ],
    },
  },
  UNAUTHORIZED: {
    statusCode: 401,
    body: {
      message: "Invalid or missing credentials",
      error_code: "invalid_credentials",
    },
  },
};

module.exports = { GET_FRAUD_PREVENTION_ANALYTICS_RESPONSE };
