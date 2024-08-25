var spec = {
  swagger: "2.0", // Phiên bản Swagger UI
  info: {
    description: "Các thông tin mô tả về dự án và API",
    version: "1.0", // Phiên bản API
    title: "Api Authenticate",
  },
  host: "localhost:3000", // Server và port deploy API
  basePath: "/api/v1", // Đường dẫn tới API
  tags: [
    // Danh sách các nhóm API: admin, users, images,...
    {
      name: "auth",
      description: "Operations about auth",
    },
  ],
  schemes: ["http"], // Sử dụng scheme gì? HTTP, HTTPS?
  paths: {
    // Auth
    "/auth/register": {
      post: {
        // Phương thức gửi request: get, post, put, delete
        tags: ["auth"],
        summary: "Register",
        description: "",
        operationId: "registerAuth",
        consumes: ["application/json"], // Loại dữ liệu gửi đi
        produces: ["application/json"], // Loại dữ liệu trả về
        parameters: [
          // Các tham số
          {
            in: "body", // Tham số được gửi lên từ form
            name: "body", // Tên tham số
            required: "true", // Tham số là bắt buộc
            schema: {
              type: "object", // Loại dữ liệu của tham số là chuỗi
              example: {
                username: "user123",
                email: "user@gmail.com",
                password: "pass123",
                confirmPassword: "pass123",
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Register successfully",
            schema: {
              example: {
                accessToken: "string",
                user: {
                  _id: "string",
                  username: "string",
                  email: "string",
                  createdAt: "2024-08-06T08:09:39.876+00:00",
                  updatedAt: "2024-08-06T08:09:39.876+00:00",
                },
              },
            },
          },
          400: {
            description: "Validation error",
          },
          500: {
            description: "Internal server error",
          },
        },
        security: [],
      },
    },
    "/auth/login": {
      post: {
        tags: ["auth"],
        summary: "Login",
        description: "",
        operationId: "loginAuth",
        consumes: ["application/json"], // Loại dữ liệu gửi đi
        produces: ["application/json"], // Loại dữ liệu trả về
        parameters: [
          // Các tham số
          {
            in: "body", // Tham số được gửi lên từ form
            name: "account", // Tên tham số
            required: "true", // Tham số là bắt buộc
            schema: {
              type: "string", // Loại dữ liệu của tham số là chuỗi
              example: "username1 | username@gmail.com",
            },
            description: "the username or email for login",
          },
          {
            in: "body",
            name: "password",
            required: "true",
            schema: {
              type: "string",
              example: "pass123",
            },
            description: "The password for login",
          },
        ],
        responses: {
          200: {
            description: "Login successfully",
            schema: {
              example: {
                accessToken: "string",
                refreshToken: "string",
                user: {
                  _id: "string",
                  username: "string",
                  email: "string",
                  createdAt: "2024-08-06T08:09:39.876+00:00",
                  updatedAt: "2024-08-06T08:09:39.876+00:00",
                },
              },
            },
          },
          400: {
            description: "Validation error",
          },
          401: {
            description: "Invalid password",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal server error",
          },
        },
        security: [],
      },
    },
    "/auth/logout": {
      post: {
        // Phương thức gửi request: get, post, put, delete
        tags: ["auth"],
        summary: "Logout",
        description: "",
        operationId: "logoutAuth",
        consumes: ["application/json"], // Loại dữ liệu gửi đi
        produces: ["application/json"], // Loại dữ liệu trả về
        parameters: [
          // Các tham số
          {
            in: "body", // Tham số được gửi lên từ form
            name: "refreshToken", // Tên tham số
            required: "true", // Tham số là bắt buộc
            schema: {
              type: "string", // Loại dữ liệu của tham số là chuỗi
              example: "token",
            },
          },
        ],
        responses: {
          204: {
            description: "Logout successfully",
          },
          400: {
            description: "Validation error",
          },
          401: {
            description: "Invalid token",
          },
          500: {
            description: "Internal server error",
          },
        },
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
      },
    },
    "/auth/refresh-token": {
      post: {
        // Phương thức gửi request: get, post, put, delete
        tags: ["auth"],
        summary: "Refresh token",
        description: "",
        operationId: "refreshTokenAuth",
        consumes: ["application/json"], // Loại dữ liệu gửi đi
        produces: ["application/json"], // Loại dữ liệu trả về
        parameters: [
          // Các tham số
          {
            in: "body", // Tham số được gửi lên từ form
            name: "refreshToken", // Tên tham số
            required: "true", // Tham số là bắt buộc
            schema: {
              type: "string", // Loại dữ liệu của tham số là chuỗi
              example: "token",
            },
          },
        ],
        responses: {
          200: {
            description: "Refresh token successfully",
            schema: {
              example: {
                accessToken: "string",
                refreshToken: "string",
                user: {
                  _id: "string",
                  username: "string",
                  email: "string",
                  createdAt: "2024-08-06T08:09:39.876+00:00",
                  updatedAt: "2024-08-06T08:09:39.876+00:00",
                },
              },
            },
          },
          400: {
            description: "Validation error",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal server error",
          },
        },
        security: [],
      },
    },
    "/auth/password-reset/request": {
      post: {
        tags: ["auth"],
        summary: "Request password reset",
        description: "",
        operationId: "requestPasswordResetAuth",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "email",
            required: "true",
            schema: {
              type: "string",
              example: "user123@gmail.com",
            },
          },
        ],
        responses: {
          200: {
            description: "Send otp code successfully",
          },
          400: {
            description: "Validation error",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal server error",
          },
        },
        security: [],
      },
    },
    "/auth/password-reset/validate": {
      post: {
        tags: ["auth"],
        summary: "Validate otp code to reset password",
        description: "",
        operationId: "validatePasswordResetAuth",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "email",
            required: "true",
            schema: {
              type: "string",
              example: "user123@gmail.com",
            },
          },
          {
            in: "body",
            name: "otp",
            required: "true",
            schema: {
              type: "string",
              example: "123456",
            },
          },
        ],
        responses: {
          200: {
            description: "Validate otp successfully",
            schema: {
              example: {
                token: "string",
              },
            },
          },
          400: {
            description: "Validation error",
          },
          401: {
            description: "Invalid otp",
          },
          500: {
            description: "Internal server error",
          },
        },
        security: [],
      },
    },
    "/auth/password-reset/reset": {
      patch: {
        tags: ["auth"],
        summary: "Reset password",
        description: "",
        operationId: "resetPasswordAuth",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "token",
            required: "true",
            type: "string",
            schema: {
              example: "token",
            },
          },
          {
            in: "body",
            name: "password",
            required: "true",
            schema: {
              type: "string",
              example: "pass123",
            },
          },
          {
            in: "body",
            name: "confirmPassword",
            required: "true",
            schema: {
              type: "string",
              example: "pass123",
            },
          },
        ],
        responses: {
          204: {
            description: "Reset password successfully",
          },
          400: {
            description: "Validation error",
          },
          401: {
            description: "Invalid otp",
          },
          500: {
            description: "Internal server error",
          },
        },
        security: [],
      },
    },
  },
  securityDefinitions: {
    // Thông tin về api key sử dụng để thực hiện request
    ApiKeyAuth: {
      type: "apiKey", // Thuộc loại api key xác thực
      name: "Authorization", // Tên trường chứa api key xác thực
      in: "header", // API key được để trong phần header của request
    },
  },
  definitions: {
    // Thông tin các đối tượng sẽ trả về
    User: {
      type: "object",
      properties: {
        _id: {
          type: "string",
        },
        username: {
          type: "string",
        },
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
        },
      },
    },
  },
};
