const neo4j = require('neo4j-driver')

const driver = neo4j.driver("neo4j://localhost:76", neo4j.auth.basic("neo4j", "1923"))
const session = driver.session()
const personName = 'Alice'

class Api {
    call = async () => {
        try {
            const result = await session.run(
                'CREATE (a:Person {name: $name}) RETURN a',
                { name: personName }
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

