const neo4j = require('neo4j-driver')

const driver = neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic("neo4j", "1923"))
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

    getUsagers = () => {
        console.log("Get")
        // const neo4j = require('neo4j-driver');
        // const driver = neo4j.driver('bolt://localhost:7687',
        //     neo4j.auth.basic('neo4j', 'Oussama2'),
        //     {/* encrypted: 'ENCRYPTION_OFF' */});

        const query = `MATCH (n:Usager)-[r]->(m) return distinct n.nomComplet as usager`;

        // const params = {"category": "Dairy Products"};

        // const session = driver.session({database:"neo4j"});

        session.run(query)
            .then((result) => {
                result.records.forEach((record) => {
                    console.log(record.get('usager'));
                });
                session.close();
                driver.close();
            })
            .catch((error) => {
                console.error(error);
            });

    }

}

export default new Api();

