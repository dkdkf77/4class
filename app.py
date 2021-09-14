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


@app.route('/signup/check_dup', methods=['POST'])
def check_dup():
    userid_receive = request.form['username_give']
    exists = bool(db.guestbooks.find_one({"userid": userid_receive}))
    return jsonify({'result': 'success', 'exists': exists})

@app.route('/room')
def room():
    return render_template('room.html')


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


