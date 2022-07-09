// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SocialMediaDapp {
    
    uint public postCount;

    constructor () {
        postCount = 0;
    }

    struct Post {
        uint id;
        string name;
        string cid;
        string discription;
        string date;
        address author;
        uint likes;
    }

    mapping(uint => Post) public posts;

    event PostUploaded(
        uint id,
        string cid,
        string name,
        address author
    );

    event PostLiked(
        uint id,
        address author,
        uint likes
    );

    event PostUnliked(
        uint id,
        address author,
        uint likes
    );

    modifier uploaderReq(string memory _cid, string memory _discription, string memory _name) {
        require(bytes(_cid).length > 0, "IPFS CID NOT AVAIALBLE");
        require(bytes(_discription).length > 0, "IPFS DISCRIPTION NOT AVAIALBLE");
        require(bytes(_name).length > 0, "IPFS NAME NOT AVAIALBLE");
        require(msg.sender != address(0x0));
        _;
    }

    function uploadPost(string memory _name, string memory _cid, string memory _discription, string memory _date) uploaderReq(_cid, _discription, _name) public {
        
        postCount ++;
        posts[postCount] = Post(postCount, _name, _cid, _discription, _date, msg.sender, 0);
        emit PostUploaded(postCount, _cid, _name, msg.sender);
    }

    function getAllImageByAddress(address _ownerOf) public view returns(Post[] memory FilterPost) {
        require(_ownerOf != address(0x0), "INVALID ADDRESS");
        Post[] memory tempPost = new Post[](postCount);
        uint count = 0;
        for(uint i=0; i<=postCount; i++)
        {
            if(posts[i].author == _ownerOf)
            {
                tempPost[count] = posts[i];
                count++;
            }
        }
        FilterPost = new Post[](count);
        for(uint i=0; i<=count; i++)
        {
            FilterPost[i] = tempPost[i];
        }

        return FilterPost;
    }

    function likePost(uint _id) public {
        require(_id > 0 && _id <= postCount, "ID NOT VALID ");
        Post memory _post = posts[_id];
        _post.likes = _post.likes + 1;
        posts[_id] = _post;
        emit PostLiked(_id, _post.author, _post.likes);
    }

    function dislikePost(uint _id) public {
        require(_id > 0 && _id <= postCount, "ID NOT VALID ");
        Post memory _post = posts[_id];
        _post.likes = _post.likes - 1;
        posts[_id] = _post;
        emit PostUnliked(_id, _post.author, _post.likes);
    }


}

