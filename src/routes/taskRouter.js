const router = require("express").Router();
const taskController = require("../controllers/taskController");
/**
 * @swagger
 *  tags:
 *    name: Tasks
 *    description: methods for todo
 */

/**
 * @swagger
 * /tasks/getAll:
 *   get:
 *     summary: Get all tasks for the authenticated user
 *     description: Retrieves a list of all tasks associated with the authenticated user, sorted by creation date in descending order.
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of user tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Complete project report"
 *                   status:
 *                     type: boolean
 *                     example: false
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-07T11:10:05.404Z"
 *       401:
 *         description: Unauthorized - User not logged in or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized error"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

router.get("/getAll", taskController.getAll);

/**
 * @swagger
 * /tasks/newTask:
 *   post:
 *     summary: Create a new task for the authenticated user
 *     description: Creates a new task with the provided title and assigns it to the authenticated user.
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the new task
 *                 example: "Finish project documentation"
 *     responses:
 *       200:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Task created successfully"
 *       401:
 *         description: Unauthorized - User not logged in or invalid refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized error"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post("/newTask", taskController.newTask);

/**
 * @swagger
 * /tasks/updateTask/{id}:
 *   put:
 *     summary: Update a task's details
 *     description: Updates the title and/or status of a specified task for the authenticated user.
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to be updated.
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Task fields to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title for the task
 *                 example: "New task title"
 *               status:
 *                 type: boolean
 *                 description: Updated status for the task (true for complete, false for incomplete)
 *                 example: true
 *     responses:
 *       200:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Task successfully updated"
 *       401:
 *         description: Unauthorized - User is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized error"
 *       404:
 *         description: Task not found or access denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

router.put("/updateTask/:id", taskController.updateTask);

/**
 * @swagger
 * /tasks/deleteTask/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Deletes a task by its ID if the user is authenticated and owns the task.
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the task to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task deleted successfully"
 *       401:
 *         description: Unauthorized error - missing or invalid refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized error"
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.delete("/deleteTask/:id", taskController.deleteTask);

module.exports = router;
