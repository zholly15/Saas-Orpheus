var chai = require('chai')
var chaiHttp = require('chai-http')
var async = require('async')

var assert = chai.assert
var expect = chai.expect
var should = chai.should();

var http = require('http')
const exp = require('constants')
chai.use(chaiHttp)

describe("Test /lists result", function (){
    var requestResult;
    var response;

    before(function (done){
        chai.request('http://localhost:8080')
                        .get("/lists")
                        .end(function (err,res){
                            requestResult = res.body;
                            response = res
                    expect(err).to.be.null
                    expect(res).to.have.status(200);
                            done();
                        });
    });
    it('Should return an object with more than 1 entries', function(){
        expect(response).to.have.status(200);
        expect(response.body).to.have.length.above(2)
        expect(response).to.have.header
    })

    it('First entry should have required properties', function(){
        expect(requestResult[0]).to.include.keys('_id')
        expect(requestResult[0]).to.include.keys('collectionId')
        expect(requestResult[0]).to.include.keys('ownerId')
        expect(response.body).to.not.be.a.string
    })
    it('All entries should have expected properties', function(){
        expect(requestResult).to.satisfy(
            function (body){
                for (var i =0;i<body.length;i++){
                    expect(body[i]).to.have.property('_id')
                    expect(body[i]).to.have.property('collectionId')
                    expect(body[i]).to.have.property('ownerId')
                    expect(body[i]).to.have.deep.property('albumIds')
                    expect(body[i]).to.have.property('name')
                    expect(body[i]).to.have.property('description')
                }
                return true
            }
        )
    })
    
})

describe("Test /lists/search result", function (){
    var requestResult;
    var response;
    

    before(function (done){
        chai.request('http://localhost:8080')
                        .get("/lists/search/1")
                        .end(function (err,res){
                            requestResult = res.body;
                            response = res
                    expect(err).to.be.null
                    expect(res).to.have.status(200);
                            done();
                        });
    });
    it('Should return an object with 1 entry', function(){
        expect(response).to.have.status(200);
        expect(response.body).to.not.have.length
        expect(response).to.have.header
    })

    it('Entry should have required properties', function(){
        expect(requestResult).to.have.property('_id')
        expect(requestResult).to.have.property('collectionId')
        expect(requestResult).to.have.property('ownerId')
        expect(requestResult).to.have.deep.property('albumIds')
        expect(requestResult).to.have.property('name')
        expect(requestResult).to.have.property('description')
        expect(response.body).to.not.be.a.string
    })

    
}) 