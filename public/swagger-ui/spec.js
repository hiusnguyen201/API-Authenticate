var spec = {
  swagger: "2.0", // Phiên bản Swagger UI
  info: {
    description: "Các thông tin mô tả về dự án và API",
    version: "1.0", // Phiên bản API
    title: "LofiDoTask",
  },
  host: "localhost:3000", // Server và port deploy API
  basePath: "/api/v1", // Đường dẫn tới API
  tags: [
    // Danh sách các nhóm API: admin, users, images,...
    {
      name: "auth",
      description: "Operations about auth",
    },
    {
      name: "boards",
      description: "Operations about boards",
    },
    {
      name: "lists",
      description: "Operations about lists",
    },
    {
      name: "cards",
      description: "Operations about cards",
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
    // Board
    "/boards": {
      get: {
        tags: ["boards"],
        summary: "Get all boards",
        description: "",
        operationId: "getAllBoards",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "query",
            name: "sortBy",
            type: "string",
            enum: ["starred", "created"],
            default: "created",
            schema: {
              example: "sortBy",
            },
          },
          {
            in: "query",
            name: "status",
            enum: ["open", "close", "all"],
            default: "open",
            schema: {
              type: "string",
              example: "status",
            },
          },
        ],
        responses: {
          200: {
            description: "Get all boards successfully",
            schema: {
              example: [
                {
                  _id: "string",
                  sku: "string",
                  name: "string",
                  isClosed: false,
                  visibilityStatus: 0,
                  createdAt: "2024-08-06T08:09:39.876+00:00",
                  updatedAt: "2024-08-06T08:09:39.876+00:00",
                },
                {
                  _id: "string",
                  sku: "string",
                  name: "string",
                  isClosed: true,
                  visibilityStatus: 1,
                  starredAt: "2024-08-06T08:09:39.876+00:00",
                  createdAt: "2024-08-06T08:09:39.876+00:00",
                  updatedAt: "2024-08-06T08:09:39.876+00:00",
                },
              ],
            },
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
      post: {
        tags: ["boards"],
        summary: "Create new board",
        description: "",
        operationId: "createBoard",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
              type: "object",
              example: {
                name: "board1",
              },
            },
          },
        ],
        responses: {
          201: {
            description: "Create board successfully",
            schema: {
              example: {
                _id: "string",
                sku: "string",
                name: "string",
                isClosed: false,
                visibilityStatus: 0,
                createdAt: "2024-08-06T08:09:39.876+00:00",
                updatedAt: "2024-08-06T08:09:39.876+00:00",
              },
            },
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
    "/boards/{identify}": {
      get: {
        tags: ["boards"],
        summary: "Get board",
        description: "",
        operationId: "getBoard",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "params",
            name: "identify",
            type: "string",
            required: true,
            schema: {
              example: "sku | _id",
            },
          },
        ],
        responses: {
          200: {
            description: "Get board successfully",
            schema: {
              example: {
                _id: "string",
                sku: "string",
                name: "string",
                isClosed: false,
                visibilityStatus: 0,
                createdAt: "2024-08-06T08:09:39.876+00:00",
                updatedAt: "2024-08-06T08:09:39.876+00:00",
              },
            },
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
      patch: {
        tags: ["boards"],
        summary: "Update board",
        description: "",
        operationId: "updateBoard",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "params",
            name: "identify",
            type: "string",
            required: true,
            schema: {
              example: "sku | _id",
            },
          },
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
              type: "object",
              example: {
                name: "board2",
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Update board successfully",
            schema: {
              example: {
                _id: "string",
                sku: "string",
                name: "string",
                isClosed: false,
                visibilityStatus: 0,
                createdAt: "2024-08-06T08:09:39.876+00:00",
                updatedAt: "2024-08-06T08:09:39.876+00:00",
              },
            },
          },
          404: {
            description: "Board not found",
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
      delete: {
        tags: ["boards"],
        summary: "Delete board",
        description: "",
        operationId: "deleteBoard",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "params",
            name: "identify",
            type: "string",
            required: true,
            schema: {
              example: "sku | _id",
            },
          },
        ],
        responses: {
          200: {
            description: "Delete board successfully",
            schema: {
              example: {
                status: true,
              },
            },
          },
          404: {
            description: "Board not found",
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
    "/boards/{identify}/star": {
      patch: {
        tags: ["boards"],
        summary: "Toggle star board",
        description: "",
        operationId: "toggleStarBoard",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "params",
            name: "identify",
            type: "string",
            required: true,
            schema: {
              example: "sku | _id",
            },
          },
        ],
        responses: {
          200: {
            description: "Star / Unstar board successfully",
            schema: {
              example: {
                _id: "string",
                sku: "string",
                name: "string",
                isClosed: false,
                visibilityStatus: 0,
                starredAt: "2024-08-06T08:09:39.876+00:00",
                createdAt: "2024-08-06T08:09:39.876+00:00",
                updatedAt: "2024-08-06T08:09:39.876+00:00",
              },
            },
          },
          404: {
            description: "Board not found",
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
    "/boards/{identify}/close": {
      patch: {
        tags: ["boards"],
        summary: "Toggle close board",
        description: "",
        operationId: "toggleCloseBoard",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "params",
            name: "identify",
            type: "string",
            required: true,
            schema: {
              example: "sku | _id",
            },
          },
        ],
        responses: {
          200: {
            description: "Close / Open board successfully",
            schema: {
              example: {
                _id: "string",
                sku: "string",
                name: "string",
                isClosed: true,
                visibilityStatus: 0,
                starredAt: "2024-08-06T08:09:39.876+00:00",
                createdAt: "2024-08-06T08:09:39.876+00:00",
                updatedAt: "2024-08-06T08:09:39.876+00:00",
              },
            },
          },
          404: {
            description: "Board not found",
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
    "/boards/{identify}/lists": {
      get: {
        tags: ["boards"],
        summary: "Get all lists from board",
        description: "",
        operationId: "getListsBoard",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "params",
            name: "identify",
            type: "string",
            required: true,
            schema: {
              example: "boardId",
            },
          },
        ],
        responses: {
          200: {
            description: "Get lists successfully",
            schema: {
              example: [
                {
                  _id: "string",
                  board: "string",
                  name: "string",
                  isWatched: false,
                  position: 1,
                  createdAt: "2024-08-06T08:09:39.876+00:00",
                  updatedAt: "2024-08-06T08:09:39.876+00:00",
                },
                {
                  _id: "string",
                  board: "string",
                  name: "string",
                  isWatched: true,
                  position: 2,
                  createdAt: "2024-08-06T08:09:39.876+00:00",
                  updatedAt: "2024-08-06T08:09:39.876+00:00",
                },
              ],
            },
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
    // List
    "/lists/{identify}": {
      get: {
        tags: ["lists"],
        summary: "Get list",
        description: "",
        operationId: "getList",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "params",
            board: "string",
            name: "identify",
            type: "string",
            required: true,
            schema: {
              example: "listId",
            },
          },
        ],
        responses: {
          200: {
            description: "Get list successfully",
            schema: {
              example: {
                _id: "string",
                name: "string",
                isWatched: false,
                position: 1,
                createdAt: "2024-08-06T08:09:39.876+00:00",
                updatedAt: "2024-08-06T08:09:39.876+00:00",
              },
            },
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
      patch: {
        tags: ["lists"],
        summary: "Update list",
        description: "",
        operationId: "updateList",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "params",
            name: "identify",
            type: "string",
            required: true,
            schema: {
              example: "listId",
            },
          },
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
              type: "object",
              example: {
                name: "list2",
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Update list successfully",
            schema: {
              example: {
                _id: "string",
                board: "string",
                name: "string",
                isWatched: false,
                position: 1,
                createdAt: "2024-08-06T08:09:39.876+00:00",
                updatedAt: "2024-08-06T08:09:39.876+00:00",
              },
            },
          },
          404: {
            description: "List not found",
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
      delete: {
        tags: ["lists"],
        summary: "Delete list",
        description: "",
        operationId: "deleteList",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "params",
            name: "identify",
            type: "string",
            required: true,
            schema: {
              example: "listId",
            },
          },
        ],
        responses: {
          200: {
            description: "Delete list successfully",
            schema: {
              example: {
                status: true,
              },
            },
          },
          404: {
            description: "List not found",
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
    "/lists/{identify}/cards": {
      get: {
        tags: ["lists"],
        summary: "Get all cards from list",
        description: "",
        operationId: "getCardsList",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "params",
            name: "identify",
            type: "string",
            required: true,
            schema: {
              example: "listId",
            },
          },
        ],
        responses: {
          200: {
            description: "Get cards successfully",
            schema: {
              example: [
                {
                  _id: "string",
                  list: "string",
                  name: "string",
                  description: "string",
                  isWatched: false,
                  position: 1,
                  createdAt: "2024-08-06T08:09:39.876+00:00",
                  updatedAt: "2024-08-06T08:09:39.876+00:00",
                },
              ],
            },
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
    // Card
    "/cards/{identify}": {
      get: {
        tags: ["cards"],
        summary: "Get card",
        description: "",
        operationId: "getCard",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "params",
            board: "string",
            name: "identify",
            type: "string",
            required: true,
            schema: {
              example: "cardId",
            },
          },
        ],
        responses: {
          200: {
            description: "Get card successfully",
            schema: {
              example: {
                _id: "string",
                list: "string",
                name: "string",
                description: "string",
                isWatched: false,
                position: 1,
                createdAt: "2024-08-06T08:09:39.876+00:00",
                updatedAt: "2024-08-06T08:09:39.876+00:00",
              },
            },
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
      patch: {
        tags: ["cards"],
        summary: "Update card",
        description: "",
        operationId: "updateCard",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "params",
            name: "identify",
            type: "string",
            required: true,
            schema: {
              example: "cardId",
            },
          },
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
              type: "object",
              example: {
                name: "card2",
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Update card successfully",
            schema: {
              example: {
                _id: "string",
                list: "string",
                name: "string",
                description: "string",
                isWatched: false,
                position: 1,
                createdAt: "2024-08-06T08:09:39.876+00:00",
                updatedAt: "2024-08-06T08:09:39.876+00:00",
              },
            },
          },
          404: {
            description: "Card not found",
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
      delete: {
        tags: ["cards"],
        summary: "Delete card",
        description: "",
        operationId: "deleteCard",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "params",
            name: "identify",
            type: "string",
            required: true,
            schema: {
              example: "cardId",
            },
          },
        ],
        responses: {
          200: {
            description: "Delete card successfully",
            schema: {
              example: {
                status: true,
              },
            },
          },
          404: {
            description: "Card not found",
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
    Board: {
      type: "object",
      properties: {
        user: {
          type: "string",
        },
        sku: {
          type: "string",
        },
        name: {
          type: "string",
        },
        isClosed: {
          type: "boolean",
        },
        visibilityStatus: {
          type: "number",
          enum: ["public", "private"],
        },
        starredAt: {
          type: "date",
          format: "date-time",
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        updatedAt: {
          type: "date",
          format: "date-time",
        },
      },
    },
    List: {
      type: "object",
      properties: {
        board: {
          type: "string",
        },
        name: {
          type: "string",
        },
        isWatched: {
          type: "boolean",
        },
        position: {
          type: "number",
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        updatedAt: {
          type: "date",
          format: "date-time",
        },
      },
    },
    Card: {
      type: "object",
      properties: {
        list: {
          type: "string",
        },
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
        isWatched: {
          type: "boolean",
        },
        position: {
          type: "number",
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        updatedAt: {
          type: "date",
          format: "date-time",
        },
      },
    },
  },
};
