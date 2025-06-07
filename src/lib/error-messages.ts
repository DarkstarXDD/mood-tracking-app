export const errorMessages = {
  generic: {
    type: "server_error",
    message: "Something went wrong. Please try again.",
  },

  validation: {
    type: "validation_error",
    message: "Server validation error. Please try again.",
  },

  existingEmail: {
    type: "auth_error",
    message:
      "An account with this email already exists. Try logging in instead.",
  },

  invalidCredentials: {
    type: "auth_error",
    message: "Incorrect username or password.",
  },
}
