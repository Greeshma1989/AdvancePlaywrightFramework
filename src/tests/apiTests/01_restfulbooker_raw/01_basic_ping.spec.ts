import { test, expect} from '@playwright/test';
import { request } from 'node:http';

test('Basic Ping Test',async ({request}) => {

    const responseData= await request.get("/ping");
    console.log("Response Data :",responseData);
    expect(responseData.status()).toBe(201);
});   


// RUN cd D:\AdvancePlaywrightFramework; $env:TTA_ENV='api'; $env:BASE_URL=''; npx playwright test src/tests/apiTests/01_restfulbooker_raw/01_basic_ping.spec.ts 