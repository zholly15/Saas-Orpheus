db = db.getSiblingDB('Orpheus')
collection = db.getCollection("users")
collection.remove({})
collection.insert(
{
    email: "fakeEmail1.com",
    userId: "1",
    username: "fakeUser1",
    password: "password",
    fName: "fake",
    lName: "one",
}
)
collection.insert(
{
    email: "fakeEmail2.com",
    userId: "2",
    username: "fakeUser2",
    password: "password",
    fName: "fake",
    lName: "two",
}
)
collection.insert(
{
    email: "fakeEmail3.com",
    userId: "3",
    username: "fakeUser3",
    password: "password",
    fName: "fake",
    lName: "three",
}
)

