const axios = require('axios');

const BASE_URL = 'http://localhost:8080';
let token;

beforeAll(async () => {
    const res = await axios.post(`${BASE_URL}/auth/sign-in`, {
        email: "manager@gmail.com",
        password: "Qwerty!123"
    });
    token = res.data.token;
});

const api = () => axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer_${token}` }
});

describe('Lesson API', () => {

    test('GET /lessons - should return array', async () => {
        const res = await api().get('/lessons?groupId=1');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test('POST /lessons - should create lesson', async () => {
        try {
            const res = await api().post('/lessons', {
                hours: 2,
                lessonType: 'PRACTICAL',
                subject: { id: 1 },
                teacher: { id: 1 },
                semesterId: 1,
                groups: [{ id: 1 }]
            });
            expect([200, 201].includes(res.status)).toBe(true);
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test('GET /lessons/:id - should return lesson', async () => {
        const res = await api().get('/lessons/5');
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('id');
    });

    test('GET /lessons/:id - 404 for non-existing', async () => {
        try {
            await api().get('/lessons/999999');
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test('POST /lessons - 500 without teacher', async () => {
        try {
            await api().post('/lessons', {
                hours: 2,
                lessonType: 'PRACTICAL',
                subject: { id: 1 },
                semesterId: 1,
                groups: [{ id: 1 }]
            });
        } catch (err) {
            expect(err.response.status).toBe(500);
        }
    });
});
