const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const organizationValidation = require('../../validations/organization.validation');
const organizationController = require('../../controllers/organization.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageOrganizations'), validate(organizationValidation.createOrganization), organizationController.createOrganization)
  .get(auth('getOrganizations'), validate(organizationValidation.getOrganizations), organizationController.getOrganizations);

router
  .route('/:organizationId')
  .get(auth('getOrganizations'), validate(organizationValidation.getOrganization), organizationController.getOrganization)
  .delete(auth('manageOrganizations'), validate(organizationValidation.deleteOrganization), organizationController.deleteOrganization);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: Organization management and retrieval
 */

/**
 * @swagger
 * /organizations:
 *   post:
 *     summary: Create a organization
 *     description: Only admins can create other organizations.
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               descriptiion:
 *                 type: string
 *             example:
 *               name: fake name
 *               description: organization one
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Organization'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all organizations
 *     description: Only admins can retrieve all organizations.
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Organization name
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Organization description
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of organizations
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Organization'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /organizations/{id}:
 *   get:
 *     summary: Get a organization
 *     description: Logged in organizations can fetch only their own organization information. Only admins can fetch other organizations.
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Organization'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *
 *   delete:
 *     summary: Delete a organization
 *     description: Logged in organizations can delete only themselves. Only admins can delete other organizations.
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
