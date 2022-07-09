const SocialMedia = artifacts.require('./SocialMediaDapp');
require('chai').use(require('chai-as-promised')).should()

contract('SocialMediaDapp', ([deployer, author, tipper])=>{
    let socialMedia;

    before(async ()=> {
        socialMedia = await SocialMedia.deployed();
    })

    describe('deployment', async()=>{
        it('deploys successfully', async()=>{
            const address = await socialMedia.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        })
    })

    describe('post', async()=>{
        let result, postCount;
        const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb';
        
        before(async () => {
            result = await socialMedia.uploadPost("Post name",hash, 'Post discription','2020/12/22', { from: author });
            postCount = await socialMedia.postCount();
        })

        it('creates post', async () => {
            assert.equal(postCount, 1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(event.cid, hash, 'Hash is correct')
            assert.equal(event.name, "Post name", 'like amount is correct')
            assert.equal(event.author, author, 'author is correct')
      
      
            // FAILURE: Post must have hash
            await socialMedia.uploadPost('', 'Post discription', { from: author }).should.be.rejected;
      
            // FAILURE: Post must have discription
            await socialMedia.uploadPost('Post hash', '', { from: author }).should.be.rejected;
          })
      
          //check from Struct
          it('lists post', async () => {
            const post = await socialMedia.posts(postCount)
            assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(post.cid, hash, 'Hash is correct')
            assert.equal(post.discription, 'Post discription', 'discription is correct')
            assert.equal(post.likes, '0', 'likes amount is correct')
            assert.equal(post.author, author, 'author is correct')
          })
      
          it('allows users to like post', async () => {
            // Track the author balance before purchase      
            result = await socialMedia.likePost(postCount, { from: tipper })
            // SUCCESS
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(event.likes, '1', 'likes amount is correct')
            assert.equal(event.author, author, 'author is correct')
          })
    })
})