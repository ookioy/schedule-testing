const axios = require('axios');

const BASE_URL = 'http://localhost:8080';
let token;
let subjectId;

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

describe('Subject API', () => {

    test('GET /subjects - should return array', async () => {
        const res = await api().get('/subjects');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test('POST /subjects - should create subject', async () => {
        const timestamp = Date.now();
        const res = await api().post('/subjects', {
            name: `Test Subject ${timestamp}`,
            disable: false
        });
        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty('id');
        expect(res.data.name).toContain('Test Subject');
        subjectId = res.data.id;
    });

    test('GET /subjects/:id - should return subject', async () => {
        const res = await api().get(`/subjects/${subjectId}`);
        expect(res.status).toBe(200);
        expect(res.data.id).toBe(subjectId);
        expect(res.data).toHaveProperty('name');
    });

    test('PUT /subjects - should update subject', async () => {
        const res = await api().put('/subjects', {
            id: subjectId,
            name: `Updated Subject ${Date.now()}`,
            disable: false
        });
        expect(res.status).toBe(200);
        expect(res.data.id).toBe(subjectId);
    });

    test('DELETE /subjects/:id - should delete subject', async () => {
        const res = await api().delete(`/subjects/${subjectId}`);
        expect(res.status).toBe(200);
    });

    test('GET /subjects/:id - should return 404 after delete', async () => {
        try {
            await api().get(`/subjects/${subjectId}`);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test('GET /subjects/:id - 404 for non-existing', async () => {
        try {
            await api().get('/subjects/999999');
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test('POST /subjects - 400 for invalid data', async () => {
        try {
            await api().post('/subjects', { disable: false });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });
});