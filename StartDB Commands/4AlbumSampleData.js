db = db.getSiblingDB('Orpheus')
collection = db.getCollection("albums")
collection.remove({})
collection.insert(
{
    name: "American IV: The Man Comes Around",
    spotifyID: "2BlL4Gv2DLPu8p58Wcmlm9",
    _id: "1",
    total_tracks: 15,
    release_date: "2002-01-01",
    artist_name: "Johnny Cash",
}
)
collection.insert(
{
    name: "Father of the Bride",
    spotifyID: "1A3nVEWRJ8yvlPzawHI1pQ",
    _id: "2",
    total_tracks: 18,
    release_date: "2019-05-03",
    artist_name: "Vampire Weekend",
}
)
collection.insert(
{
    name: "Red (Taylor's Version)",
    spotifyID: "6kZ42qRrzov54LcAk4onW9",
    _id: "3",
    total_tracks: 30,
    release_date: "2021-11-12",
    artist_name: "Taylor Swift",
}
)

