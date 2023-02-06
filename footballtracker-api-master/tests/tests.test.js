const request = require('supertest')
const app = require('../src/app')

describe('Guest Tests', () => {
    describe('OK Tests', () => {
        it('[OK] get matches', async () => {
            const res = await request(app).get("/matches")
            expect(res.statusCode).toEqual(200)
        })
        it('[OK] get competitions', async () => {
            const res = await request(app).get("/competitions")
            expect(res.statusCode).toEqual(200)
        })

        it('[OK] get matches from competition', async () => {
            const res = await request(app).get("/competitions/1/matches")
            expect(res.statusCode).toEqual(200)
        })

        it('[OK] get matches from competition ko ', async () => {
            const res = await request(app).get("/competitions/100/matches")
            expect(res.statusCode).toEqual(404)
        })

        it('[OK] get team info ok', async () => {
            const res = await request(app).get("/teams/1")
            expect(res.statusCode).toEqual(200)
        })

        it('[OK] get players from team ok', async () => {
            const res = await request(app).get("/teams/1/players")
            expect(res.statusCode).toEqual(200)
        })

        it('[OK] get ads', async () => {
            const res = await request(app).get("/advertisements")
            expect(res.statusCode).toEqual(200)
        })

    })
    describe('KO Tests', () => {
        it('[KO] get team info not found resource', async () => {
            const res = await request(app).get("/teams/100")
            expect(res.statusCode).toEqual(404)
        })

        it('[KO] get players from team ko', async () => {
            const res = await request(app).get("/teams/200/players")
            expect(res.statusCode).toEqual(404)
        })
    })
})

describe('Login Tests', () => {
    describe('OK Tests', () => {
        it('[OK] create user', async () => {
            const res = await request(app).post("/users/register").send({
                email: 'pedro@pedro',
                password: 'pedro'
            })
            expect(res.statusCode).toEqual(201)
        })

    })

    describe('OK Tests', () => {
        it('[OK] login user', async () => {
            const res = await request(app).post("/users/login").send({
                email: 'pedro@pedro',
                password: 'pedro'
            })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('token')
        })

    })
    describe('KO Tests', () => {
        it('[KO] user exists', async () => {
            const res = await request(app).post("/users/register").send({
                email: 'pedro@pedro',
                password: 'pedro'
            })
            expect(res.statusCode).toEqual(400)
        })

        it('[KO] bad register params', async () => {
            const res = await request(app).post("/users/register").send({
                email: 'pedro@pedro',
                contra: 'pedro'
            })
            expect(res.statusCode).toEqual(400)
        })

        it('[KO] bad login params', async () => {
            const res = await request(app).post("/users/login").send({
                email: 'pedro@pedro',
                contra: 'pedro'
            })
            expect(res.statusCode).toEqual(400)
        })

        it('[KO] user bad password', async () => {
            const res = await request(app).post("/users/login").send({
                email: 'pedro@pedro',
                password: 'peter'
            })
            expect(res.statusCode).toEqual(401)
        })
    })
})

