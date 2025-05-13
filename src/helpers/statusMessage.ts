const statusMessage = {
  success: (response: any) => ({
    code: "01",
    status: true,
    message: "Success",
    data: response,
  }),

  statusCode: {
    success: 200,
    error: 500,
    notFound: 404,
    unauthorized: 401,
    created: 201,
    badRequest: 400,
  },
};

export = statusMessage; 