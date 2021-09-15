from flask import Flask, render_template, jsonify, request, session, redirect, url_for
import pymongo
import jwt
import datetime
import hashlib
app = Flask(__name__)


client = pymongo.MongoClient('localhost', 27017)
db = client.port


@app.route('/')
def main():
    return render_template('login.html')


@app.route('/signup')
def signupPage():
    return render_template('signup.html')


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


@app.route('/room')
def room():
    return render_template('room.html')


#@app.route('/roomlist', methods=['GET'])
#def roomlist():
 #   team_receive = request.form['team_give']
  #  doc = {
   #     "team": team_receive  # 팀번호
    #}
    #db.rooms.insert_one(doc)
    #return jsonify({'result': 'success'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)


# add commit push
# 켜기 터미널
# set FLASK_APP=app.py
# set FLASK_ENV=development
# flask run
# 끄기 터미널에서 ctrl c
