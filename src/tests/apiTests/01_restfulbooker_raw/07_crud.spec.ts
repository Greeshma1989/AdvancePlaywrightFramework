import { test, expect } from '@playwright/test';
import { logger } from '@utils/logger';

interface BookingPayload {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: BookingDates;
    additionalneeds: string;
}

interface BookingDates {
    checkin: string;
    checkout: string;
}

interface AuthTokenResponse {
    token: string;
}

interface CreateBookingResponse {
    bookingid: number;
    booking: BookingPayload;
}

interface BookingFlowState {
    token?: string;
    bookingId?: number;
}

test.describe.serial('RestfulBooker CrudAPI', () => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const payload: BookingPayload = {
        firstname: 'Pramod',
        lastname: 'Dutta',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
            checkin: '2018-01-01',
            checkout: '2019-01-01',
        },
        additionalneeds: 'Breakfast',
    };

    const bookingFlowState: BookingFlowState = {};

    test('TC@1 Create Token', async ({ request }) => {
        await test.step('Create Token', async () => {
            const responseData = await request.post('/auth', {
                headers,
                data: {
                    username: 'admin',
                    password: 'password123',
                },
            });
            expect(responseData.status()).toBe(200);
            const data = await responseData.json() as AuthTokenResponse;
            bookingFlowState.token = data.token;
        });

    })

    test('TC@2 Create Booking ', async ({ request }) => {
        await test.step('Create Booking', async () => {
            const responseData = await request.post('/booking', {

                headers,
                data: payload,
            });
            expect(responseData.status()).toBe(200);
            const data = await responseData.json() as CreateBookingResponse;
            expect(data.booking.firstname).toBe(payload.firstname);
            expect(data.booking.lastname).toBe(payload.lastname);
            bookingFlowState.bookingId = data.bookingid;

            logger.info(`Created Booking ID: ${bookingFlowState.bookingId}`);

        });
    });

   

    test('TC@3 update booking', async ({ request}) =>{
        await test.step('Update Booking ', async () => {
            const token =bookingFlowState.token;
            const bookingId= bookingFlowState.bookingId;
            if(!token || !bookingId ) {
                throw new Error('Create token and create bookingtests must pass before update booking.'); 
                
            }
            const responseData = await request.put(`/booking/${bookingId}`,{
                headers: {
                    ...headers,
                    Cookie:`token=${token}`
                },
                data:payload,
            });

            expect(responseData.status()).toBe(200);
            const data = await responseData.json() as BookingPayload;
            expect(data.firstname).toBe(payload.firstname);
            expect(data.lastname).toBe(payload.lastname);

            logger.info(`Updated booking id : ${bookingId}: ${data.firstname} ${data.lastname}`);
        });
    });

});

