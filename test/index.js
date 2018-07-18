
let mongoose = require("mongoose");
let drafts = require('../models/draftModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('articles', () => { 
/*
 * Test the /GET route
*/
  describe('/GET articles', () => {
      it('it should GET all the articles', (done) => {
        chai.request(server)
            .get('/api/articles')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
              done();
            });
       });
   });
});