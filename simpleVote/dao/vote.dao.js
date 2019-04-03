var voteSQL = {
    insert: 'INSERT INTO vote_list(type,deadline,anonymity,isLimit,title,detail,optionsType,options,totalNum) VALUES(?,?,?,?,?,?,?,?,?)',
    queryAll: 'SELECT * FROM vote_list',
    getVoteById: 'SELECT * FROM vote_list WHERE voteId = ? ',
    update: 'UPDATE vote_list SET options = ?,totalNum = ? where voteId = ?'
};


module.exports = voteSQL;
