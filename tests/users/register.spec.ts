import request from 'supertest'
import app from '../../src/app'
import { DataSource } from 'typeorm'
import { AppDataSource } from '../../src/config/data-source'
import { truncateTables } from '../utils'
import { User } from '../../src/entity/User'

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
        if (connection) {
            await truncateTables(connection)
        }
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
            try {
                const userRepository = connection.getRepository(User)
                const users = await userRepository.find()
                expect(users).toHaveLength(1)
                expect(users[0].firstname).toBe(userData.firstname)
                expect(users[0].lastname).toBe(userData.lastname)
                expect(users[0].email).toBe(userData.email)
            } catch (error) {
                console.log('main eror', error)
            }
        })
    })
    // describe('Fields are missing', () => {})
})
