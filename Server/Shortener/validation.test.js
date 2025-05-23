const supertest = require('supertest');
const { launchServer, app } = require('./shortener');
// const { launchServer, app } = require('./solution');
const DEFAULT_DATA = require('./default').DEFAULT_DATA;
const request = supertest(app);
const server = launchServer();

describe('Shortener API', () => {
    beforeEach(async () => {
        await request.delete('/reset');
    });

    afterAll(() => {
        server.close();
    });

    describe('Shortener creation', () => {

        it('POST /shorten - should return 400 for invalid URL', async () => {
            const response = await request.post('/shorten').send({ url: 'invalid-url' });
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Invalid URL');
        });

        it('POST /shorten - should return 409 for existing URL', async () => {
            const url = DEFAULT_DATA[0].originalUrl;
            await request.post('/shorten').send({ url });
            const response = await request.post('/shorten').send({ url });
            const { shortcode, shortUrl } = response.body;

            expect(response.status).toBe(409);
            expect(shortcode).toBe(DEFAULT_DATA[0].shortcode);
            expect(shortUrl).toBe(`http://localhost:3000/sh/${shortcode}`);
        });

        it('POST /shorten - should return 200 for new URL', async () => {
            const url = 'https://example.com';
            const response = await request.post('/shorten').send({ url });
            const { shortcode, shortUrl } = response.body;

            expect(response.status).toBe(200);
            expect(shortcode.length).toBe(6);
            expect(shortUrl).toBe(`http://localhost:3000/sh/${shortcode}`);

            const redirectResponse = await request.get(`/sh/${shortcode}`);
            expect(redirectResponse.status).toBe(302);
            expect(redirectResponse.headers.location).toBe(url);
        });
    });

    describe('Shortener access', () => {
        it('GET /sh/:shortcode - should return 302 for valid shortcode', async () => {
            const shortcode = DEFAULT_DATA[0].shortcode;
            const response = await request.get(`/sh/${shortcode}`);
            expect(response.status).toBe(302);
        });

        it('GET /sh/:shortcode - should return 404 for invalid shortcode', async () => {
            const shortcode = 'invalid-shortcode';
            const response = await request.get(`/sh/${shortcode}`);
            expect(response.status).toBe(404);
        });

    });

    describe('Shortener stats', () => {
        it('GET /sh/:shortcode/stats - should return stats for valid shortcode', async () => {
            const shortcode = DEFAULT_DATA[0].shortcode;
            const response = await request.get(`/sh/${shortcode}/stats`);
            expect(response.status).toBe(200);
            expect(response.body.hits).toBeDefined();
        });

        it('GET /sh/:shortcode/stats - should update stats on access', async () => {
            const shortcode = DEFAULT_DATA[0].shortcode;
            await request.get(`/sh/${shortcode}`);
            const response = await request.get(`/sh/${shortcode}/stats`);

            expect(response.status).toBe(200);
            expect(response.body.hits).toBe(1);
        });

        it('PATCH /sh/:shortcode/reset - should reset stats for valid shortcode', async () => {
            const shortcode = DEFAULT_DATA[0].shortcode;
            await request.patch(`/sh/${shortcode}/reset`);
            const response = await request.get(`/sh/${shortcode}/stats`);
            expect(response.status).toBe(200);
            expect(response.body.hits).toBe(0);
        });
    });

    describe('End to End', () => {
        it('should create a new shortener, access it, and check stats', async () => {
            const url = 'https://example.com';
            const createResponse = await request.post('/shorten').send({ url });
            const { shortcode } = createResponse.body;

            expect(createResponse.status).toBe(200);
            expect(shortcode.length).toBe(6);

            const duplicateResponse = await request.post('/shorten').send({ url });
            expect(duplicateResponse.status).toBe(409);

            const redirectResponse = await request.get(`/sh/${shortcode}`);
            expect(redirectResponse.status).toBe(302);
            expect(redirectResponse.headers.location).toBe(url);

            await request.get(`/sh/${shortcode}`);
            const statsResponse = await request.get(`/sh/${shortcode}/stats`);
            expect(statsResponse.status).toBe(200);
            expect(statsResponse.body.hits).toBe(2);

            await request.patch(`/sh/${shortcode}/reset`);
            const resetStatsResponse = await request.get(`/sh/${shortcode}/stats`);
            expect(resetStatsResponse.status).toBe(200);
            expect(resetStatsResponse.body.hits).toBe(0);
        });
    });

});


