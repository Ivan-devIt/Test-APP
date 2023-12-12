/**
 * @swagger
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        name:
 *          type: string
 *          default: Jane Doe
 *        password:
 *          type: string
 *          default: stringPassword123
 *        passwordConfirmation:
 *          type: string
 *          default: stringPassword123
 *
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          default: 6569ed6b366b389459cb3c54
 *        name:
 *          type: string
 *          default: Alan
 *        email:
 *          type: string
 *          default: example@gmail.com
 *        password:
 *          type: string
 *          default: 12345678Ff
 *        createdAt:
 *          type: string
 *          default: 2023-12-01T14:27:55.095Z
 *        updatedAt:
 *          type: string
 *          default: 2023-12-01T14:27:55.095Z
 *
 *    GetUserByIdResponseSuccess:
 *      type: object
 *      properties:
 *        statusCode:
 *           type: number
 *           default: 200
 *        message:
 *            type: string
 *            default: SUCCESS
 *        data: $ref: '#/components/schemas/CreateUserResponse'
 *
 */
