var chai = require('chai')
var chaiHttp = require('chai-http')
var async = require('async')

var assert = chai.assert
var expect = chai.expect
var should = chai.should();

var http = require('http')
const exp = require('constants')
chai.use(chaiHttp)

describe("Test /albums result", function (){
    var requestResult;
    var response;

    before(function (done){
        chai.request('http://localhost:8080')
                        .get("/albums")
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
        expect(requestResult[0]).to.include.keys('name');
        expect(requestResult[0]).to.include.keys('spotifyID')
        expect(requestResult[0]).to.include.keys('_id')
        expect(requestResult[0]).to.include.keys('artist_name')
        expect(requestResult[0]).to.include.keys('total_tracks')
        expect(requestResult[0]).to.include.keys('release_date')
        expect(response.body).to.not.be.a.string
    })
    it('All entries should have expected properties', function(){
        expect(requestResult).to.satisfy(
            function (body){
                for (var i =0;i<body.length;i++){
                    expect(body[i]).to.have.property('name')
                    expect(body[i]).to.have.property('spotifyID')
                    expect(body[i]).to.have.property('_id')
                    expect(body[i]).to.have.property('artist_name')
                    expect(body[i]).to.have.property('total_tracks')
                    expect(body[i]).to.have.property('release_date')
                }
                return true
            }
        )
    })
    
})

describe("Test /albums/search results", function (){
    var requestResult;
    var response;
    

    before(function (done){
        chai.request('http://localhost:8080')
                        .get("/albums/search/1A3nVEWRJ8yvlPzawHI1pQ")
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
        expect(requestResult).to.include.keys('name');
        expect(requestResult).to.include.keys('spotifyID')
        expect(requestResult).to.include.keys('_id')
        expect(requestResult).to.include.keys('artist_name')
        expect(requestResult).to.include.keys('total_tracks')
        expect(requestResult).to.include.keys('release_date')
        expect(response.body).to.not.be.a.string
    })

    
})