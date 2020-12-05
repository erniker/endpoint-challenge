import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../../app.module'
import { getConnection } from 'typeorm'

const mockId = 'z99z99z9-9z99-999z-9z99-999999z9zzz9'

const mockMobileCatalog = {
  image: 'https://imagen.jpg',
  name: 'muchoPhone',
  description: 'Movil de la empresa Mucho',
  price: 100
}
const MockContactNonExixitingId = {
  image: 'https://imagen.jpg',
  name: 'muchoPhone',
  description: 'Movil de la empresa Mucho',
  price: 100,
  id: mockId
}

async function createMobileCatalog(
  app,
  internalMobileCatalog = mockMobileCatalog,
) {
  return await request(app.getHttpServer())
    .post('/mobileCatalog')
    .send(internalMobileCatalog)
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

  describe('MobileCatalogController create mobileCatalog', () => {

    it('/mobileCatalog (POST) Happy path', async () => {
      const response = await request(app.getHttpServer())
        .post('/mobileCatalog')
        .send(mockMobileCatalog)
      expect(response.status).toBe(201)
      expect(response.body.id).toBeTruthy()
      expect(response.body.image).toBe('https://imagen.jpg')
      expect(response.body.name).toBe('muchoPhone')
      expect(response.body.description).toBe('Movil de la empresa Mucho')
      expect(response.body.price).toBe(100)
    })


    it('/mobileCatalog (POST) wrong params', async () => {

      const response = await request(app.getHttpServer())
        .post('/mobileCatalog')
        .send({
          ...mockMobileCatalog,
          name: 4,
        })

      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Bad Request')
      expect(response.body.message.toString()).toBe(
        [
          'name must be shorter than or equal to 50 characters',
          'name must be a string',
        ].join(','),
      )
    })
  })

  describe('MobileCatalogController update mobileCatalog', () => {

    it('/mobileCatalog/:id (PUT) Happy path', async () => {
      const mobileCatalog = await createMobileCatalog(app)
      const response = await request(app.getHttpServer())
        .put(`/mobileCatalog/${mobileCatalog.body.id}`)
        .send({ ...mockMobileCatalog, price: 120 })
      expect(response.status).toBe(200)
    })

    it('/mobileCatalog/:id (PUT) name is not unique', async () => {
      const mobileCatalog = await createMobileCatalog(app)
      const mobileCatalog2 = await createMobileCatalog(app, {
        ...mockMobileCatalog,
        name: 'muchoPhone Pro',
      })
      const response = await request(app.getHttpServer())
        .put(`/mobileCatalog/${mobileCatalog.body.id}`)
        .send({ ...mockMobileCatalog, name: mobileCatalog2.body.name })
      expect(response.status).toBe(403)
    })

    it('/mobileCatalog/:id (PUT) MobileCatalog id does not exist', async () => {
      const response = await request(app.getHttpServer())
        .put(`/mobileCatalog/${mockId}`)
        .send(MockContactNonExixitingId)
      expect(response.status).toBe(400)
    })

    it('/mobileCatalog/:id (PUT) MobileCatalog name is too long', async () => {
      const mobileCatalog = await createMobileCatalog(app)
      const response = await request(app.getHttpServer())
        .put(`/mobileCatalog/${mobileCatalog.body.id}`)
        .send({
          ...mockMobileCatalog,
          name: 'very but very very long name, even more than my... really soooo long',
        })
      expect(response.status).toBe(400)
      expect(response.body.message.toString()).toBe(
        'name must be shorter than or equal to 25 characters',
      )
    })

    it('/mobileCatalog/:id (PUT) Wrong params', async () => {
      const mobileCatalog = await createMobileCatalog(app)
      const response = await request(app.getHttpServer())
        .put(`/mobileCatalog/${mobileCatalog.body.id}`)
        .send({
          ...mockMobileCatalog,
          name: 4,
        })
      expect(response.status).toBe(400)
      expect(response.body.message.toString()).toBe(
        'name must be shorter than or equal to 25 characters,name must be a string'
      )
    })
  })

  describe('MobileCatalogController (GET) Get mobileCatalog', () => {

    it('/mobileCatalog (GET) Happy path', async () => {
      await createMobileCatalog(app)
      const response = await request(app.getHttpServer())
        .get('/mobileCatalog')
      expect(response.status).toBe(200)
      expect(response.body[0].id).toBeTruthy()
      expect(response.body[0].image).toBe('https://imagen.jpg')
      expect(response.body[0].name).toBe('muchoPhone')
      expect(response.body[0].description).toBe('Movil de la empresa Mucho')
      expect(response.body[0].price).toBe(100)
    })

    it('/mobileCatalog/:id (GET) Get mobileCatalog By Id Happy path', async () => {
      const mobileCatalog = await createMobileCatalog(app)
      const response = await request(app.getHttpServer())
        .get(`/mobileCatalog/${mobileCatalog.body.id}`)
      expect(response.status).toBe(200)
      expect(response.body.id).toBeTruthy()
      expect(response.body.image).toBe('https://imagen.jpg')
      expect(response.body.name).toBe('muchoPhone')
      expect(response.body.description).toBe('Movil de la empresa Mucho')
      expect(response.body.price).toBe(100)
    })
  })

  describe('MobileCatalogController (DELETE) Delete mobileCatalog', () => {

    it('/mobileCatalog/:id (DELETE) Happy path', async () => {
      const mobileCatalog = await createMobileCatalog(app)
      const response = await request(app.getHttpServer())
        .delete(`/mobileCatalog/${mobileCatalog.body.id}`)
      expect(response.status).toBe(200)
    })

    it('/mobileCatalog/:id (DELETE) MobileCatalog id does not exist', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/mobileCatalog/${mockId}`)
        .send(mockMobileCatalog)
      expect(response.status).toBe(400)
    })

  })
})
