import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../../app.module'
import { getConnection } from 'typeorm'

const mockId = 'z99z99z9-9z99-999z-9z99-999999z9zzz9'

const mockOrder = {
    "customerId": "z99z99z9-9z99-999z-9z99-999999z9zzz9",
    "mobileIds": [
        "z88z99z9-9z99-999z-9z99-999999z9zzz9"
    ]
}

const mockCreatedOrder = {
    customerId: "z99z99z9-9z99-999z-9z99-999999z9zzz9",
    orderMobile: [
        {
            mobileId: "z88z99z9-9z99-999z-9z99-999999z9zzz9",
            price: 9999,
            orderId: "z99z99z9-9z99-999z-9z99-999999z9zzz9",
            id: "fce5740f-da0f-4b1b-a7f9-57f5ecceea92",
            createdAt: "2020-12-06T10:23:58.317Z",
            updatedAt: "2020-12-06T10:23:58.317Z"
        }
    ],
    "totalPrice": 9999,
}
const MockOrderNonExixitingId = {
    customerId: "z99z99z9-9z99-999z-9z99-999999z9zzz9",
    orderMobile: [
        {
            mobileId: "z88z99z9-9z99-999z-9z99-999999z9zzz9",
            price: 9999,
            orderId: "z99z99z9-9z99-999z-9z99-999999z9zzz9",
            id: "fce5740f-da0f-4b1b-a7f9-57f5ecceea92",
            createdAt: "2020-12-06T10:23:58.317Z",
            updatedAt: "2020-12-06T10:23:58.317Z"
        }
    ],
    "totalPrice": 9999,
    id: mockId
}

async function createOrder(
    app,
    internalOrder = mockOrder,
) {
    return await request(app.getHttpServer())
        .post('/orders')
        .send(internalOrder)
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

    describe('OrdersController create order', () => {
        it('/orders (POST) Happy path', async () => {
            const response = await request(app.getHttpServer())
                .post('/orders')
                .send(mockOrder)
            expect(response.status).toBe(201)
            expect(response.body.id).toBeTruthy()
            expect(response.body.customerId).toBe('z99z99z9-9z99-999z-9z99-999999z9zzz9')
            expect(response.body.orderMobile[0].mobileId).toBe('z99z99z9-9z99-999z-9z99-999999z9zzz9')
            expect(response.body.orderMobile[0].price).toBe(9999)
            expect(response.body.totalPrice).toBe(9999)
        })

        it('/orders (POST) wrong params', async () => {

            const response = await request(app.getHttpServer())
                .post('/orders')
                .send({
                    ...mockOrder,
                    mobileIds: 1,
                })

            expect(response.status).toBe(400)
            expect(response.body.error).toBe('Bad Request')
            expect(response.body.message.toString()).toBe(
                [
                    'mobileIds must be a array[]',
                ]
            )
        })
    })

    describe('Order (GET) Get Orders', () => {
        it('/orders (GET) Happy path', async () => {
            await createOrder(app)
            const response = await request(app.getHttpServer())
                .get('/orders')
            expect(response.status).toBe(200)
            expect(response.body[0].id).toBeTruthy()
            expect(response.body[0].customerId).toBe('z99z99z9-9z99-999z-9z99-999999z9zzz9')
            expect(response.body[0].orderMobile[0].mobileId).toBe('z99z99z9-9z99-999z-9z99-999999z9zzz9')
            expect(response.body[0].orderMobile[0].price).toBe(9999)
            expect(response.body[0].totalPrice).toBe(9999)
        })

        it('/orders/:id (GET) Get order By Id Happy path', async () => {
            const order = await createOrder(app)
            const response = await request(app.getHttpServer())
                .get(`/order/${order.body.id}`)
            expect(response.status).toBe(200)
            expect(response.body.id).toBeTruthy()
            expect(response.body.customerId).toBe('z99z99z9-9z99-999z-9z99-999999z9zzz9')
            expect(response.body.orderMobile[0].mobileId).toBe('z99z99z9-9z99-999z-9z99-999999z9zzz9')
            expect(response.body.orderMobile[0].price).toBe(9999)
            expect(response.body.totalPrice).toBe(9999)
        })


        describe('OrderController (DELETE) Delete order', () => {

            it('/orders/:id (DELETE) Happy path', async () => {
                const order = await createOrder(app)
                const response = await request(app.getHttpServer())
                    .delete(`/orders/${order.body.id}`)
                expect(response.status).toBe(200)
            })

            it('/orders/:id (DELETE) Order id does not exist', async () => {
                const response = await request(app.getHttpServer())
                    .delete(`/orders/${mockId}`)
                    .send(mockCreatedOrder)
                expect(response.status).toBe(400)
            })

        })
    })
})