from flask import Flask, render_template, jsonify, request, session, redirect, url_for
import pymongo
import jwt
import datetime
import hashlib
import uuid
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

# 토큰 여부 확인해서 페이지별로 이동하는 공통 함수


user_team = 0
user_name = ''
user_id = ''


def test_number(value):
    return value


def userAuthCheck(str):
    token_receive = request.cookies.get('port-token')
    try:
        tokenExist = checkExpired()
        # 토큰이 없으면 로그인 페이지로 이동
        if not token_receive:
            return render_template('login.html', token=tokenExist)

        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])

        user_info = db.users.find_one({"id": payload["id"]})
        global user_team
        global user_name
        global user_id
        user_team = user_info['team']
        user_name = user_info['name']
        user_id = user_info['id']
        test_number(user_team)

        if user_info:
            return render_template(str, token=tokenExist, user_name=user_name, user_team=user_team)

    except jwt.ExpiredSignatureError:
        return redirect(url_for('fail', msg="로그인 시간 만료"))
    except jwt.exceptions.DecodeError:
        return redirect(url_for('fail', msg="로그인 정보 없음"))


@app.route('/testlist')
def testlist():
    return userAuthCheck("testlist.html")

# 시작


@app.route('/testroom')
def testPage():
    return userAuthCheck("test.html")


@app.route('/test/room', methods=['GET'])
def testRoom():
    return render_template('test.html')


@app.route('/test/list', methods=['GET'])
def checkTeamRoom():
    teamList = list(db.comment.find({"team": user_team}, {'_id': False}))
    return jsonify({'teamMessage': teamList, 'login_user': user_id})

# 내가 등록한 글만 삭제해야됨
#  류승환 개자이너  delete api 코드
@app.route('/test/delete', methods=['POST'])
def comment_delete():
    uid_receive = request.form["uid_give"],
    id_receive = request.form["id_give"],
    db.comment.delete_one({'uid': uid_receive,'id': id_receive})
    return jsonify({'msg': "삭제되었습니다"})

# 이다미 개발자님의 delete api 코드
# @app.route('/test/delete', methods=['POST'])
# def comment_delete():
#     params = request.get_json()
#     uid_receive = params['uid_give']
#     id_receive = params['id_give']
#     db.comment.delete_one({'uid': uid_receive, 'id': id_receive})
#     return jsonify({'msg': "삭제되었습니다"})
# 종료


@app.route('/fail')
def fail():
    return render_template('login.html')


@app.route('/')
def main():
    return userAuthCheck("roomlist.html")


@app.route('/login')
def loginPage():
    return render_template('login.html')


@app.route('/signup')
def signupPage():
    return render_template('signup.html')


@app.route('/roomlist')
def roomlist():
    return userAuthCheck("roomlist.html")


@app.route('/room')
def room():
    return userAuthCheck("room.html")


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


@app.route('/room/room_post', methods=['POST'])
def roompost():
    comment_receive = request.form['comment_give']
    now = datetime.datetime.now()
    now_date_time = now.strftime("%Y년 %m월 %d일 %H:%M:%S")

    doc = {
        "uid": uuid.uuid4().hex,
        "speak": comment_receive,
        "id": user_id,
        "name": user_name,
        "team": int(user_team),
        "date": now_date_time

    }
    db.comment.insert_one(doc)
    return jsonify({'msg': '등록 완료!'})


@app.route('/room/room_get', methods=['GET'])
def roomget():
    db_comment = list(db.comment.find({}, {'_id': False}).sort("datetime", -1).limit(20))
    for db_comments in db_comment:
        db_comments["_id"] = str(post["id"])
    return jsonify({'register': db_comment})


@app.route('/room/delete', methods=['POST'])
def delete_star():
    speak_receive = request.form["speak_give"]
    db.comment.delete_one({'speak': speak_receive})
    return jsonify({'result': 'success', 'msg': '삭제 완료 !'})


@app.route('/roomlist/number', methods=['GET'])
def roomlist_number():
    testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
    return jsonify({'listArray': testArray, 'team': user_team, 'name': user_name})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)


# add commit push
# 켜기 터미널
# set FLASK_APP=app.py
# set FLASK_ENV=development
# flask run
# 끄기 터미널에서 ctrl c
