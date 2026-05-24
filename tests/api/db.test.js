const axios = require('axios');
const { Pool } = require('pg');

const BASE_URL = 'http://localhost:8080';
let token;

const pool = new Pool({
    connectionString: 'postgresql://postgres:postgres@localhost:5432/appdb'
});

beforeAll(async () => {
    const res = await axios.post(`${BASE_URL}/auth/sign-in`, {
        email: "manager@gmail.com",
        password: "Qwerty!123"
    });
    token = res.data.token;
});

afterAll(async () => {
    await pool.end();
});

const api = () => axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer_${token}` }
});

describe('DB verification', () => {

    test('POST /subjects - should save to database', async () => {
        const timestamp = Date.now();
        const name = `DB Test Subject ${timestamp}`;

        const res = await api().post('/subjects', {
            name,
            disable: false
        });

        const subjectId = res.data.id;

        const result = await pool.query(
            'SELECT * FROM subjects WHERE id = $1',
            [subjectId]
        );

        expect(result.rows.length).toBe(1);
        expect(result.rows[0].name).toBe(name);

        await api().delete(`/subjects/${subjectId}`);
    });

    test('DELETE /subjects - should remove from database', async () => {
        const res = await api().post('/subjects', {
            name: `To Delete ${Date.now()}`,
            disable: false
        });
        const subjectId = res.data.id;

        await api().delete(`/subjects/${subjectId}`);

        const result = await pool.query(
            'SELECT * FROM subjects WHERE id = $1',
            [subjectId]
        );

        expect(result.rows.length).toBe(0);
    });
});