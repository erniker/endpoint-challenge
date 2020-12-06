import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../../app.module'
import { getConnection } from 'typeorm'

const mockId = 'z99z99z9-9z99-999z-9z99-999999z9zzz8'

const mockCustomer = {
  name: 'pepe',
  surname: 'pepón',
  email: 'pepepepon@123.com',
}
const MockCustomerNonExixitingId = {
  name: 'pepe',
  surname: 'pepón',
  email: 'pepepepon@123.com',
  id: mockId
}

async function createCustomer(
  app,
  internalContact = mockCustomer,
) {
  return await request(app.getHttpServer())
    .post('/customers')
    .send(internalContact)
}

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
    await getConnection().synchronize(true)
  })

  afterEach(async () => {
    await getConnection().close()
  })

  describe('CustomerController create customer', () => {

    it('/customers (POST) Happy path', async () => {
      const response = await request(app.getHttpServer())
        .post('/customers')
        .send(mockCustomer)
      expect(response.status).toBe(201)
      expect(response.body.id).toBeTruthy()
      expect(response.body.name).toBe('pepe')
      expect(response.body.surname).toBe('pepón')
      expect(response.body.email).toBe('pepepepon@123.com')
    })

    it('/customers (POST) wrong params', async () => {

      const response = await request(app.getHttpServer())
        .post('/customers')
        .send({
          ...mockCustomer,
          name: 4,
        })

      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Bad Request')
      expect(response.body.message.toString()).toBe(
        [
          'name must be shorter than or equal to 25 characters',
          'name must be a string',
        ].join(','),
      )
    })
  })

  describe('CustomerController update contact', () => {

    it('/customers/:id (PUT) Happy path', async () => {
      const customer = await createCustomer(app)
      const response = await request(app.getHttpServer())
        .put(`/customers/${customer.body.id}`)
        .send({ ...mockCustomer, email: 'pepepepon1@123.com' })
      expect(response.status).toBe(200)
    })

    it('/customers/:id (PUT) email is not unique', async () => {
      const customer = await createCustomer(app)
      const customer2 = await createCustomer(app, {
        ...mockCustomer,
        email: 'pepepepon1@123.com',
      })
      const response = await request(app.getHttpServer())
        .put(`/customers/${customer.body.id}`)
        .send({ ...mockCustomer, email: customer2.body.email })
      expect(response.status).toBe(403)
    })

    it('/customers/:id (PUT) Customer id does not exist', async () => {
      const response = await request(app.getHttpServer())
        .put(`/customers/${mockId}`)
        .send(MockCustomerNonExixitingId)
      expect(response.status).toBe(400)
    })

    it('/customers/:id (PUT) Customer surname is too long', async () => {
      const customer = await createCustomer(app)
      const response = await request(app.getHttpServer())
        .put(`/customers/${customer.body.id}`)
        .send({
          ...mockCustomer,
          surname: 'very but very very long firtName, even more than my... really soooo long',
        })
      expect(response.status).toBe(400)
      expect(response.body.message.toString()).toBe(
        'surname must be shorter than or equal to 25 characters',
      )
    })

    it('/customers/:id (PUT) Wrong params', async () => {
      const customer = await createCustomer(app)
      const response = await request(app.getHttpServer())
        .put(`/customers/${customer.body.id}`)
        .send({
          ...mockCustomer,
          email: 4,
        })
      expect(response.status).toBe(400)
      expect(response.body.message.toString()).toBe(
        'email must be an email'
      )
    })
  })

  describe('CustomerController (GET) Get customer', () => {

    it('/customers (GET) Happy path', async () => {
      await createCustomer(app)
      const response = await request(app.getHttpServer())
        .get('/customers')
      expect(response.status).toBe(200)
      expect(response.body[0].id).toBeTruthy()
      expect(response.body[0].name).toBe('pepe')
      expect(response.body[0].surname).toBe('pepón')
      expect(response.body[0].email).toBe('pepepepon@123.com')
    })

    it('/customers/:id (GET) Get customer By Id Happy path', async () => {
      const customer = await createCustomer(app)
      const response = await request(app.getHttpServer())
        .get(`/customers/${customer.body.id}`)
      expect(response.status).toBe(200)
      expect(response.body.id).toBeTruthy()
      expect(response.body.name).toBe('pepe')
      expect(response.body.surname).toBe('pepón')
      expect(response.body.email).toBe('pepepepon@123.com')
    })
  })

  describe('CustomerController (DELETE) Delete customer', () => {

    it('/customers/:id (DELETE) Happy path', async () => {
      const customer = await createCustomer(app)
      const response = await request(app.getHttpServer())
        .delete(`/customers/${customer.body.id}`)
      expect(response.status).toBe(200)
    })

    it('/customers/:id (DELETE) Customer id does not exist', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/customers/${mockId}`)
        .send(mockCustomer)
      expect(response.status).toBe(400)
    })

  })
})
