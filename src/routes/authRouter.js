/* eslint-disable max-len */
const router = require("express").Router();
const { body } = require("express-validator");
const authController = require("../controllers/authController");

/**
 * @swagger
 *  tags:
 *    name: Authorization
 *    description: methods for auth
 */

/**
 * @swagger
 *
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Authorization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
  *       200:
 *         description: Successful Registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 userFront:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 4
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     url:
 *                       type: string
 *                       example: "af020a8d-c0d8-4651-a7ed-9d4861218ad0"

 *       400:
 *         description: Conflict - Invalid login or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid login or password"
 *       403:
 *         description: Conflict - User not activated, please check your email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: "User not activated, please check your email"
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post("/login", authController.login);

/**
 * @swagger
 *
 * /auth/register:
 *   post:
 *     summary: Registration
 *     tags: [Authorization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful Registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 3
 *                 email:
 *                   type: string
 *                   example: "w.wer@mail.ru"
 *       409:
 *         description: Conflict - Invalid login or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 409
 *                 message:
 *                   type: string
 *                   example: "User already exists"
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post(
  "/register",
  body("email").isEmail().withMessage("Email is not valid"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 6 characters long"),
  authController.register
);

/**
 * @swagger
 *
 * /auth/logout:
 *   post:
 *     summary: Logout
 *     description: Terminates the user's session and invalidates the token. Set the refreshToken cookie in the browser or using extensions
 *
 *     tags: [Authorization]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successful logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "User logged out successfully"
 *       401:
 *         description: Unauthorized - Token is invalid or missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Invalid refresh token"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post("/logout", authController.logout);

/**
 * @swagger
 * /auth/activate/{link}:
 *   get:
 *     summary: Activate user account
 *     description: Activates a user's account based on the provided activation link.
 *     tags: [Authorization]
 *     parameters:
 *       - name: link
 *         in: path
 *         required: true
 *         description: The unique activation link for the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User account successfully activated
 *         content:
 *           application/octet-stream:  # Используется для файлов
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       409:
 *         description: Account already activated
 *         content:
 *           application/octet-stream:  # Используется для файлов
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.get("/activate/:link", authController.activate);

/**
 * @swagger
 * /auth/forgotPassword:
 *   post:
 *     summary: Forgot password
 *     description: Allows the user to request a password reset link by providing their email address.
 *     tags: [Authorization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: A password reset link has been sent to the user's email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Password reset link has been sent to your email."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "User not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post("/forgotPassword", authController.forgotPassword);

/**
 * @swagger
 * /auth/reset-password/token/{token}:
 *   post:
 *     summary: Reset user password
 *     description: Resets the user's password using a provided token.
 *     tags: [Authorization]
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: The unique reset password token.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "newPassword123"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Password reset successfully."
 *       400:
 *         description: Incorrect data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Incorrect data."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "User not found."
 *       401:
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Invalid token."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post("/reset-password/token/:token", authController.resetPassword);

/**
 * @swagger
 * /auth/refresh:
 *   get:
 *     summary: Refresh access and refresh tokens
 *     description: Generates new access and refresh tokens using the current refresh token. Set the refreshToken cookie in the browser or using extensions
 *
 *     tags: [Authorization]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Tokens refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "newAccessToken123"
 *       401:
 *         description: Unauthorized - Invalid or missing refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Invalid or missing refresh token."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.get("/refresh", authController.refresh);

module.exports = router;