describe('User logged', () => {

    let token = null;
    describe('OK Tests', () => {
        it('[OK] login user 1', async () => {
            const res = await request(app).post("/users/login").send({
                email: 'ser@gio',
                password: '123'
            })
            expect(res.statusCode).toEqual(200)
            token = (JSON.parse(res.text).token)
        })


        it('[OK] owner of resource can see his profile', async () => {
            const res = await request(app).get("/users/1").set('Authorization', 'Bearer ' + token)
            expect(res.statusCode).toEqual(200)
        })

        it('[OK] owner of resource can edit his profile', async () => {
            let res = await request(app).patch("/users/1").set('Authorization', 'Bearer ' + token).send({
                name: "nuevo"
            })
            expect(res.statusCode).toEqual(204)

            res = await request(app).get("/users/1").set('Authorization', 'Bearer ' + token)
            const expected = { name: "nuevo" }
            expect(res.body).toMatchObject(expected)
        })

        it('[OK] owner of resource can follow and unfollow competition', async () => {
            let res = await request(app).post("/users/1/competitions").set('Authorization', 'Bearer ' + token).send({
                competitionId: 1
            })
            expect(res.statusCode).toEqual(204)

            res = await request(app).delete("/users/1/competitions").set('Authorization', 'Bearer ' + token).send({
                competitionId: 1
            })
            expect(res.statusCode).toEqual(204)
        })

        it('[OK] owner of resource can follow and unfollow matches', async () => {
            let res = await request(app).post("/users/1/matches").set('Authorization', 'Bearer ' + token).send({
                matchId: 1
            })
            expect(res.statusCode).toEqual(204)

            res = await request(app).delete("/users/1/matches").set('Authorization', 'Bearer ' + token).send({
                matchId: 1
            })
            expect(res.statusCode).toEqual(204)
        })

        it('[OK] user can see followed competitions', async () => {
            let res = await request(app).get("/users/1/competitions").set('Authorization', 'Bearer ' + token)
            expect(res.statusCode).toEqual(200)

            res = await request(app).get("/users/2/competitions").set('Authorization', 'Bearer ' + token)
            expect(res.statusCode).toEqual(200)
        })

        it('[OK] user can see followed matches', async () => {
            let res = await request(app).get("/users/1/matches").set('Authorization', 'Bearer ' + token)
            expect(res.statusCode).toEqual(200)

            res = await request(app).get("/users/2/matches").set('Authorization', 'Bearer ' + token)
            expect(res.statusCode).toEqual(200)
        })


    })
    describe('KO Tests', () => {
        it('[KO] owner of resource cant see others profile', async () => {
            const res = await request(app).get("/users/2").set('Authorization', 'Bearer ' + token)
            expect(res.statusCode).toEqual(403)
        })

        it('[KO] owner of resource cant edit others profile', async () => {
            const res = await request(app).patch("/users/2").set('Authorization', 'Bearer ' + token).send({
                name: "a"
            })
            expect(res.statusCode).toEqual(403)
        })

        it('[KO] owner of resource cant follow and unfollow nonexistent competitions', async () => {
            let res = await request(app).post("/users/1/competitions").set('Authorization', 'Bearer ' + token).send({
                competitionId: 100
            })
            expect(res.statusCode).toEqual(404)

            res = await request(app).delete("/users/1/competitions").set('Authorization', 'Bearer ' + token).send({
                competitionId: 100
            })
            expect(res.statusCode).toEqual(404)
        })

        it('[KO] owner of resource cant follow and unfollow others competitions', async () => {
            let res = await request(app).post("/users/2/competitions").set('Authorization', 'Bearer ' + token).send({
                competitionId: 1
            })
            expect(res.statusCode).toEqual(403)

            res = await request(app).delete("/users/2/competitions").set('Authorization', 'Bearer ' + token).send({
                competitionId: 1
            })
            expect(res.statusCode).toEqual(403)
        })

        it('[KO] owner of resource cant follow and unfollow nonexistent matches', async () => {
            let res = await request(app).post("/users/1/matches").set('Authorization', 'Bearer ' + token).send({
                matchId: 100
            })
            expect(res.statusCode).toEqual(404)

            res = await request(app).delete("/users/1/matches").set('Authorization', 'Bearer ' + token).send({
                matchId: 100
            })
            expect(res.statusCode).toEqual(404)
        })


        it('[KO] owner of resource cant follow and unfollow others matches', async () => {
            let res = await request(app).post("/users/2/matches").set('Authorization', 'Bearer ' + token).send({
                matchId: 1
            })
            expect(res.statusCode).toEqual(403)

            res = await request(app).delete("/users/2/matches").set('Authorization', 'Bearer ' + token).send({
                matchId: 1
            })
            expect(res.statusCode).toEqual(403)
        })

        it('[KO] nonexistent user followed competitions', async () => {
            let res = await request(app).get("/users/100/competitions").set('Authorization', 'Bearer ' + token)
            expect(res.statusCode).toEqual(404)
        })

        it('[KO] nonexistent user followed matches', async () => {
            let res = await request(app).get("/users/100/matches").set('Authorization', 'Bearer ' + token)
            expect(res.statusCode).toEqual(404)
        })

        it('[KO] owner of resource can follow and unfollow competition bad request', async () => {
            let res = await request(app).post("/users/1/competitions").set('Authorization', 'Bearer ' + token).send({
                comp: 1
            })
            expect(res.statusCode).toEqual(400)

            res = await request(app).delete("/users/1/competitions").set('Authorization', 'Bearer ' + token).send({
                comp: 1
            })
            expect(res.statusCode).toEqual(400)
        })

        it('[KO] owner of resource can follow and unfollow matches bad request', async () => {
            let res = await request(app).post("/users/1/matches").set('Authorization', 'Bearer ' + token).send({
                par: 1
            })
            expect(res.statusCode).toEqual(400)

            res = await request(app).delete("/users/1/matches").set('Authorization', 'Bearer ' + token).send({
                par: 1
            })
            expect(res.statusCode).toEqual(400)
        })

    })
})



describe('Admin Tests', () => {
    let token = null;
    describe('OK Tests', () => {
        it('[OK] login admin', async () => {
            const res = await request(app).post("/users/login").send({
                email: 'a@a',
                password: 'adm'
            })
            expect(res.statusCode).toEqual(200)
            token = (JSON.parse(res.text).token)
        })

        it('[OK] create advertisement', async () => {
            const res = await request(app).post("/advertisements").set('Authorization', 'Bearer ' + token).send({
                name: "pruebaad"
            })
            expect(res.statusCode).toEqual(201)
        })

    })
    describe('KO Tests', () => {
        it('[KO] unauthorized create ad', async () => {
            const res = await request(app).post("/advertisements").send({
                name: 'prueba'
            })
            expect(res.statusCode).toEqual(403)
        })
        it('[KO] bad request create ad', async () => {
            const res = await request(app).post("/advertisements").set('Authorization', 'Bearer ' + token).send({})
            expect(res.statusCode).toEqual(400)
        })
    })
})