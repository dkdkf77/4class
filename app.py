from flask import Flask, render_template, jsonify, request, session, redirect, url_for
import pymongo
import jwt
import datetime
import hashlib
app = Flask(__name__)


client = pymongo.MongoClient('localhost', 27017)
db = client.port

SECRET_KEY = 'SPARTA'


@app.route('/')
def main():
    return render_template('login.html')


@app.route('/login', methods=['POST'])
def login():
    params = request.get_json()
    userid_receive = params['loginid_give']
    password_receive = params['loginpw_give']
    pw_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    result = db.port.find_one({'id': userid_receive, 'password': pw_hash})

    # 아이디를 정상적으로 찾았을 때
    if result is not None:
        payload = {
            'id': userid_receive,
            # 토큰 유효시간
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=1)
        }

        token = jwt.encode(payload, SECRET_KEY,
                           algorithm='HS256').decode('utf-8')

        return jsonify({'result': 'success', 'token': token})

    # 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})


@app.route('/signup')
def signupPage():
    return render_template('signup.html')


@app.route('/room')
def room():
    return render_template('room.html')

@app.route('/room/room_post', methods = ['POST'])
def roompost():
    comment_receive = request.form['comment_give']

    doc = {
         "speak" : comment_receive
    }
    db.comment.insert_one(doc)
    return jsonify({'msg': '등록 완료!'})

@app.route('/room/room_get', methods = ['GET'])
def roomget():
    token_receive = reequest.comment.get('token')
    payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
    db_comment = list(db.comment.find({}, {'_id': False}).sort("datetime", -1).limit(20))
    for db_comments in db_comment:
        db_comments["_id"] = str(post["id"])
    return jsonify({'register': db_comment});

@app.route('/room/delete', methods=['POST'])
def delete_star():
    speak_receive = request.form["speak_give"]
    db.comment.delete_one({'speak': speak_receive})
    return jsonify({'result': 'success', 'msg': '삭제 완료 !'})



@app.route('/signup/check_dup', methods=['POST'])
def check_dup():
    params = request.get_json()
    userid_receive = params['userid_give']
    exists = bool(db.port.find_one({"id": userid_receive}))
    return jsonify({'result': 'success', 'exists': exists})





@app.route('/signup/save', methods=['POST'])
def signup():
    params = request.get_json()
    userid_receive = params['userid_give']
    password_receive = params['password_give']
    username_receive = params['username_give']
    userteam_receive = params['userteam_give']
    password_hash = hashlib.sha256(
        password_receive.encode('utf-8')).hexdigest()
    doc = {
        "id": userid_receive,
        "password": password_hash,
        "name": username_receive,
        "team": userteam_receive,
    }
    db.port.insert_one(doc)
    return jsonify({'result': "회원가입되었습니다."})


# @app.route('/room')
# def room():
#     return render_template('room.html')


@app.route('/roomlist')
def roomlist():
    return render_template('roomlist.html')


# @app.route('/roomlist', methods=['GET'])
# def roomlist():
 #   team_receive = request.form['team_give']
  #  doc = {
   #     "team": team_receive  # 팀번호
    # }
    # db.rooms.insert_one(doc)
    # return jsonify({'result': 'success'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)


# add commit push
# 켜기 터미널
# set FLASK_APP=app.py
# set FLASK_ENV=development
# flask run
# 끄기 터미널에서 ctrl c
