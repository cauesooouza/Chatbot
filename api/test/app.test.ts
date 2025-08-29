import { after, before, describe, it } from 'node:test';
import assert from 'node:assert';
import supertest from 'supertest';
import { config } from '../src/config/config.js';
import server from '../src/server.js';
import { AppDataSource } from '../src/data/data-source.js';
import { Lead } from '../src/modules/Lead/lead.entity.js';
import { LeadResponseSchema } from '../src/modules/Lead/lead.schema.js';

describe('APP suite tests', () => {

    before(async () => {
        await AppDataSource.initialize();
    })

    after(async () => {
        await AppDataSource.destroy();
    })

    describe('POST /lead/new', () => {
        describe('When send valid data', () => {
            let validLead: Partial<Lead>;
            let response: supertest.Response;
            before(async () => {
                validLead = {
                    id: 9482,
                    firstName: 'John',
                    lastName: 'doe',
                    isBot: true,
                    username: 'xdxdxd',
                    languageCode: 'pt-br',
                    lastInteraction: "",
                }
                response = await supertest(server)
                    .post('/lead/new')
                    .set("Authorization", `${config.apiPermission}`)
                    .send(validLead);
            })
            it('Should return HTTP STATUS 201', () => {
                assert.strictEqual(response.status, 201);
            })
            it('Should return an object that matches the Lead schema', () => {
                const validationResult = LeadResponseSchema.safeParse(response.body);
                assert.strictEqual(validationResult.success, true,
                    `O corpo da resposta falhou na validação do schema: ${JSON.stringify(validationResult.error?.issues)}`);
            })
        })

        describe('When send invalid data', () => {
            let invalidLead: Partial<Lead>;
            let response: supertest.Response;
            before(async () => {
                invalidLead = {
                    firstName: 'John',
                    lastName: 'doe',
                    isBot: true,
                    username: 'xdxdxd',
                    languageCode: 'pt-br',
                    lastInteraction: "",
                }

                response = await supertest(server)
                    .post('/lead/new')
                    .set("Authorization", `${config.apiPermission}`)
                    .send(invalidLead);
            })
            it("Should return HTTP STATUS 400", () => {
                assert.strictEqual(response.status, 400);
            })
            it("Should return structured message error", () => {
                const parsedError = JSON.parse(response.body.messageError);
                const expectedError = [
                    {
                        code: 'invalid_type',
                        expected: 'number',
                        received: 'undefined',
                        path: ['id'],
                        message: 'Required'
                    }
                ];

                assert.deepStrictEqual(parsedError, expectedError, "A estrutura do erro não é a esperada.");
            })
        })
    })
})