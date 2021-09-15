from flask import Flask, render_template, jsonify, request, url_for
import pymongo
app = Flask(__name__)


client = client = pymongo.MongoClient('localhost', 27017)
db = client.port


@app.route('/')
def main():
    return render_template('login.html')


@app.route('/signup')
def signupPage():
    return render_template('signup.html')


# @app.route('/room', methods = ['POST'])
# def room():
#     comment_receive = request.form['comment_give']
#     # name_receive = request.form['name_give']
#     # datetime_receive = request.form['datetime_give']
#     # uid_receive = request.form['uid_give']

#     doc = {
#          'comment': comment_receive,
#         #  'name' : name_receive,
#         #  'datetime' : datetime_receive,
#         #  'uid' : uid_receive
#     }
#     db.roomregist.insert_one(doc)
#     return jsonify({'msg': '등록 완료!'})  

# @app.route('/room', methods = ['GET'])
# def roomget():
#     gets = list(db.port.find({}))
#     return jsonify({'all-gets': gets})




@app.route('/roomlist')
def roomlist():
    return render_template('roomlist.html')


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)



# add commit push
# 켜기 터미널
# set FLASK_APP=app.py
# set FLASK_ENV=development
# flask run
# 끄기 터미널에서 ctrl c


