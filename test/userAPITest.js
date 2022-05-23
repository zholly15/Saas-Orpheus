var chai = require('chai')
var chaiHttp = require('chai-http')
var async = require('async')

var assert = chai.assert
var expect = chai.expect
var should = chai.should();

var http = require('http')
const exp = require('constants')
chai.use(chaiHttp)

describe("Test /users result", function (){
    var requestResult;
    var response;

    before(function (done){
        chai.request('http://localhost:8080')
                        .get("/users")
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
        expect(requestResult[0]).to.include.keys('_id');
        expect(requestResult[0]).to.include.keys('userId')
        expect(requestResult[0]).to.include.keys('username')
        expect(requestResult[0]).to.include.keys('password')
        expect(response.body).to.not.be.a.string
    })
    it('All entries should have expected properties', function(){
        expect(requestResult).to.satisfy(
            function (body){
                for (var i =0;i<body.length;i++){
                    expect(body[i]).to.have.property('userId')
                    expect(body[i]).to.have.property('email')
                    expect(body[i]).to.have.property('_id')
                    expect(body[i]).to.have.property('username')
                    expect(body[i]).to.have.property('password')
                    expect(body[i]).to.have.property('fName')
                    expect(body[i]).to.have.property('lName')
                }
                return true
            }
        )
    })
    
})

describe("Test /users/search results", function (){
    var requestResult;
    var response;
    

    before(function (done){
        chai.request('http://localhost:8080')
                        .get("/users/search/1")
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
        expect(requestResult).to.have.property('userId')
        expect(requestResult).to.have.property('email')
        expect(requestResult).to.have.property('_id')
        expect(requestResult).to.have.property('username')
        expect(requestResult).to.have.property('password')
        expect(requestResult).to.have.property('fName')
        expect(requestResult).to.have.property('lName')
        expect(response.body).to.not.be.a.string
    })

    
})