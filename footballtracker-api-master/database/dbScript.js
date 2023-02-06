const User = require("../src/model").User
const Match = require("../src/model").Match
const Player = require("../src/model").Player
const Team = require("../src/model").Team
const Competition = require("../src/model").Competition

module.exports.createDefaultDB = async () => {

    // Users
    const user1 = await User.create({
        name: 'Sergio Baeza',
        email: "ser@gio",
        password: "123",
        birthDate: new Date(2001, 2, 10)
    })
    const admin = await User.create({
        name: 'admin',
        email: "a@a",
        password: "adm",
        birthDate: new Date(2001, 2, 10),
        administrador: true
    })
    const user2 = await User.create({
        name: 'Álvaro Pastor',
        email: "alvaro@alu.ua.es",
        password: "pass2",
        birthDate: new Date(2000, 7, 8)
    })

    // Team
    const team1 = await Team.create({
        name: "F.C. Barcelona",
        stadiumName: "Camp Nou",
        foundationYear: 1904,
        country: 'España',
        city: 'Barcelona'

    })
    const team2 = await Team.create({
        name: "C.F. Real Madrid",
        stadiumName: "Santiago Bernabeu",
        foundationYear: 1921,
        country: 'España',
        city: 'Madrid'
    })
    const team3 = await Team.create({
        name: "Real Betis Balompié ",
        stadiumName: "Benito Villamarín",
        foundationYear: 1912,
        country: 'España',
        city: 'Sevilla'
    })

    // Player
    const player1 = await Player.create({
        name: "Robert Lewandowski",
        gamePosition: "Delantero",
        birthDate: new Date(1988, 8, 21),
        country: 'Polonia',
        teamId: 1

    })
    const player2 = await Player.create({
        name: "Jules Koundé",
        gamePosition: "Defensa",
        birthDate: new Date(1998, 11, 12),
        country: 'Francia',
        teamId: 1
    })
    const player3 = await Player.create({
        name: "Karim Benzema",
        gamePosition: "Delantero",
        birthDate: new Date(1987, 12, 19),
        country: 'Francia',
        teamId: 2
    })
    const player4 = await Player.create({
        name: "Thibaut Courtois",
        gamePosition: "Portero",
        birthDate: new Date(1992, 5, 11),
        country: 'Belgica',
        teamId: 2

    })
    const player5 = await Player.create({
        name: "Joaquín Sánchez",
        gamePosition: "Centrocampista",
        birthDate: new Date(1981, 7, 21),
        country: 'España',
        teamId: 3
    })
    const player6 = await Player.create({
        name: "Borja Iglesias",
        gamePosition: "Delantero",
        birthDate: new Date(1993, 1, 17),
        country: 'España',
        teamId: 3
    })

    // Competition
    const competition1 = await Competition.create({
        name: "Champions League",
        country: 'Alemania',
        startDate: new Date(2022, 9, 20),
        endDate: new Date(2023, 2, 27)
    })
    const competition2 = await Competition.create({
        name: "LaLiga Santander",
        country: 'España',
        startDate: new Date(2022, 9, 13),
        endDate: new Date(2023, 4, 22)
    })

    // Match
    const match1 = await Match.create({
        date: new Date(2022, 10, 18),
        stadiumName: "Camp nou",
        played: true,
        localScore: 3,
        awayScore: 1,
        competitionId: 1,
        localTeamId: 1,
        awayTeamId: 2
    })
    const match2 = await Match.create({
        date: new Date(2022, 11, 27),
        stadiumName: "Santiago Bernabeu",
        competitionId: 1,
        localTeamId: 2,
        awayTeamId: 1
    })
    const match3 = await Match.create({
        date: new Date(2023, 1, 10),
        stadiumName: "Santiago Bernabeu",
        localTeamId: 2,
        competitionId: 2,
        awayTeamId: 3
    })

}