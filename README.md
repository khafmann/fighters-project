<<<<<<< HEAD

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Main queries I used for testing:

````
mutation {
    createWeightClass(input: {
        name: "Middleweight",
        maxWeight: 84
    }) {
    id
    }
}

-----------------------

mutation {
    createFighter(data: {
        name: "Dana White",
        nationality: "Kazakhstan",
        birthDate: 631152000000,
        height: 185,
        weight: 80,
        weightClassId: 1,
        wins: 8,
        losses: 2,
        knockouts: 5
        }) {
    id
    name
    wins
    losses
    knockouts
    }
}

-----------------------

query {
    fighterStats(id: {id}) {
        winRate
        knockoutRate
    }
}
````
-----------------------