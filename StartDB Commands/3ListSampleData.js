db = db.getSiblingDB('Orpheus')
collection = db.getCollection("list")
collection.remove({})
collection.insert(
{
	collectionId: "1",
	ownerId: "Albert Hunt",
    albumIds: ['1A3nVEWRJ8yvlPzawHI1pQ','0tgO7MMVIhpUMV3YZQ1GYT','1klALx0u4AavZNEvC4LrTL'],
    name: "RockNRoll",
    description:"Rockin music",
}
)
collection.insert(
{
	collectionId: "2",
	ownerId: "Zach Holly",
    albumIds: ['0dst3z0HnOCF0pdU05AZ4b','6zhlos3HFJrWni7rjqxacg','3YAdpJe29HVtLn7dStvZ7g'],
    name: "Soundtracks",
    description:"Insane music",
}
)
collection.insert(
{
	collectionId: "3",
	ownerId: "Kyle Scher",
    albumIds: ['1YgekJJTEueWDaMr7BYqPk', '6kZ42qRrzov54LcAk4onW9'],
    name: "Smooth music",
    description:"silk sonic",
}
)

