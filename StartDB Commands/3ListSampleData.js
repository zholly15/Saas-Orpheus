db = db.getSiblingDB('Orpheus')
collection = db.getCollection("list")
collection.remove({})
collection.insert(
{
	collectionId: "1",
	ownerId: "Albert Hunt",
    albumIds: ['2BlL4Gv2DLPu8p58Wcmlm9'],
    name: "RockNRoll",
    description:"Cool music",
}
)
collection.insert(
{
	collectionId: "2",
	ownerId: "Zach Holly",
    albumIds: ['1A3nVEWRJ8yvlPzawHI1pQ'],
    name: "Bruno Mars",
    description:"Insane music",
}
)
collection.insert(
{
	collectionId: "3",
	ownerId: "Kyle Scher",
    albumIds: ['6kZ42qRrzov54LcAk4onW9', '2BlL4Gv2DLPu8p58Wcmlm9'],
    name: "Travis",
    description:"Yuh",
}
)

