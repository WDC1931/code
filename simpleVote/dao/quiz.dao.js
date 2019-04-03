var quizSQL = {
    insert: 'INSERT INTO quiz_list(fonts,class,title,home,behavior,finsh,analysis) VALUES(?,?,?,?,?,?,?)',
    // queryAll: 'SELECT * FROM quiz_list',
    getquizById: 'SELECT * FROM quiz_list WHERE quizId = ? ',
    // update: 'UPDATE quiz_list SET options = ?,totalNum = ? where quizId = ?'
};


module.exports = quizSQL;
