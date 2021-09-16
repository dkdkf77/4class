from flask import Flask, render_template, jsonify, request, session, redirect, url_for
import pymongo
import jwt
import datetime
import hashlib
from werkzeug.utils import secure_filename

app = Flask(__name__)


client = pymongo.MongoClient('localhost', 27017)
db = client.port

SECRET_KEY = 'SPARTA'


def checkExpired():
    if request.cookies.get('port-token') is not None:
        return False
    else:
        return True


def userAuthCheck(str):
    token_receive = request.cookies.get('port-token')
    try:
        tokenExist = checkExpired()

        if not token_receive:
            return render_template('login.html', token=tokenExist)

        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])

        user_info = db.users.find_one({"id": payload["id"]})
        if user_info:
            return render_template(str, token=tokenExist)

    except jwt.ExpiredSignatureError:
        return redirect(url_for('fail', msg="로그인 시간 만료"))
    except jwt.exceptions.DecodeError:
        return redirect(url_for('fail', msg="로그인 정보 없음"))


@app.route('/fail')
def fail():
    return render_template('roomlist.html')


@app.route('/')
def main():
    return userAuthCheck("roomlist.html")


@app.route('/login')
def loginPage():
    return render_template('login.html')


@app.route('/login/save', methods=['POST'])
def login():
    params = request.get_json()
    userid_receive = params['loginid_give']
    password_receive = params['loginpw_give']
    pw_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    result = db.users.find_one({'id': userid_receive, 'password': pw_hash})

    # 아이디를 정상적으로 찾았을 때
    if result is not None:
        payload = {
            'id': userid_receive,
            # 토큰 유효시간
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=5)
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
    return userAuthCheck("room.html")


@app.route('/room/room_post', methods=['POST'])
def roompost():
    comment_receive = request.form['comment_give']

    doc = {
        "speak": comment_receive
    }
    db.comment.insert_one(doc)
    return jsonify({'msg': '등록 완료!'})


@app.route('/room/room_get', methods=['GET'])
def roomget():
    token_receive = reequest.comment.get('token')
    payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
    db_comment = list(db.comment.find(
        {}, {'_id': False}).sort("datetime", -1).limit(20))
    for db_comments in db_comment:
        db_comments["_id"] = str(post["id"])
    return jsonify({'register': db_comment})


@app.route('/room/delete', methods=['POST'])
def delete_star():
    speak_receive = request.form["speak_give"]
    db.comment.delete_one({'speak': speak_receive})
    return jsonify({'result': 'success', 'msg': '삭제 완료 !'})


@app.route('/signup/check_dup', methods=['POST'])
def check_dup():
    params = request.get_json()
    userid_receive = params['userid_give']
    exists = bool(db.users.find_one({"id": userid_receive}))
    return jsonify({'result': 'success', 'exists': exists})


@app.route('/signup/save', methods=['POST'])
def signup():
    params = request.get_json()
    userid_receive = params['userid_give']
    password_receive = params['password_give']
    username_receive = params['username_give']
    userteam_receive = int(params['userteam_give'])
    password_hash = hashlib.sha256(
        password_receive.encode('utf-8')).hexdigest()
    doc = {
        "id": userid_receive,
        "password": password_hash,
        "name": username_receive,
        "team": userteam_receive,
    }
    db.users.insert_one(doc)
    return jsonify({'result': "회원가입되었습니다."})


@app.route('/test', methods=['GET'])
def test():
    teatArray = ['1조', '2조', '3조', '4조']
    print("제대로 통신을 잘 하셨으면, 터미널에서 이 문구가 나와야해요!")
    return jsonify({'msg': '제대로 작업하셨다면 이 문구가 떠야 합니다!'})


@app.route('/roomlist')
def roomlist():
    return userAuthCheck("roomlist.html")


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)


# add commit push
# 켜기 터미널
# set FLASK_APP=app.py
# set FLASK_ENV=development
# flask run
# 끄기 터미널에서 ctrl c
