
const neo4j = require('neo4j-driver')

const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "1234"))
// const session = driver.session()
const session = driver.session({database: "neo4j"});
const personName = 'Adnane'

class Api {

    addUser = async (usager) => {
        console.log("Usager")
        try {
            const result = await session.run(
                'CREATE (a:Usager {nomComplet:$nomComplet,dateDeNaissance: $dateDeNaissance,handicap: $handicap,fonction: $fonction}) RETURN a',
                {
                    nomComplet:usager.nom,
                    dateDeNaissance: usager.dateDeNaissance,
                    handicap: usager.handicap,
                    fonction: usager.fonction
                }
            )

            const singleRecord = result.records[0]
            const node = singleRecord.get(0)

        } finally {
            await session.close()
        }

// on application exit:
        await driver.close()
    }

    addMoyenDeTransport = async (moyenDeTransport) => {
        try {
            const result = await session.run(
                'CREATE (a:MoyenDeTransport {type: $type,numero: $numero,constructeur: $constructeur, anneemiseenservice: $anneemiseenservice}) RETURN a',
                {
                    type: moyenDeTransport.type,
                    numero: moyenDeTransport.numero,
                    constructeur: moyenDeTransport.constructeur,
                    anneemiseenservice: moyenDeTransport.anneemiseenservice

                }
            )

            const singleRecord = result.records[0]
            const node = singleRecord.get(0)

            console.log(node.properties.name)
        } finally {
            await session.close()
        }

// on application exit:
        await driver.close()
    }

}

export default new Api();

