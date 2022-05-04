db = db.getSiblingDB('test')
collection = db.getCollection("list")
collection.remove({})
collection.insert(
{
	collectionId: "1",
	ownerId: "Albert Hunt",
    albumIds: ['6e57517a-4ba6-4052-a7af-f816cdd9b89b', '2e6cde38-bccd-4cb5-ba19-d71a0a8014e2', 'ad4e0f4b-d6c5-4e35-80df-bd5681fb6d10'],
    name: "RockNRoll",
    description:"Cool music",
}
)
collection.insert(
{
	collectionId: "2",
	ownerId: "Zach Holly",
    albumIds: ['6e57517a-4ba6-4052-a7af-f816cdd9b89b', '2e6cde38-bccd-4cb5-ba19-d71a0a8014e2', 'ad4e0f4b-d6c5-4e35-80df-bd5681fb6d10'],
    name: "Bruno Mars",
    description:"Insane music",
}
)
collection.insert(
{
	collectionId: "3",
	ownerId: "Kyle Scher",
    albumIds: ['6e57517a-4ba6-4052-a7af-f816cdd9b89b', '2e6cde38-bccd-4cb5-ba19-d71a0a8014e2', 'ad4e0f4b-d6c5-4e35-80df-bd5681fb6d10'],
    name: "Travis",
    description:"Yuh",
}
)

