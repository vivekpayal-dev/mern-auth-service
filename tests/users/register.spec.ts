import request from 'supertest'
import app from '../../src/app'
import { DataSource } from 'typeorm'
import { AppDataSource } from '../../src/config/data-source'
import { User } from '../../src/entity/User'
import { Roles } from '../../src/constants'

describe('POST /auth/register', () => {
    let connection: DataSource
    beforeAll(async () => {
        try {
            connection = await AppDataSource.initialize()
        } catch (err) {
            console.error('DB initialization error:', err)
            throw err
        }
    })

    beforeEach(async () => {
        // Database truncate
        await connection.dropDatabase()
        await connection.synchronize()
    })

    afterAll(async () => {
        if (connection) {
            await connection.destroy()
        }
    })

    describe('Given All fields', () => {
        it('should return the 201 status code', async () => {
            //Arrange
            const userData = {
                firstname: 'Vivek',
                lastname: 'Payal',
                email: 'Vivek@gmail.com',
                password: 'secrect',
            }
            // Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData)
            // Assert
            expect(response.statusCode).toBe(201)
        })
        it('should return valid json response', async () => {
            //Arrange
            const userData = {
                firstname: 'Vivek',
                lastname: 'Payal',
                email: 'Vivek@gmail.com',
                password: 'secrect',
            }
            // Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData)
            // Assert
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json'),
            )
        })
        it('should persist the user in the database', async () => {
            //Arrange
            const userData = {
                firstname: 'Vivek',
                lastname: 'Payal',
                email: 'Vivek@gmail.com',
                password: 'secrect',
            }
            // Act
            await request(app).post('/auth/register').send(userData)
            // Assert
            const userRepository = connection.getRepository(User)
            const users = await userRepository.find()
            expect(users).toHaveLength(1)
            expect(users[0].firstname).toBe(userData.firstname)
            expect(users[0].lastname).toBe(userData.lastname)
            expect(users[0].email).toBe(userData.email)
        })
        it('should return id of the new created user', async () => {
            //Arrange
            const userData = {
                firstname: 'Vivek',
                lastname: 'Payal',
                email: 'Vivek@gmail.com',
                password: 'secrect',
            }
            // Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData)
            // Assert
            expect(response.body).toHaveProperty('id')
        })
        it('should assign a customer role', async () => {
            //Arrange
            const userData = {
                firstname: 'Vivek',
                lastname: 'Payal',
                email: 'Vivek@gmail.com',
                password: 'secrect',
            }
            // Act
            await request(app).post('/auth/register').send(userData)
            // Assert
            const userRepository = connection.getRepository(User)
            const users = await userRepository.find()
            expect(users[0]).toHaveProperty('role')
            expect(users[0].role).toBe(Roles.CUSTOMER)
        })
    })

    // describe('Fields are missing', () => {})
})
